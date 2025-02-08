from enum import Enum
import numpy as np
import pandas as pd
from .charts import get_data_df, get_df_over_time
from .fields import *
from urllib.parse import urlparse
import datetime as dt

def get_flat_data_df(metrics, dimensions, **other_params):
    """
    Get a df from the Analytics API with a flat structure (no multiindex).

    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param metrics: the metrics to get
    :param dimensions: the dimensions to get
    :return: a DataFrame with the data from the Analytics API
    """
    df = get_data_df(
        metrics,
        [dimension["id"] for dimension in dimensions],
        **other_params,
    )
    return df.reset_index().rename(columns=get_rename_dict(dimensions)).copy()

def get_rename_dict(dimensions):
    """Get a dictionary to rename the columns of a DataFrame."""
    return dict(
        zip([dimension["id"] for dimension in dimensions], [dimension["alias"] for dimension in dimensions])
    )

def get_outbound_links_df(analytics_params):
    """
    Get a DF with outbound links from the Analytics API. Merges the builtin and custom events for outbound links.
    analytics_params cannot currently include a dimension_filter

    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :return: a DataFrame with the outbound links from the Analytics API
    """
    pd.set_option('future.no_silent_downcasting', True)
    assert "dimension_filter" not in analytics_params
    # Get the builtin "Click" event
    df_builtin_links = get_flat_data_df(
        [METRIC_EVENT_COUNT, METRIC_TOTAL_USERS],
        [DIMENSION_PAGE_PATH, DIMENSION_BUILTIN_URL, DIMENSION_EVENT_NAME],
        dimension_filter=f"eventName=={EVENT_BUILTIN_CLICK}",
        **analytics_params,
    ).groupby(
        [DIMENSION_PAGE_PATH["alias"], DIMENSION_BUILTIN_URL["alias"]]
    ).sum().reset_index()
    # Get the custom "outbound_link_click" event
    df_custom_links = get_flat_data_df(
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
    ].sort_values(METRIC_EVENT_COUNT, ascending=False)
    df_all_links["is_fragment"] = df_all_links["is_fragment"].fillna(False).astype(bool)
    # Use the builtin link, unless the link is a fragment, in which case use the custom link
    df_all_links["complete_url"]  = df_all_links["builtin_url"].where(
        ~df_all_links["is_fragment"],
        df_all_links["outbound_url"]
    )
    df_all_links["hostname"] = df_all_links["complete_url"].map(lambda x: urlparse(x).hostname)
    df_all_links = df_all_links.drop(
        columns=["builtin_url", "outbound_url", "builtin", "is_fragment"]
    ).rename(
        columns={
            DIMENSION_PAGE_PATH["alias"]: "Page Path",
            "complete_url": "Outbound Link",
            METRIC_EVENT_COUNT: "Total Clicks",
            METRIC_TOTAL_USERS: "Total Users",
            "hostname": "Hostname",
        } 
    )[["Page Path", "Hostname", "Outbound Link", "Total Clicks", "Total Users"]]

    return df_all_links.copy().reset_index(drop=True)

def get_outbound_links_change(analytics_params, start_current, end_current, start_previous, end_previous):
    """
    Get a DF with outbound links from the Analytics API and a comparison for the prior month
    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param start_current: the start date for the current month in the format "YYYY-MM-DD"
    :param end_current: the end date for the current month
    :param start_previous: the start date for the previous month
    :param end_previous: the end date for the previous month
    """
    analytics_params_month_1 = {
        **analytics_params,
        "start_date": start_current,
        "end_date": end_current,
    }
    analytics_params_month_2 = {
        **analytics_params,
        "start_date": start_previous,
        "end_date": end_previous,
    }
    df_current = get_outbound_links_df(analytics_params_month_1).set_index(
        ["Page Path", "Outbound Link", "Hostname"]
    )
    df_previous = get_outbound_links_df(analytics_params_month_2).set_index(
        ["Page Path", "Outbound Link", "Hostname"]
    )
    total_clicks_percent_change = get_change(
        df_current["Total Clicks"],
        df_previous["Total Clicks"],
        start_current,
        end_current,
        start_previous,
        end_previous
    )
    total_users_percent_change = get_change(
        df_current["Total Users"],
        df_previous["Total Users"],
        start_current,
        end_current,
        start_previous,
        end_previous
    )
    df_reindexed = df_current.reindex(total_clicks_percent_change.index).fillna(0)
    df_reindexed["Total Clicks Percent Change"] = total_clicks_percent_change
    df_reindexed["Total Users Percent Change"] = total_users_percent_change
    return df_reindexed.sort_values(["Total Clicks", "Total Users"], ascending=False, kind="stable").reset_index()

def get_page_views_df(analytics_params):
    """
    Get a DF with page views from the Analytics API.

    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :return: a DataFrame with the page views from the Analytics API
    """
    assert "dimension_filter" not in analytics_params
    df_response = get_flat_data_df(
        [METRIC_EVENT_COUNT, METRIC_TOTAL_USERS, METRIC_PAGE_VIEW],
        [DIMENSION_PAGE_PATH, DIMENSION_EVENT_NAME],
        **analytics_params,
        dimension_filter=f"eventName=={EVENT_PAGE_VIEW}",
    ).rename(
        columns={
            DIMENSION_PAGE_PATH["alias"]: "Page Path",
            METRIC_PAGE_VIEW: "Total Views",
            METRIC_TOTAL_USERS: "Total Users",
        }
    )[["Page Path", "Total Views", "Total Users"]].copy()
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
    df_current = get_page_views_df(analytics_params_current).set_index("Page Path")
    df_previous = get_page_views_df(analytics_params_previous).set_index("Page Path")
    combined_index = df_current.index.union(df_previous.index)
    df_current_reindexed = df_current.reindex(combined_index).fillna(0)
    df_previous_reindexed = df_previous.reindex(combined_index)
    views_percent_change = get_change(
        df_current_reindexed["Total Views"],
        df_previous_reindexed["Total Views"],
        start_current,
        end_current,
        start_previous,
        end_previous,
    )
    users_percent_change = get_change(
        df_current_reindexed["Total Users"],
        df_previous_reindexed["Total Users"],
        start_current,
        end_current,
        start_previous,
        end_previous,
    )
    df_reindexed = df_current.reindex(views_percent_change.index).fillna(0)
    df_reindexed["Total Views Percent Change"] = views_percent_change
    df_reindexed["Total Users Percent Change"] = users_percent_change
    return df_reindexed.sort_values(["Total Views", "Total Users"], ascending=False, kind="stable").reset_index()
    
def get_change(series_current, series_previous, start_current, end_current, start_previous, end_previous, combined_index = None):
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
        ["Users", "Total Pageviews"],
        ["activeUsers", "screenPageViews"],
        ["Month"],
        "yearMonth",
        additional_data_path=additional_data_path,
        additional_data_behavior=additional_data_behavior,
        **analytics_params
    )

def get_change_over_time_df(
    metric_titles, metrics, time_title, time_dimension, include_changes=True, change_title_suffix = " Change", additional_data_path=None, additional_data_behavior=None, strftime_format="%Y-%m", **other_params
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
		metric_titles,
        metrics,
		time_dimension,
		sort_results=[time_dimension],
		df_processor=(lambda df: df.set_index(df.index + "01").sort_index(ascending=False)),
		format_table=False,
		**other_params
	)
    
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
        assert change_title_suffix is not None
        df_combined[
            [f"{title}{change_title_suffix}" for title in metric_titles]
        ] = df_combined[metric_titles].pct_change(periods=-1).replace({np.inf: np.nan})

    if strftime_format is not None:
        df_combined.index = pd.to_datetime(df_combined.index).strftime(strftime_format)

    return df_combined.reset_index(names=time_title)
    