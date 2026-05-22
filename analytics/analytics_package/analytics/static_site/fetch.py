"""Fetch analytics data from GA4 for the static site."""

import re
from urllib.parse import urlparse, parse_qs

from .. import sheets_elements as elements
from .._sheets_utils import get_data_df_from_fields
from ..entities import (
    DIMENSION_YEAR_MONTH,
    METRIC_EVENT_COUNT,
    METRIC_PAGE_VIEWS,
    METRIC_SESSIONS,
    DIMENSION_EVENT_NAME,
    DIMENSION_PAGE_PATH,
    DIMENSION_PAGE_PATH_PLUS_QUERY,
    DIMENSION_CUSTOM_URL,
    DIMENSION_ENTITY_NAME,
    DIMENSION_PAGE_TITLE,
)

METRIC_ENGAGEMENT_RATE = {
    "id": "engagementRate",
    "alias": "Engagement Rate",
}

METRIC_ENGAGED_SESSIONS = {
    "id": "engagedSessions",
    "alias": "Engaged Sessions",
}

# Regex matching page paths that are clearly not real pages (bot probes,
# broken markdown links, asset requests, etc.).
SUSPICIOUS_PAGE_PATH_RE = re.compile(
    r"("
    r"^/?\].*"             # broken markdown links e.g. /](https://...)
    r"|.*https?://.*"      # concatenated URLs e.g. /overview/securityhttps://...
    r"|^/[^/]*@[^/]*"     # email-as-path e.g. /help@lists...
    r"|^//.*"              # double-slash probes e.g. //checkout/
    r"|^/[^/]*\.[^/]+$"   # file extensions at root e.g. /robots.txt, /favicon-32x32.png
    r"|^/feed$"            # RSS probes
    r"|^/\).*"             # broken parens e.g. /), /).
    r"|^/[^/]*\).*"       # broken parens e.g. /events)
    r"|^/docs(-\w+)?/"     # CMS probes e.g. /docs/, /docs-EN/
    r")"
)


def event_key(event):
    """Return the unique key for a custom event config dict."""
    return event.get("key", event["event_name"])


def _count_events(event_name, params, page_path_regex=None, click_url_regex=None):
    """Fetch event count, optionally filtered by page path and/or click URL regex."""
    dimensions = [DIMENSION_EVENT_NAME]
    if page_path_regex:
        dimensions.append(DIMENSION_PAGE_PATH)
    if click_url_regex:
        dimensions.append(DIMENSION_CUSTOM_URL)

    df = get_data_df_from_fields(
        [METRIC_EVENT_COUNT],
        dimensions,
        dimension_filter=f"eventName=={event_name}",
        **params,
    )

    if len(df) == 0:
        return 0

    count_col = METRIC_EVENT_COUNT["alias"]
    mask = True

    if page_path_regex:
        pattern = re.compile(page_path_regex)
        mask = df[DIMENSION_PAGE_PATH["alias"]].str.match(pattern, na=False)

    if click_url_regex:
        url_pattern = re.compile(click_url_regex)
        url_mask = df[DIMENSION_CUSTOM_URL["alias"]].str.contains(url_pattern, na=False)
        mask = mask & url_mask if not isinstance(mask, bool) else url_mask

    if isinstance(mask, bool):
        return int(df[count_col].sum())
    return int(df.loc[mask, count_col].sum())


def get_custom_event_change(event_name, params_current, params_prior, page_path_regex=None, click_url_regex=None):
    """Fetch a custom event count with month-over-month change.

    Args:
        event_name: GA4 event name (e.g., "chat_submitted").
        params_current: Analytics params for the current period.
        params_prior: Analytics params for the prior period.
        page_path_regex: Optional regex to filter by page path.
        click_url_regex: Optional regex to filter by click URL.

    Returns:
        Dict with "current", "prior", and "change" keys.
    """
    current_count = _count_events(event_name, params_current, page_path_regex, click_url_regex)
    prior_count = _count_events(event_name, params_prior, page_path_regex, click_url_regex)

    change = None
    if prior_count > 0:
        change = (current_count - prior_count) / prior_count

    return {"current": current_count, "prior": prior_count, "change": change}


def get_event_detail_table(event_name, params, page_path_regex=None, click_url_regex=None, use_page_title=False):
    """Fetch event details broken down by page path and entity name.

    Args:
        event_name: GA4 event name.
        params: Analytics params for the period.
        page_path_regex: Optional regex to filter by page path.
        click_url_regex: Optional regex to filter by click URL.
        use_page_title: If True, include page title in the results as dataset_title.

    Returns:
        List of dicts with "page_path", "entity_name", and "count" keys,
        sorted by count descending.
    """
    dimensions = [DIMENSION_EVENT_NAME, DIMENSION_PAGE_PATH, DIMENSION_ENTITY_NAME]
    if click_url_regex:
        dimensions.append(DIMENSION_CUSTOM_URL)
    if use_page_title:
        dimensions.append(DIMENSION_PAGE_TITLE)

    df = get_data_df_from_fields(
        [METRIC_EVENT_COUNT],
        dimensions,
        dimension_filter=f"eventName=={event_name}",
        **params,
    )

    if len(df) == 0:
        return []

    if page_path_regex:
        pattern = re.compile(page_path_regex)
        df = df[df[DIMENSION_PAGE_PATH["alias"]].str.match(pattern, na=False)]

    if click_url_regex:
        url_pattern = re.compile(click_url_regex)
        df = df[df[DIMENSION_CUSTOM_URL["alias"]].str.contains(url_pattern, na=False)]

    if len(df) == 0:
        return []

    # Aggregate by page_path (and optionally page_title), summing counts
    count_col = METRIC_EVENT_COUNT["alias"]
    page_col = DIMENSION_PAGE_PATH["alias"]
    entity_col = DIMENSION_ENTITY_NAME["alias"]

    if use_page_title:
        title_col = DIMENSION_PAGE_TITLE["alias"]
        grouped = df.groupby([page_col, entity_col, title_col], as_index=False)[count_col].sum()
        result = grouped[[page_col, entity_col, count_col, title_col]].copy()
        result.columns = ["page_path", "entity_name", "count", "dataset_title"]
    else:
        grouped = df.groupby([page_col, entity_col], as_index=False)[count_col].sum()
        result = grouped[[page_col, entity_col, count_col]].copy()
        result.columns = ["page_path", "entity_name", "count"]

    result = result.sort_values("count", ascending=False)
    return result.to_dict(orient="records")


def get_file_downloads(params):
    """Fetch file_downloaded event count.

    Returns:
        Total count of file_downloaded events (int).
    """
    df = elements.get_index_table_download_df(params)

    if len(df) == 0:
        return 0

    return int(df[METRIC_EVENT_COUNT["alias"]].sum())


def get_access_requests(params, url_patterns):
    """Fetch outbound_link_clicked events filtered by URL patterns.

    Args:
        params: Analytics params for the period.
        url_patterns: List of URL substrings to match (e.g., ["duos.org", "dbgap.ncbi.nlm.nih.gov"]).

    Returns:
        List of dicts with "page_path", "click_url", and "count" keys,
        sorted by count descending.
    """
    df = get_data_df_from_fields(
        [METRIC_EVENT_COUNT],
        [DIMENSION_EVENT_NAME, DIMENSION_PAGE_PATH, DIMENSION_CUSTOM_URL],
        dimension_filter="eventName==outbound_link_clicked",
        **params,
    )

    if len(df) == 0:
        return []

    url_col = DIMENSION_CUSTOM_URL["alias"]
    mask = df[url_col].str.contains("|".join(re.escape(p) for p in url_patterns), case=False, na=False)
    df = df[mask]

    if len(df) == 0:
        return []

    result = df[[DIMENSION_PAGE_PATH["alias"], url_col, METRIC_EVENT_COUNT["alias"]]].copy()
    result.columns = ["page_path", "click_url", "count"]
    result["count"] = result["count"].astype(int)
    result = result.groupby(["page_path", "click_url"], as_index=False)["count"].sum()
    result = result.sort_values("count", ascending=False)
    return result.to_dict(orient="records")


def get_file_download_events(params):
    """Fetch GA4 enhanced measurement file_download event count.

    Returns:
        Total count of file_download events (int).
    """
    df = get_data_df_from_fields(
        [METRIC_EVENT_COUNT],
        [DIMENSION_EVENT_NAME],
        dimension_filter="eventName==file_download",
        **params,
    )

    if len(df) == 0:
        return 0

    return int(df[METRIC_EVENT_COUNT["alias"]].sum())


def get_search_queries(params, search_path="/search"):
    """Fetch search queries by extracting query params from pagePathPlusQueryString.

    Args:
        params: Analytics params for the period.
        search_path: The search page path prefix (default: "/search").

    Returns:
        Dict with "total" (int) and "queries" (list of dicts with "query" and "count").
    """
    df = get_data_df_from_fields(
        [METRIC_PAGE_VIEWS],
        [DIMENSION_PAGE_PATH_PLUS_QUERY],
        dimension_filter=f"pagePathPlusQueryString=@{search_path}?",
        **params,
    )

    if len(df) == 0:
        return {"total": 0, "queries": []}

    path_col = DIMENSION_PAGE_PATH_PLUS_QUERY["alias"]
    views_col = METRIC_PAGE_VIEWS["alias"]

    aggregated = {}
    for _, row in df.iterrows():
        parsed = parse_qs(urlparse(row[path_col]).query)
        query = parsed.get("q", parsed.get("query", [""]))[0]
        if query:
            aggregated[query] = aggregated.get(query, 0) + int(row[views_col])

    queries = [{"query": q, "count": c} for q, c in aggregated.items()]
    queries.sort(key=lambda x: x["count"], reverse=True)
    total = sum(q["count"] for q in queries)

    return {"total": total, "queries": queries}


def _generate_month_range(start_date, end_date):
    """Generate a list of YYYY-MM strings covering the given date range."""
    from datetime import datetime
    start = datetime.strptime(start_date[:7], "%Y-%m")
    end = datetime.strptime(end_date[:7], "%Y-%m")
    months = []
    current = start
    while current <= end:
        months.append(current.strftime("%Y-%m"))
        if current.month == 12:
            current = current.replace(year=current.year + 1, month=1)
        else:
            current = current.replace(month=current.month + 1)
    return months


def _monthly_counts_from_df(df, start_date, end_date, page_path_regex=None, click_url_regex=None):
    """Aggregate a DataFrame of event counts into monthly totals.

    Args:
        df: DataFrame with DIMENSION_YEAR_MONTH and METRIC_EVENT_COUNT columns.
        start_date: Start date string (YYYY-MM-DD) for filling missing months.
        end_date: End date string (YYYY-MM-DD) for filling missing months.
        page_path_regex: Optional regex to filter by page path before aggregating.
        click_url_regex: Optional regex to filter by click URL before aggregating.

    Returns:
        List of dicts with "month" (YYYY-MM) and "count" keys, sorted by month.
    """
    all_months = _generate_month_range(start_date, end_date)

    if len(df) == 0:
        return [{"month": m, "count": 0} for m in all_months]

    if page_path_regex:
        pattern = re.compile(page_path_regex)
        df = df[df[DIMENSION_PAGE_PATH["alias"]].str.match(pattern, na=False)]

    if click_url_regex:
        url_pattern = re.compile(click_url_regex)
        df = df[df[DIMENSION_CUSTOM_URL["alias"]].str.contains(url_pattern, na=False)]

    month_col = DIMENSION_YEAR_MONTH["alias"]
    count_col = METRIC_EVENT_COUNT["alias"]
    grouped = df.groupby(month_col, as_index=False)[count_col].sum()
    grouped[month_col] = grouped[month_col].apply(
        lambda m: f"{m[:4]}-{m[4:]}" if len(m) == 6 and "-" not in m else m
    )
    counts_by_month = dict(zip(grouped[month_col], grouped[count_col].astype(int)))
    return [{"month": m, "count": counts_by_month.get(m, 0)} for m in all_months]


def _fetch_event_monthly_df(event_name, params, needs_page_path=False, needs_click_url=False):
    """Fetch raw monthly event data from GA4.

    Args:
        event_name: GA4 event name.
        params: Analytics params including start_date and end_date.
        needs_page_path: Whether to include DIMENSION_PAGE_PATH for regex filtering.
        needs_click_url: Whether to include DIMENSION_CUSTOM_URL for regex filtering.

    Returns:
        DataFrame with year-month and event count columns.
    """
    dimensions = [DIMENSION_EVENT_NAME, DIMENSION_YEAR_MONTH]
    if needs_page_path:
        dimensions.append(DIMENSION_PAGE_PATH)
    if needs_click_url:
        dimensions.append(DIMENSION_CUSTOM_URL)

    return get_data_df_from_fields(
        [METRIC_EVENT_COUNT],
        dimensions,
        dimension_filter=f"eventName=={event_name}",
        **params,
    )


def fetch_data(
    ga_authentication,
    property_id,
    current_month,
    analytics_start,
    custom_events=None,
    event_charts=None,
    historic_data_path=None,
    access_request_urls=None,
    exclude_pages=None,
    base_dimension_filter=None,
    search_path=None,
):
    """Fetch all analytics data for the static site.

    Args:
        ga_authentication: GA4 authentication object from analytics.api.authenticate.
        property_id: GA4 property ID.
        current_month: Current month string (YYYY-MM).
        analytics_start: Start date for all-time data (YYYY-MM-DD).
        custom_events: List of dicts with "event_name" and "label" keys.
            Optional keys: "page_path_regex", "click_url_regex", "detail_table", "use_page_title".
        historic_data_path: Path to historic UA data JSON file (optional).
        exclude_pages: Optional list of page paths to exclude from pageview data.
        base_dimension_filter: Optional GA4 dimension filter dict applied to all queries.
        search_path: Optional search page path to extract search queries from (e.g., "/search").

    Returns:
        Dict containing DataFrames and stats for each data type.
    """
    if custom_events is None:
        custom_events = []

    report_dates = elements.get_bounds_for_month_and_prev(current_month)
    start_date_current = report_dates["start_current"]
    end_date_current = report_dates["end_current"]
    start_date_prior = report_dates["start_previous"]
    end_date_prior = report_dates["end_previous"]

    print(f"Current month: {start_date_current} to {end_date_current}")
    print(f"Prior month: {start_date_prior} to {end_date_prior}")

    params = {
        "service_system": ga_authentication,
        "start_date": start_date_current,
        "end_date": end_date_current,
        "property": property_id,
    }
    if base_dimension_filter:
        params["base_dimension_filter"] = base_dimension_filter
    params_all_time = {**params, "start_date": analytics_start, "end_date": end_date_current}
    params_prior = {**params, "start_date": start_date_prior, "end_date": end_date_prior}

    print("Fetching monthly traffic data...")
    historic_kwargs = {"additional_data_path": historic_data_path, "additional_data_behavior": elements.ADDITIONAL_DATA_BEHAVIOR.ADD} if historic_data_path else {}
    df_monthly_traffic = elements.get_page_views_over_time_df(params_all_time, **historic_kwargs)

    print("Fetching pageviews data...")
    df_pageviews = elements.get_page_views_change(
        params, start_date_current, end_date_current, start_date_prior, end_date_prior,
    )

    if exclude_pages and df_pageviews is not None and len(df_pageviews) > 0:
        page_col = DIMENSION_PAGE_PATH["alias"]
        df_pageviews = df_pageviews[~df_pageviews[page_col].isin(exclude_pages)]
        print(f"  Excluded {len(exclude_pages)} page(s) from pageviews")

    if df_pageviews is not None and len(df_pageviews) > 0:
        page_col = DIMENSION_PAGE_PATH["alias"]
        suspicious_mask = df_pageviews[page_col].str.match(SUSPICIOUS_PAGE_PATH_RE, na=False)
        n_suspicious = suspicious_mask.sum()
        if n_suspicious > 0:
            df_pageviews = df_pageviews[~suspicious_mask]
            print(f"  Filtered {n_suspicious} suspicious page path(s)")

    print("Fetching outbound links data...")
    df_outbound = elements.get_outbound_links_change(
        params, start_date_current, end_date_current, start_date_prior, end_date_prior,
    )

    print("Fetching filter selections data...")
    try:
        df_filter_selected = elements.get_index_filter_selected_change(
            params, start_date_current, end_date_current, start_date_prior, end_date_prior,
        )
    except Exception as e:
        print(f"  Skipped (not available for this property): {e}")
        df_filter_selected = None

    print("Fetching sessions and engagement data...")
    df_sessions_current = get_data_df_from_fields(
        [METRIC_SESSIONS, METRIC_ENGAGED_SESSIONS, METRIC_ENGAGEMENT_RATE], [], **params,
    )
    df_sessions_prior = get_data_df_from_fields(
        [METRIC_SESSIONS, METRIC_ENGAGED_SESSIONS, METRIC_ENGAGEMENT_RATE], [], **params_prior,
    )
    sessions_current = int(df_sessions_current[METRIC_SESSIONS["alias"]].sum()) if len(df_sessions_current) > 0 else 0
    sessions_prior = int(df_sessions_prior[METRIC_SESSIONS["alias"]].sum()) if len(df_sessions_prior) > 0 else 0
    engaged_sessions_current = int(df_sessions_current[METRIC_ENGAGED_SESSIONS["alias"]].sum()) if len(df_sessions_current) > 0 else 0
    engaged_sessions_prior = int(df_sessions_prior[METRIC_ENGAGED_SESSIONS["alias"]].sum()) if len(df_sessions_prior) > 0 else 0
    engagement_current = float(df_sessions_current[METRIC_ENGAGEMENT_RATE["alias"]].mean()) if len(df_sessions_current) > 0 else 0
    engagement_prior = float(df_sessions_prior[METRIC_ENGAGEMENT_RATE["alias"]].mean()) if len(df_sessions_prior) > 0 else 0

    print("Fetching file downloads data...")
    try:
        file_downloads = get_file_downloads(params)
    except Exception as e:
        print(f"  Skipped (not available for this property): {e}")
        file_downloads = 0

    access_requests = []
    if access_request_urls:
        print("Fetching access requests data...")
        access_requests = get_access_requests(params, access_request_urls)

    print("Fetching file download events...")
    try:
        file_download_events = get_file_download_events(params)
    except Exception as e:
        print(f"  Skipped (not available for this property): {e}")
        file_download_events = 0

    search_queries = {"total": 0, "queries": []}
    if search_path:
        print("Fetching search queries data...")
        try:
            search_queries = get_search_queries(params, search_path)
        except Exception as e:
            print(f"  Skipped (not available for this property): {e}")

    data = {
        "sessions": {
            "current": sessions_current,
            "prior": sessions_prior,
        },
        "engaged_sessions": {
            "current": engaged_sessions_current,
            "prior": engaged_sessions_prior,
        },
        "engagement_rate": {
            "current": engagement_current,
            "prior": engagement_prior,
        },
        "monthly_traffic": df_monthly_traffic,
        "pageviews": df_pageviews,
        "outbound": df_outbound,
        "filter_selected": df_filter_selected,
        "file_downloads": file_downloads,
        "access_requests": access_requests,
        "search_queries": search_queries,
        "file_download_events": file_download_events,
        "dates": {
            "start_current": start_date_current,
            "end_current": end_date_current,
            "start_prior": start_date_prior,
            "end_prior": end_date_prior,
        },
    }

    for event in custom_events:
        key = event_key(event)
        print(f"Fetching {event['label']} data...")
        data[f"event_{key}"] = get_custom_event_change(
            event["event_name"], params, params_prior,
            page_path_regex=event.get("page_path_regex"),
            click_url_regex=event.get("click_url_regex"),
        )
        if event.get("detail_table"):
            print(f"Fetching {event['label']} detail table...")
            data[f"event_{key}_detail"] = get_event_detail_table(
                event["event_name"], params,
                page_path_regex=event.get("page_path_regex"),
                click_url_regex=event.get("click_url_regex"),
                use_page_title=event.get("use_page_title", False),
            )

    if event_charts:
        chart_start = event_charts.get("chart_start", analytics_start)
        params_chart = {**params, "start_date": chart_start, "end_date": end_date_current}
        data["event_chart_config"] = event_charts

        # Group series by event_name to avoid duplicate API calls
        series_by_event = {}
        for chart in event_charts.get("charts", []):
            for series in chart.get("series", []):
                event_name = series.get("event_name", series["event_key"])
                series_by_event.setdefault(event_name, []).append(series)

        for event_name, series_list in series_by_event.items():
            needs_page_path = any(s.get("page_path_regex") for s in series_list)
            needs_click_url = any(s.get("click_url_regex") for s in series_list)
            print(f"Fetching monthly counts for {event_name}...")
            df = _fetch_event_monthly_df(event_name, params_chart, needs_page_path, needs_click_url)
            for series in series_list:
                data[f"event_chart_{series['event_key']}"] = _monthly_counts_from_df(
                    df, chart_start, end_date_current,
                    page_path_regex=series.get("page_path_regex"),
                    click_url_regex=series.get("click_url_regex"),
                )

    print("Data fetching complete!")
    return data
