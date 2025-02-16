from enum import Enum
import numpy as np
import pandas as pd
from .charts import get_data_df, get_df_over_time
from .fields import *
from urllib.parse import urlparse
import datetime as dt

def get_data_df_from_fields(metrics, dimensions, **other_params):
    """
    Get a df from the Analytics API with metrics and dimensions as specified in fields.py

    :param metrics: the metrics to get
    :param dimensions: the dimensions to get
    :param dimension_index: whether to use the dimensions as the index, defaults to False
    :param other_params: any other parameters to be passed to the get_data_df function, including service params
    :return: a DataFrame with the data from the Analytics API
    """
    df = get_data_df(
        [metric["id"] for metric in metrics],
        [dimension["id"] for dimension in dimensions],
        **other_params
    )
    return df.reset_index().rename(columns=get_rename_dict(dimensions+metrics)).copy()

def get_rename_dict(dimensions):
    """Get a dictionary to rename the columns of a DataFrame."""
    return dict(
        zip([dimension["id"] for dimension in dimensions], [dimension["alias"] for dimension in dimensions])
    )

def get_outbound_links_df(analytics_params, ignore_index=True):
    """
    Get a DF with outbound links from the Analytics API. Merges the builtin and custom events for outbound links.
    analytics_params cannot currently include a dimension_filter

    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :return: a DataFrame with the outbound links from the Analytics API
    """
    pd.set_option('future.no_silent_downcasting', True)
    assert "dimension_filter" not in analytics_params
    # Get the builtin "Click" event
    df_builtin_links = get_data_df_from_fields(
        [METRIC_EVENT_COUNT, METRIC_TOTAL_USERS],
        [DIMENSION_PAGE_PATH, DIMENSION_BUILTIN_URL, DIMENSION_EVENT_NAME],
        dimension_filter=f"eventName=={EVENT_BUILTIN_CLICK}",
        **analytics_params,
    ).groupby(
        [DIMENSION_PAGE_PATH["alias"], DIMENSION_BUILTIN_URL["alias"]]
    ).sum().reset_index()
    # Get the custom "outbound_link_click" event
    df_custom_links = get_data_df_from_fields(
        [METRIC_EVENT_COUNT, METRIC_TOTAL_USERS],
        [DIMENSION_EVENT_NAME, DIMENSION_CUSTOM_URL, DIMENSION_PAGE_PATH], 
        dimension_filter=f"eventName=={EVENT_CUSTOM_CLICK}",
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
    df_all_links = df_all_links.drop(
        columns=[DIMENSION_BUILTIN_URL["alias"], DIMENSION_CUSTOM_URL["alias"], "builtin", "is_fragment"]
    ).rename(
        columns={
            "complete_url": "Outbound Link",
            METRIC_EVENT_COUNT["alias"]: SYNTHETIC_METRIC_CLICKS["alias"],
            "hostname": "Hostname",
        } 
    )[[
        DIMENSION_PAGE_PATH["alias"],
        "Hostname",
        "Outbound Link",
        SYNTHETIC_METRIC_CLICKS["alias"],
        METRIC_TOTAL_USERS["alias"]
    ]].copy()

    if not ignore_index:
        return df_all_links.set_index(["Page Path", "Outbound Link", "Hostname"])
    else:
        return df_all_links.reset_index(drop=True)

def get_outbound_links_change(analytics_params, start_current, end_current, start_previous, end_previous):
    """
    Get a DF with outbound links from the Analytics API and a comparison for the prior month
    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param start_current: the start date for the current month in the format "YYYY-MM-DD"
    :param end_current: the end date for the current month
    :param start_previous: the start date for the previous month
    :param end_previous: the end date for the previous month
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
    Get a DF with page views from the Analytics API.

    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :return: a DataFrame with the page views from the Analytics API
    """
    assert "dimension_filter" not in analytics_params
    df_response = get_data_df_from_fields(
        [METRIC_EVENT_COUNT, METRIC_TOTAL_USERS, METRIC_PAGE_VIEWS],
        [DIMENSION_PAGE_PATH, DIMENSION_EVENT_NAME],
        **analytics_params,
        dimension_filter=f"eventName=={EVENT_PAGE_VIEW}",
    )[[DIMENSION_PAGE_PATH["alias"], METRIC_PAGE_VIEWS["alias"], METRIC_TOTAL_USERS["alias"]]].copy()
    if not ignore_index:
        df_response = df_response.set_index(DIMENSION_PAGE_PATH["alias"])
    return df_response

def get_page_views_change(analytics_params, start_current, end_current, start_previous, end_previous):
    """
    Get a DF with page views from the Analytics API and a comparison for the prior month
    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param start_current: the start date for the current month in the format "YYYY-MM-DD"
    :param end_current: the end date for the current month
    :param start_previous: the start date for the previous month
    :param end_previous: the end date for the previous month
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
    
def get_one_period_change_series(series_current, series_previous, start_current, end_current, start_previous, end_previous, combined_index = None):
    """
    Get the percent change between two serieses, accounting for different numbers of days in the month.
    :param series_current: the series representing the current month
    :param series_previous: the series representing the prior month
    :param start_current: the start date for the current month in the format "YYYY-MM-DD"
    :param end_current: the end date for the current month
    :param start_previous: the start date for the prior month
    :param end_previous: the end date for the prior month
    :return: a Series with the change between the two serieses
    """
    # Check that both serieses have the same index names
    assert series_current.index.names == series_previous.index.names
    # Reindex both serieses to have the same index
    combined_index = series_current.index.union(series_previous.index)
    current_length = float((dt.datetime.fromisoformat(end_current) - dt.datetime.fromisoformat(start_current)).days + 1)
    previous_length = float((dt.datetime.fromisoformat(end_previous) - dt.datetime.fromisoformat(start_previous)).days + 1)
    assert current_length != 0 and previous_length != 0
    series_current_reindexed = series_current.reindex(combined_index).fillna(0)
    # Adjust the values from the prior series to account for the different number of days in the month
    series_previous_reindexed = (series_previous.reindex(combined_index) * current_length / previous_length)
    change = ((series_current_reindexed / series_previous_reindexed) - 1).replace({np.inf: np.nan})
    return change

def get_string_or_alias(string_or_alias):
    """
    Get the string or alias of a metric or dimension.
    :param string_or_alias: the string or alias to get
    :return: the string or alias of the metric or dimension
    """
    if isinstance(string_or_alias, dict) and "alias" in string_or_alias:
        return string_or_alias["alias"]
    elif isinstance(string_or_alias, str):
        return string_or_alias
    else:
        raise ValueError("string_or_alias must be a string or a dictionary with an alias key")

def get_one_period_change_df(df_function, change_metrics, analytics_params, start_current, end_current, start_previous, end_previous, sort_results=None, dimension_index=False):
    """
    Get a DF with the change between two periods for the given metrics, renamed to match titles
    :param metrics: the objects representing metrics to be displayed
    :param metric_titles: the titles to be displayed for the metrics
    :param dimensions: the objects representing dimensions to be displayed
    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param start_current: the start date for the current month in the format "YYYY-MM-DD"
    :param end_current: the end date for the current month
    :param start_previous: the start date for the prior month
    :param end_previous: the end date for the prior month
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
            [metric["alias"] for metric in sort_results], ascending=False, kind="stable"
        )
    if dimension_index:
        return df_current_with_changes
    else:
        return df_current_with_changes.reset_index()
    
class ADDITIONAL_DATA_BEHAVIOR(Enum):
    ADD = "add"
    REPLACE = "replace"

def get_page_views_over_time_df(analytics_params, additional_data_path=None, additional_data_behavior=None):
    """
    Get a DataFrame with pageviews and total active users over time from the Analytics API.
    :param analytics_params: the parameters for the Analytics API, including service params, start dates, and end dates
    :param additional_data_path: the path to a JSON file with additional data to be added to the DataFrame, defaults to None
    :param additional_data_behavior: the behavior to use when adding the additional data, defaults to None
    """
    return get_change_over_time_df(
        [METRIC_ACTIVE_USERS, METRIC_PAGE_VIEWS],
        DIMENSION_YEAR_MONTH,
        additional_data_path=additional_data_path,
        additional_data_behavior=additional_data_behavior,
        **analytics_params
    )

def get_change_over_time_df(
    metrics, time_dimension, include_changes=True, additional_data_path=None, additional_data_behavior=None, strftime_format="%Y-%m", **other_params
):
    """
    Get a DataFrame with the change over time for the given metrics, renamed to match metric_titles
    :param metric_titles: the titles of the metrics to be displayed
    :param metrics: the metrics to be displayed
    :param time_title: the title to be displayed for the time dimension
    :param time_dimension: the time dimension to be displayed
    :param include_changes: whether to include the percent change columns, defaults to True
    :param change_title_suffix: the suffix to be added to the change columns, defaults to " Change"
    :param additional_data_path: the path to a JSON file with additional data to be added to the DataFrame, defaults to None
    :param additional_data_behavior: the behavior to use when adding the additional data, defaults to None
    :param strftime_format: the format to use for the time dimension, defaults to "%Y-%m". None means a datetime will be returned
    :param other_params: any other parameters to be passed to the get_df_over_time function, including service params
    """
    df_api = get_df_over_time(
		[metric["alias"] for metric in metrics],
        [metric["id"] for metric in metrics],
		time_dimension["id"],
		sort_results=[time_dimension["id"]],
		df_processor=(lambda df: df.set_index(df.index + "01").sort_index(ascending=False)),
		format_table=False,
		**other_params
	).rename({time_dimension["id"]: time_dimension["alias"]})
    
    df_combined = pd.DataFrame()

    if additional_data_path is not None:
        assert additional_data_behavior is not None
        df_saved = pd.read_json(additional_data_path)
        if additional_data_behavior == ADDITIONAL_DATA_BEHAVIOR.ADD:
            df_combined = df_api.add(df_saved.astype(int), fill_value=0)[::-1]
        elif additional_data_behavior == ADDITIONAL_DATA_BEHAVIOR.REPLACE:
            df_combined = pd.concat([df_saved, df_api], ignore_index=False)
            df_combined = df_combined.loc[~df_combined.index.duplicated(keep="first")].sort_index(ascending=False)
    else:
        df_combined = df_api

    if include_changes:
        df_combined[
            [metric["change_alias"] for metric in metrics]
        ] = df_combined[
            [metric["alias"] for metric in metrics]
        ].pct_change(periods=-1).replace({np.inf: np.nan})

    if strftime_format is not None:
        df_combined.index = pd.to_datetime(df_combined.index).strftime(strftime_format)

    return df_combined.reset_index(names=time_dimension["alias"])
    

def get_landing_page_df(analytics_params, ignore_index=True):
    """
    Get a DataFrame with landing pages from the Analytics API.

    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :return: a DataFrame with the landing pages from the Analytics API
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
    Get a DF with landing pages from the Analytics API and a comparison for the prior month
    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param start_current: the start date for the current month in the format "YYYY-MM-DD"
    :param end_current: the end date for the current month
    :param start_previous: the start date for the previous month
    :param end_previous: the end date for the previous month
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
    