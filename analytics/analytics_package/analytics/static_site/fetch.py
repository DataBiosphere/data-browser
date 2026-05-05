"""Fetch analytics data from GA4 for the static site."""

import re
from urllib.parse import urlparse, parse_qs

from .. import sheets_elements as elements
from .._sheets_utils import get_data_df_from_fields
from ..entities import (
    DIMENSION_BUILTIN_URL,
    DIMENSION_FILE_NAME,
    METRIC_EVENT_COUNT,
    METRIC_PAGE_VIEWS,
    METRIC_SESSIONS,
    DIMENSION_EVENT_NAME,
    DIMENSION_PAGE_PATH,
    DIMENSION_PAGE_PATH_PLUS_QUERY,
    DIMENSION_CUSTOM_URL,
    DIMENSION_ENTITY_NAME,
    DIMENSION_RELATED_ENTITY_ID,
    DIMENSION_RELATED_ENTITY_NAME,
)

METRIC_ENGAGEMENT_RATE = {
    "id": "engagementRate",
    "alias": "Engagement Rate",
}


def event_key(event):
    """Return the unique key for a custom event config dict."""
    return event.get("key", event["event_name"])


def _count_events(event_name, params, page_path_regex=None):
    """Fetch event count, optionally filtered by page path regex."""
    dimensions = [DIMENSION_EVENT_NAME]
    if page_path_regex:
        dimensions.append(DIMENSION_PAGE_PATH)

    df = get_data_df_from_fields(
        [METRIC_EVENT_COUNT],
        dimensions,
        dimension_filter=f"eventName=={event_name}",
        **params,
    )

    if len(df) == 0:
        return 0

    if page_path_regex:
        pattern = re.compile(page_path_regex)
        mask = df[DIMENSION_PAGE_PATH["alias"]].str.match(pattern, na=False)
        return int(df.loc[mask, METRIC_EVENT_COUNT["alias"]].sum())

    return int(df[METRIC_EVENT_COUNT["alias"]].sum())


def get_custom_event_change(event_name, params_current, params_prior, page_path_regex=None):
    """Fetch a custom event count with month-over-month change.

    Args:
        event_name: GA4 event name (e.g., "chat_submitted").
        params_current: Analytics params for the current period.
        params_prior: Analytics params for the prior period.
        page_path_regex: Optional regex to filter by page path.

    Returns:
        Dict with "current", "prior", and "change" keys.
    """
    current_count = _count_events(event_name, params_current, page_path_regex)
    prior_count = _count_events(event_name, params_prior, page_path_regex)

    change = None
    if prior_count > 0:
        change = (current_count - prior_count) / prior_count

    return {"current": current_count, "prior": prior_count, "change": change}


def get_event_detail_table(event_name, params, page_path_regex=None):
    """Fetch event details broken down by page path and entity name.

    Args:
        event_name: GA4 event name.
        params: Analytics params for the period.
        page_path_regex: Optional regex to filter by page path.

    Returns:
        List of dicts with "page_path", "entity_name", and "count" keys,
        sorted by count descending.
    """
    df = get_data_df_from_fields(
        [METRIC_EVENT_COUNT],
        [DIMENSION_EVENT_NAME, DIMENSION_PAGE_PATH, DIMENSION_ENTITY_NAME],
        dimension_filter=f"eventName=={event_name}",
        **params,
    )

    if len(df) == 0:
        return []

    if page_path_regex:
        pattern = re.compile(page_path_regex)
        df = df[df[DIMENSION_PAGE_PATH["alias"]].str.match(pattern, na=False)]

    if len(df) == 0:
        return []

    result = df[[DIMENSION_PAGE_PATH["alias"], DIMENSION_ENTITY_NAME["alias"], METRIC_EVENT_COUNT["alias"]]].copy()
    result.columns = ["page_path", "entity_name", "count"]
    result = result.sort_values("count", ascending=False)
    return result.to_dict(orient="records")


def get_file_downloads(params):
    """Fetch file_downloaded events with entity name and related entity name.

    Returns:
        List of dicts with "entity_name", "dataset_id", "related_entity_name",
        and "count" keys.
    """
    df = elements.get_index_table_download_df(params)

    if len(df) == 0:
        return []

    result = df[[DIMENSION_ENTITY_NAME["alias"], DIMENSION_RELATED_ENTITY_ID["alias"], DIMENSION_RELATED_ENTITY_NAME["alias"], METRIC_EVENT_COUNT["alias"]]].copy()
    result.columns = ["entity_name", "dataset_id", "related_entity_name", "count"]
    result = result.sort_values("count", ascending=False)
    return result.to_dict(orient="records")


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
    """Fetch GA4 enhanced measurement file_download events.

    Returns:
        Dict with "total" (int) and "files" (list of dicts with "file_name", "link_url", "count").
    """
    df = get_data_df_from_fields(
        [METRIC_EVENT_COUNT],
        [DIMENSION_EVENT_NAME, DIMENSION_FILE_NAME, DIMENSION_BUILTIN_URL],
        dimension_filter="eventName==file_download",
        **params,
    )

    if len(df) == 0:
        return {"total": 0, "files": []}

    result = df[[DIMENSION_FILE_NAME["alias"], DIMENSION_BUILTIN_URL["alias"], METRIC_EVENT_COUNT["alias"]]].copy()
    result.columns = ["file_name", "link_url", "count"]
    result["count"] = result["count"].astype(int)
    total = int(result["count"].sum())
    result = result.sort_values("count", ascending=False)

    return {"total": total, "files": result.to_dict(orient="records")}


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


def fetch_data(
    ga_authentication,
    property_id,
    current_month,
    analytics_start,
    custom_events=None,
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
        [METRIC_SESSIONS, METRIC_ENGAGEMENT_RATE], [], **params,
    )
    df_sessions_prior = get_data_df_from_fields(
        [METRIC_SESSIONS, METRIC_ENGAGEMENT_RATE], [], **params_prior,
    )
    sessions_current = int(df_sessions_current[METRIC_SESSIONS["alias"]].sum()) if len(df_sessions_current) > 0 else 0
    sessions_prior = int(df_sessions_prior[METRIC_SESSIONS["alias"]].sum()) if len(df_sessions_prior) > 0 else 0
    engagement_current = float(df_sessions_current[METRIC_ENGAGEMENT_RATE["alias"]].mean()) if len(df_sessions_current) > 0 else 0
    engagement_prior = float(df_sessions_prior[METRIC_ENGAGEMENT_RATE["alias"]].mean()) if len(df_sessions_prior) > 0 else 0

    print("Fetching file downloads data...")
    try:
        file_downloads = get_file_downloads(params)
    except Exception as e:
        print(f"  Skipped (not available for this property): {e}")
        file_downloads = []

    access_requests = []
    if access_request_urls:
        print("Fetching access requests data...")
        access_requests = get_access_requests(params, access_request_urls)

    print("Fetching file download events...")
    try:
        file_download_events = get_file_download_events(params)
    except Exception as e:
        print(f"  Skipped (not available for this property): {e}")
        file_download_events = {"total": 0, "files": []}

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
        )
        if event.get("detail_table"):
            print(f"Fetching {event['label']} detail table...")
            data[f"event_{key}_detail"] = get_event_detail_table(
                event["event_name"], params,
                page_path_regex=event.get("page_path_regex"),
            )

    print("Data fetching complete!")
    return data
