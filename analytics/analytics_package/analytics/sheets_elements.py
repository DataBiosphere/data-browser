import pandas as pd

from ._sheets_utils import *
from .entities import *
from .sheets_api import COLUMN_FORMAT_OPTIONS
from urllib.parse import urlparse

OUTBOUND_LINKS_CHANGE_FORMATTING = {
    SYNTHETIC_METRIC_CLICKS["change_alias"]: COLUMN_FORMAT_OPTIONS.PERCENT_COLORED,
    METRIC_TOTAL_USERS["change_alias"]: COLUMN_FORMAT_OPTIONS.PERCENT_COLORED,
}

PAGE_VIEWS_CHANGE_FORMATTING = {
    METRIC_PAGE_VIEWS["change_alias"]: COLUMN_FORMAT_OPTIONS.PERCENT_COLORED,
    METRIC_TOTAL_USERS["change_alias"]: COLUMN_FORMAT_OPTIONS.PERCENT_COLORED,
}

PAGE_VIEWS_OVER_TIME_FORMATTING = {
    DIMENSION_YEAR_MONTH["alias"]: COLUMN_FORMAT_OPTIONS.YEAR_MONTH_DATE,
    METRIC_ACTIVE_USERS["change_alias"]: COLUMN_FORMAT_OPTIONS.PERCENT_COLORED,
    METRIC_PAGE_VIEWS["change_alias"]: COLUMN_FORMAT_OPTIONS.PERCENT_COLORED,
}

LANDING_PAGE_CHANGE_FORMATTING = {
    METRIC_SESSIONS["change_alias"]: COLUMN_FORMAT_OPTIONS.PERCENT_COLORED,
}

INDEX_TABLE_DOWNLOAD_CHANGE_FORMATTING = {
    METRIC_EVENT_COUNT["change_alias"]: COLUMN_FORMAT_OPTIONS.PERCENT_COLORED,
    METRIC_TOTAL_USERS["change_alias"]: COLUMN_FORMAT_OPTIONS.PERCENT_COLORED,
}

INDEX_ENTITY_SELECTED_CHANGE_FORMATTING = {
    METRIC_EVENT_COUNT["change_alias"]: COLUMN_FORMAT_OPTIONS.PERCENT_COLORED,
    METRIC_TOTAL_USERS["change_alias"]: COLUMN_FORMAT_OPTIONS.PERCENT_COLORED,
}

INDEX_ENTITY_TABLE_SORTED_CHANGE_FORMATTING = {
    METRIC_EVENT_COUNT["change_alias"]: COLUMN_FORMAT_OPTIONS.PERCENT_COLORED,
    METRIC_TOTAL_USERS["change_alias"]: COLUMN_FORMAT_OPTIONS.PERCENT_COLORED,
}

INDEX_ENTITY_TABLE_PAGINATED_CHANGE_FORMATTING = {
    METRIC_EVENT_COUNT["change_alias"]: COLUMN_FORMAT_OPTIONS.PERCENT_COLORED,
    METRIC_TOTAL_USERS["change_alias"]: COLUMN_FORMAT_OPTIONS.PERCENT_COLORED,
}

INDEX_FILTER_SELECTED_CHANGE_FORMATTING = {
    METRIC_EVENT_COUNT["change_alias"]: COLUMN_FORMAT_OPTIONS.PERCENT_COLORED,
    METRIC_TOTAL_USERS["change_alias"]: COLUMN_FORMAT_OPTIONS.PERCENT_COLORED,
}

def get_bounds_for_month_and_prev(month):
    """
    Get dates of the first and last day of the given month and the month preceding it.

    :param month: The month to get dates for, represented as a string in YYYY-MM format.
    :return: A dict containing entries "start_current", "end_current", "start_previous", and "end_previous", each holding a string in YYYY-MM-DD format.
    """
    start_current = pd.to_datetime(month)
    end_current = start_current + pd.DateOffset(months=1) - pd.DateOffset(days=1)
    start_previous = start_current - pd.DateOffset(months=1)
    end_previous = start_current - pd.DateOffset(days=1)
    return {
        "start_current": start_current.strftime("%Y-%m-%d"),
        "end_current": end_current.strftime("%Y-%m-%d"),
        "start_previous": start_previous.strftime("%Y-%m-%d"),
        "end_previous": end_previous.strftime("%Y-%m-%d")
    }

def get_outbound_links_df(analytics_params, ignore_index=True):
    """
    Get a DataFrame with outbound links from the Analytics API. Merges the builtin and custom events for outbound links.
    analytics_params cannot currently include a dimension_filter

    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param ignore_index: If true, the index will be an arbitrary range index. If false, the index will be the dimensions
    :return: a DataFrame with the response from the Analytics API. By default, dimensions and metrics both form columns
        Dimensions: DIMENSION_PAGE_PATH, SYNTHETIC_DIMENSION_CLICKED_HOSTNAME, SYNTHETIC_DIMENSION_CLICKED_LINK
        Metrics: SYNTHETIC_METRIC_CLICKS, METRIC_TOTAL_USERS
    """
    pd.set_option('future.no_silent_downcasting', True)
    assert "dimension_filter" not in analytics_params
    # Get the builtin "Click" event
    df_builtin_links =get_data_df_from_fields(
        [METRIC_EVENT_COUNT, METRIC_TOTAL_USERS],
        [DIMENSION_PAGE_PATH, DIMENSION_BUILTIN_URL, DIMENSION_EVENT_NAME],
        dimension_filter=f"eventName=={EVENT_BUILTIN_CLICK['id']}",
        **analytics_params,
    ).groupby(
        [DIMENSION_PAGE_PATH["alias"], DIMENSION_BUILTIN_URL["alias"]]
    ).sum().reset_index()
    # Get the custom "outbound_link_click" event
    df_custom_links = get_data_df_from_fields(
        [METRIC_EVENT_COUNT, METRIC_TOTAL_USERS],
        [DIMENSION_EVENT_NAME, DIMENSION_CUSTOM_URL, DIMENSION_PAGE_PATH], 
        dimension_filter=f"eventName=={EVENT_CUSTOM_CLICK['id']}",
        **analytics_params, 
    ).groupby(
        [DIMENSION_PAGE_PATH["alias"], DIMENSION_CUSTOM_URL["alias"]]
    ).sum().reset_index()
    # Concatenate the two dataframes, avoiding duplicates
    # Keep the link from the builtin event, unless the link contains a #fragment, in which case keep the link from the custom event
    df_builtin_links["builtin"] = True
    df_builtin_links["truncated_url"] = df_builtin_links[DIMENSION_BUILTIN_URL["alias"]]
    df_custom_links["truncated_url"] = df_custom_links[DIMENSION_CUSTOM_URL["alias"]].str.replace(r"#.*", "", regex=True)
    df_outbound_links_fragments = df_custom_links.loc[df_custom_links[DIMENSION_CUSTOM_URL["alias"]].str.contains("#")].copy()
    df_outbound_links_fragments["is_fragment"] = True
    df_all_links = pd.concat(
        [df_builtin_links, df_outbound_links_fragments], ignore_index=True
    )
    # Use the builtin link, unless the link is not in the custom links, in which case use the custom link
    df_all_links = df_all_links.loc[
        ~(df_all_links["truncated_url"].isin(df_outbound_links_fragments["truncated_url"]) & df_all_links["builtin"])
    ].sort_values(METRIC_EVENT_COUNT["alias"], ascending=False)
    df_all_links["is_fragment"] = df_all_links["is_fragment"].fillna(False).astype(bool)
    # Use the builtin link, unless the link is a fragment, in which case use the custom link
    df_all_links["complete_url"]  = df_all_links[DIMENSION_BUILTIN_URL["alias"]].where(
        ~df_all_links["is_fragment"],
        df_all_links[DIMENSION_CUSTOM_URL["alias"]]
    )
    df_all_links["hostname"] = df_all_links["complete_url"].map(lambda x: urlparse(x).hostname)
    dimension_aliases_to_keep = [
        DIMENSION_PAGE_PATH["alias"],
        SYNTHETIC_DIMENSION_CLICKED_LINK["alias"],
        SYNTHETIC_DIMENSION_CLICKED_HOSTNAME["alias"],
    ]
    metric_aliases_to_keep = [
        SYNTHETIC_METRIC_CLICKS["alias"],
        METRIC_TOTAL_USERS["alias"],
    ]
    df_all_links = df_all_links.drop(
        columns=[DIMENSION_BUILTIN_URL["alias"], DIMENSION_CUSTOM_URL["alias"], "builtin", "is_fragment"]
    ).rename(
        columns={
            "complete_url": SYNTHETIC_DIMENSION_CLICKED_LINK["alias"],
            METRIC_EVENT_COUNT["alias"]: SYNTHETIC_METRIC_CLICKS["alias"],
            "hostname": SYNTHETIC_DIMENSION_CLICKED_HOSTNAME["alias"],
        } 
    )[[
        *dimension_aliases_to_keep, *metric_aliases_to_keep
    ]].copy()

    if not ignore_index:
        return df_all_links.set_index(dimension_aliases_to_keep)
    else:
        return df_all_links.reset_index(drop=True)

def get_outbound_links_change(analytics_params, start_current, end_current, start_previous, end_previous):
    """
    Get a DataFrame with outbound links from the Analytics API and a comparison for the prior period

    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param start_current: the start date for the current month in the format "YYYY-MM-DD"
    :param end_current: the end date for the current month
    :param start_previous: the start date for the previous month
    :param end_previous: the end date for the previous month
    :return: a DataFrame with the outbound links from the Analytics API. 
        By default, dimensions and metrics both form columns.
        Columns are present for both metric values and metric changes from the prior period
        Dimensions: DIMENSION_PAGE_PATH, SYNTHETIC_DIMENSION_CLICKED_HOSTNAME, SYNTHETIC_DIMENSION_CLICKED_LINK
        Metrics: SYNTHETIC_METRIC_CLICKS, METRIC_TOTAL_USERS
    """
    return get_one_period_change_df(
        get_outbound_links_df, 
        [SYNTHETIC_METRIC_CLICKS, METRIC_TOTAL_USERS],
        analytics_params, 
        start_current, 
        end_current, 
        start_previous, 
        end_previous,
        sort_results=[SYNTHETIC_METRIC_CLICKS, METRIC_TOTAL_USERS]
    )

def get_page_views_df(analytics_params, ignore_index=False):
    """
    Get a DataFrame with page views from the Analytics API

    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param ignore_index: If true, the index will be an arbitrary range index. If false, the index will be the dimensions
    :return: a DataFrame with the response from the Analytics API. By default, dimensions and metrics both form columns
        Dimensions: DIMENSION_PAGE_PATH
        Metrics: METRIC_PAGE_VIEWS, METRIC_TOTAL_USERS
    """
    assert "dimension_filter" not in analytics_params
    df_response = get_data_df_from_fields(
        [METRIC_EVENT_COUNT, METRIC_TOTAL_USERS, METRIC_PAGE_VIEWS],
        [DIMENSION_PAGE_PATH, DIMENSION_EVENT_NAME],
        **analytics_params,
        dimension_filter=f"eventName=={EVENT_PAGE_VIEW['id']}",
    )[[DIMENSION_PAGE_PATH["alias"], METRIC_PAGE_VIEWS["alias"], METRIC_TOTAL_USERS["alias"]]].copy()
    if not ignore_index:
        df_response = df_response.set_index(DIMENSION_PAGE_PATH["alias"])
    return df_response

def get_page_views_change(analytics_params, start_current, end_current, start_previous, end_previous):
    """
    Get a DataFrame with page views from the Analytics API and a comparison for the prior month

    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param start_current: the start date for the current month in the format "YYYY-MM-DD"
    :param end_current: the end date for the current month
    :param start_previous: the start date for the previous month
    :param end_previous: the end date for the previous month
    :return: a DataFrame with the response from the Analytics API. By default, dimensions and metrics both form columns
        Columns are present for both metric values and metric changes from the prior period
        Dimensions: DIMENSION_PAGE_PATH
        Metrics: METRIC_PAGE_VIEWS, METRIC_TOTAL_USERS
    """
    return get_one_period_change_df(
        get_page_views_df, 
        [METRIC_PAGE_VIEWS, METRIC_TOTAL_USERS],
        analytics_params, 
        start_current, 
        end_current, 
        start_previous, 
        end_previous,
        sort_results=[METRIC_PAGE_VIEWS, METRIC_TOTAL_USERS]
    )

def get_one_period_change_df(df_function, change_metrics, analytics_params, start_current, end_current, start_previous, end_previous, sort_results=None, sort_ascending=False, ignore_index=False):
    """
    Get a DataFrame with the change between two periods for the given metrics, renamed to match titles
    :param df_function: a function that returns a dataframe, with numerical columns matching the aliases of change_metrics
    :param change_metrics: an iterable of the objects representing metrics to be displayed
    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param start_current: the start date for the current month in the format "YYYY-MM-DD"
    :param end_current: the end date for the current month
    :param start_previous: the start date for the prior month
    :param end_previous: the end date for the prior month
    :param sort_results: an iterable containing the metrics to sort the results by, defaults to None
    :param sort_ascending: whether to sort the results in ascending order, defaults to False
        If a boolean value is provided, all metrics will be sorted in the same order
        If an iterable is provided, values of the iterable correspond to values of sort_results
    :param ignore_index: if true, the index will be an arbitrary range index. If false, the index will be the dimensions
    :return: a DataFrame with the change between two periods for the given metrics, renamed to match titles
        Columns are dimension aliases (as strings), metric aliases (as ints), and metric change aliases (as floats)
    """
    
    analytics_params_current = {
        **analytics_params,
        "start_date": start_current,
        "end_date": end_current,
    }
    analytics_params_previous = {
        **analytics_params,
        "start_date": start_previous,
        "end_date": end_previous,
    }

    df_current = df_function(
        analytics_params_current,
        ignore_index=False
    )
    df_previous = df_function(
        analytics_params_previous,
        ignore_index=False
    )
    df_changes = pd.concat(
        [
            get_one_period_change_series(
                df_current[metric["alias"]], df_previous[metric["alias"]], start_current, end_current, start_previous, end_previous
            ) for metric in change_metrics
        ],
        axis=1,
    ).rename(
        columns={metric["alias"]: metric["change_alias"] for metric in change_metrics}
    )
    df_current_with_changes = pd.concat(
        [df_current.reindex(df_changes.index).fillna(0), df_changes],
        axis=1
    )
    if sort_results:
        df_current_with_changes = df_current_with_changes.sort_values(
            [metric["alias"] for metric in sort_results], ascending=sort_ascending, kind="stable"
        )
    if ignore_index:
        return df_current_with_changes
    else:
        return df_current_with_changes.reset_index()

def get_page_views_over_time_df(analytics_params, additional_data_path=None, additional_data_behavior=None):
    """
    Get a DataFrame with pageviews and total active users over time from the Analytics API.

    :param analytics_params: the parameters for the Analytics API, including service params, start dates, and end dates
    :param additional_data_path: the path to a JSON file with additional data to be added to the DataFrame, defaults to None
    :param additional_data_behavior: the behavior to use when adding the additional data, as an instance of ADDITIONAL_DATA_BEHAVIOR, defaults to None
    :return: a DataFrame with the pageviews and total active users over time from the Analytics API. 
        Columns are the dimension aliases, metrics (as ints), and change metrics (as floats)
        Dimensions: DIMENSION_YEAR_MONTH (as a datetime)
        Metrics: METRIC_ACTIVE_USERS, METRIC_PAGE_VIEWS
    """
    return get_change_over_time_df(
        [METRIC_ACTIVE_USERS, METRIC_PAGE_VIEWS],
        DIMENSION_YEAR_MONTH,
        additional_data_path=additional_data_path,
        additional_data_behavior=additional_data_behavior,
        **analytics_params
    )

def get_landing_page_df(analytics_params, ignore_index=True):
    """
    Get a DataFrame with landing pages from the Analytics API.

    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param ignore_index: If true, the index will be an arbitrary range index. If false, the index will be the dimensions
    :return: a DataFrame with the landing pages from the Analytics API
        By default, dimension and metric aliases both form columns
        Dimensions: DIMENSION_LANDING_PAGE,
        Metrics: METRIC_SESSIONS
    """
    df_response = get_data_df_from_fields(
        [METRIC_SESSIONS],
        [DIMENSION_LANDING_PAGE],
        **analytics_params,
    )[[DIMENSION_LANDING_PAGE["alias"], METRIC_SESSIONS["alias"]]].copy()
    if not ignore_index:
        df_response = df_response.set_index(DIMENSION_LANDING_PAGE["alias"])
    return df_response

def get_landing_page_change(analytics_params, start_current, end_current, start_previous, end_previous):
    """
    Get a DataFrame with landing pages from the Analytics API and a comparison for the prior month
    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param start_current: the start date for the current month in the format "YYYY-MM-DD"
    :param end_current: the end date for the current month
    :param start_previous: the start date for the previous month
    :param end_previous: the end date for the previous month
    :return: a DataFrame with the landing pages from the Analytics API. 
        By default, dimensions and metrics both form columns
        Columns are present for both metric values and metric changes from the prior period
        Dimensions: DIMENSION_LANDING_PAGE
        Metrics: METRIC_SESSIONS
    """
    return get_one_period_change_df(
        get_landing_page_df,
        [METRIC_SESSIONS],
        analytics_params,
        start_current,
        end_current,
        start_previous,
        end_previous,
        sort_results=[METRIC_SESSIONS]
    )
    
def get_index_table_download_df(analytics_params, ignore_index=True):
    """
    Get a DataFrame with firect file downloads from the Analytics API.

    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param ignore_index: If true, the index will be an arbitrary range index. If false, the index will be the dimensions
    :return: a DataFrame with the landing pages from the Analytics API
        By default, dimension and metric aliases both form columns
        Dimensions: DIMENSION_ENTITY_NAME, DIMENSION_RELATED_ENTITY_ID, DIMENSION_RELATED_ENTITY_NAME
        Metrics: METRIC_EVENT_COUNT, METRIC_TOTAL_USERS
    """
    assert "dimension_filter" not in analytics_params
    df_response = get_data_df_from_fields(
        [METRIC_EVENT_COUNT, METRIC_TOTAL_USERS],
        [DIMENSION_ENTITY_NAME, DIMENSION_RELATED_ENTITY_ID, DIMENSION_RELATED_ENTITY_NAME],
        **analytics_params,
        dimension_filter=f"eventName=={EVENT_FILE_DOWNLOADED['id']}",
    )
    if not ignore_index:
        df_response = df_response.set_index([DIMENSION_ENTITY_NAME["alias"], DIMENSION_RELATED_ENTITY_ID["alias"], DIMENSION_RELATED_ENTITY_NAME["alias"]])
    return df_response

def get_index_table_download_change(analytics_params, start_current, end_current, start_previous, end_previous):
    """
    Get a DataFrame with firect file downloads from the Analytics API and a comparison for the prior month
    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param start_current: the start date for the current month in the format "YYYY-MM-DD"
    :param end_current: the end date for the current month
    :param start_previous: the start date for the previous month
    :param end_previous: the end date for the previous month
    :return: a DataFrame with the landing pages from the Analytics API. 
        By default, dimensions and metrics both form columns
        Columns are present for both metric values and metric changes from the prior period
        Dimensions: DIMENSION_ENTITY_NAME, DIMENSION_RELATED_ENTITY_ID, DIMENSION_RELATED_ENTITY_NAME
        Metrics: METRIC_EVENT_COUNT, METRIC_TOTAL_USERS
    """
    return get_one_period_change_df(
        get_index_table_download_df,
        [METRIC_EVENT_COUNT, METRIC_TOTAL_USERS],
        analytics_params,
        start_current,
        end_current,
        start_previous,
        end_previous,
        sort_results=[METRIC_EVENT_COUNT, METRIC_TOTAL_USERS]
    )

def get_index_entity_selected_df(analytics_params, ignore_index=True):
    """
    Get a DataFrame with index tab selections from the Analytics API.

    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param ignore_index: If true, the index will be an arbitrary range index. If false, the index will be the dimensions
    :return: a DataFrame with the landing pages from the Analytics API
        By default, dimension and metric aliases both form columns
        Dimensions: DIMENSION_ENTITY_NAME_TAB
        Metrics: METRIC_EVENT_COUNT, METRIC_TOTAL_USERS
    """
    assert "dimension_filter" not in analytics_params
    df_response = get_data_df_from_fields(
        [METRIC_EVENT_COUNT, METRIC_TOTAL_USERS],
        [DIMENSION_ENTITY_NAME_TAB],
        **analytics_params,
        dimension_filter=f"eventName=={EVENT_ENTITY_SELECTED['id']}",
    )
    if not ignore_index:
        df_response = df_response.set_index([DIMENSION_ENTITY_NAME_TAB["alias"]])
    return df_response

def get_index_entity_selected_change(analytics_params, start_current, end_current, start_previous, end_previous):
    """
    Get a DataFrame with index tab selections from the Analytics API and a comparison for the prior month
    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param start_current: the start date for the current month in the format "YYYY-MM-DD"
    :param end_current: the end date for the current month
    :param start_previous: the start date for the previous month
    :param end_previous: the end date for the previous month
    :return: a DataFrame with the landing pages from the Analytics API. 
        By default, dimensions and metrics both form columns
        Columns are present for both metric values and metric changes from the prior period
        Dimensions: DIMENSION_ENTITY_NAME_TAB
        Metrics: METRIC_EVENT_COUNT, METRIC_TOTAL_USERS
    """
    return get_one_period_change_df(
        get_index_entity_selected_df,
        [METRIC_EVENT_COUNT, METRIC_TOTAL_USERS],
        analytics_params,
        start_current,
        end_current,
        start_previous,
        end_previous,
        sort_results=[METRIC_EVENT_COUNT, METRIC_TOTAL_USERS]
    )

def get_index_entity_table_sorted_df(analytics_params, ignore_index=True):
    """
    Get a DataFrame with index table sortings from the Analytics API.

    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param ignore_index: If true, the index will be an arbitrary range index. If false, the index will be the dimensions
    :return: a DataFrame with the landing pages from the Analytics API
        By default, dimension and metric aliases both form columns
        Dimensions: DIMENSION_ENTITY_NAME_TAB, DIMENSION_COLUMN_NAME, DIMENSION_SORT_DIRECTION
        Metrics: METRIC_EVENT_COUNT, METRIC_TOTAL_USERS
    """
    assert "dimension_filter" not in analytics_params
    df_response = get_data_df_from_fields(
        [METRIC_EVENT_COUNT, METRIC_TOTAL_USERS],
        [DIMENSION_ENTITY_NAME_TAB, DIMENSION_COLUMN_NAME, DIMENSION_SORT_DIRECTION],
        **analytics_params,
        dimension_filter=f"eventName=={EVENT_ENTITY_TABLE_SORTED['id']}",
    )
    if not ignore_index:
        df_response = df_response.set_index([DIMENSION_ENTITY_NAME_TAB["alias"], DIMENSION_COLUMN_NAME["alias"], DIMENSION_SORT_DIRECTION["alias"]])
    return df_response

def get_index_entity_table_sorted_change(analytics_params, start_current, end_current, start_previous, end_previous):
    """
    Get a DataFrame with index table sortings from the Analytics API and a comparison for the prior month

    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param start_current: the start date for the current month in the format "YYYY-MM-DD"
    :param end_current: the end date for the current month
    :param start_previous: the start date for the previous month
    :param end_previous: the end date for the previous month
    :return: a DataFrame with the landing pages from the Analytics API.
        By default, dimensions and metrics both form columns
        Columns are present for both metric values and metric changes from the prior period
        Dimensions: DIMENSION_ENTITY_NAME_TAB, DIMENSION_COLUMN_NAME, DIMENSION_SORT_DIRECTION
        Metrics: METRIC_EVENT_COUNT, METRIC_TOTAL_USERS
    """
    return get_one_period_change_df(
        get_index_entity_table_sorted_df,
        [METRIC_EVENT_COUNT, METRIC_TOTAL_USERS],
        analytics_params,
        start_current,
        end_current,
        start_previous,
        end_previous,
        sort_results=[METRIC_EVENT_COUNT, METRIC_TOTAL_USERS]
    )

def get_index_entity_table_paginated_df(analytics_params, ignore_index=True):
    """
    Get a DataFrame with index table paginations from the Analytics API.

    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param ignore_index: If true, the index will be an arbitrary range index. If false, the index will be the dimensions
    :return: a DataFrame with the landing pages from the Analytics API
        By default, dimension and metric aliases both form columns
        Dimensions: DIMENSION_ENTITY_NAME_TAB, DIMENSION_PAGINATION_DIRECTION
        Metrics: METRIC_EVENT_COUNT, METRIC_TOTAL_USERS
    """
    assert "dimension_filter" not in analytics_params
    df_response = get_data_df_from_fields(
        [METRIC_EVENT_COUNT, METRIC_TOTAL_USERS],
        [DIMENSION_ENTITY_NAME_TAB, DIMENSION_PAGINATION_DIRECTION],
        **analytics_params,
        dimension_filter=f"eventName=={EVENT_ENTITY_TABLE_PAGINATED['id']}",
    )
    if not ignore_index:
        df_response = df_response.set_index([DIMENSION_ENTITY_NAME_TAB["alias"], DIMENSION_PAGINATION_DIRECTION["alias"]])
    return df_response

def get_index_entity_table_paginated_change(analytics_params, start_current, end_current, start_previous, end_previous):
    """
    Get a DataFrame with index table paginations from the Analytics API and a comparison for the prior month

    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param start_current: the start date for the current month in the format "YYYY-MM-DD"
    :param end_current: the end date for the current month
    :param start_previous: the start date for the previous month
    :param end_previous: the end date for the previous month
    :return: a DataFrame with the landing pages from the Analytics API. 
        By default, dimensions and metrics both form columns
        Columns are present for both metric values and metric changes from the prior period
        Dimensions: DIMENSION_ENTITY_NAME_TAB, DIMENSION_PAGINATION_DIRECTION
        Metrics: METRIC_EVENT_COUNT, METRIC_TOTAL_USERS
    """
    return get_one_period_change_df(
        get_index_entity_table_paginated_df,
        [METRIC_EVENT_COUNT, METRIC_TOTAL_USERS],
        analytics_params,
        start_current,
        end_current,
        start_previous,
        end_previous,
        sort_results=[DIMENSION_ENTITY_NAME_TAB, DIMENSION_PAGINATION_DIRECTION],
        sort_ascending=True
    )

def get_index_filter_selected_df(analytics_params, ignore_index=True):
    """
    Get a DataFrame with index filter selections from the Analytics API.

    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param ignore_index: If true, the index will be an arbitrary range index. If false, the index will be the dimensions
    :return: a DataFrame with the landing pages from the Analytics API
        By default, dimension and metric aliases both form columns
        Dimensions: DIMENSION_ENTITY_NAME_TAB, DIMENSION_FILTER_NAME, DIMENSION_FILTER_VALUE
        Metrics: METRIC_EVENT_COUNT, METRIC_TOTAL_USERS
    """
    assert "dimension_filter" not in analytics_params
    df_response = get_data_df_from_fields(
        [METRIC_EVENT_COUNT, METRIC_TOTAL_USERS],
        [DIMENSION_FILTER_NAME, DIMENSION_FILTER_VALUE],
        **analytics_params,
        dimension_filter=f"eventName=={EVENT_FILTER_SELECTED['id']}",
    )
    if not ignore_index:
        df_response = df_response.set_index([DIMENSION_FILTER_NAME["alias"], DIMENSION_FILTER_VALUE["alias"]])
    return df_response

def get_index_filter_selected_change(analytics_params, start_current, end_current, start_previous, end_previous):
    """
    Get a DataFrame with index filter selections from the Analytics API and a comparison for the prior month

    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param start_current: the start date for the current month in the format "YYYY-MM-DD"
    :param end_current: the end date for the current month
    :param start_previous: the start date for the previous month
    :param end_previous: the end date for the previous month
    :return: a DataFrame with the landing pages from the Analytics API. 
        By default, dimensions and metrics both form columns
        Columns are present for both metric values and metric changes from the prior period
        Dimensions: DIMENSION_ENTITY_NAME_TAB, DIMENSION_FILTER_NAME, DIMENSION_FILTER_VALUE
        Metrics: METRIC_EVENT_COUNT, METRIC_TOTAL_USERS
    """
    return get_one_period_change_df(
        get_index_filter_selected_df,
        [METRIC_EVENT_COUNT, METRIC_TOTAL_USERS],
        analytics_params,
        start_current,
        end_current,
        start_previous,
        end_previous,
        sort_results=[METRIC_EVENT_COUNT, METRIC_TOTAL_USERS]
    )


def get_event_count_over_time_df(analytics_params, events, additional_data_path=None, additional_data_behavior=None):
    """
    Get a DataFrame with pageviews and total active users over time from the Analytics API.

    :param analytics_params: the parameters for the Analytics API, including service params, start dates, and end dates
    :param additional_data_path: the path to a JSON file with additional data to be added to the DataFrame, defaults to None
    :param additional_data_behavior: the behavior to use when adding the additional data, as an instance of ADDITIONAL_DATA_BEHAVIOR, defaults to None
    :return: a DataFrame with the pageviews and total active users over time from the Analytics API. 
        Columns are the dimension aliases, metrics (as ints), and change metrics (as floats)
        Dimensions: DIMENSION_YEAR_MONTH (as a datetime)
        Metrics: METRIC_ACTIVE_USERS, METRIC_PAGE_VIEWS
    """
    
    return get_change_over_time_df_multiple_events(
        METRIC_EVENT_COUNT,
        events,
        DIMENSION_YEAR_MONTH,
        additional_data_path=additional_data_path,
        additional_data_behavior=additional_data_behavior,
        **analytics_params
    )