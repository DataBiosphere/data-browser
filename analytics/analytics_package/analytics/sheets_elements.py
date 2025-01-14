import pandas as pd
from .charts import get_data_df
from .fields import *
from urllib.parse import urlparse

def get_flat_data_df(analytics_params, metrics, dimensions, remove_matches=None):
    """
    Get a df from the Analytics API with a flat structure (no multiindex).

    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :param metrics: the metrics to get
    :param dimensions: the dimensions to get
    :param remove_matches: a list of regex patterns or None elements to remove from each dimension. 
        Each regex or None element should correspond with an element of dimensions and remove_matches must be the same length as dimensions. 
        If the value is None, no patterns are removed, defaults to None.

    :return: a DataFrame with the data from the Analytics API
    """
    if remove_matches is not None:
        assert len(remove_matches) == len(dimensions)

    df = get_data_df(
        metrics,
        [dimension["id"] for dimension in dimensions],
        **analytics_params,
    )
    if remove_matches is not None:
        for i, match in enumerate([dimension["remove_matches"] for dimension in dimensions]):
            if match is not None:
                df = df.loc[~df.index.get_level_values(i).str.fullmatch(match)]
    return df.reset_index().rename(columns=get_rename_dict(dimensions)).copy()

def get_rename_dict(dimensions):
    """Get a dictionary to rename the columns of a DataFrame."""
    return dict(
        zip([dimension["id"] for dimension in dimensions], [dimension["alias"] for dimension in dimensions])
    )

def get_outbound_sheets_df(analytics_params):
    """
    Get a DF with outbound links from the Analytics API. Merges the builtin and custom events for outbound links.

    :param analytics_params: the parameters for the Analytics API, including authentication and property ids
    :return: a DataFrame with the outbound links from the Analytics API
    """
    pd.set_option('future.no_silent_downcasting', True)
    # Get the builtin "Click" event
    df_builtin_links = get_flat_data_df(
        analytics_params,
        [METRIC_EVENT_COUNT, METRIC_TOTAL_USERS],
        [DIMENSION_PAGE_PATH, DIMENSION_BUILTIN_URL, DIMENSION_EVENT_NAME],
        remove_matches=[None, r"\s*", None]
    ).groupby(
        [DIMENSION_PAGE_PATH["alias"], DIMENSION_BUILTIN_URL["alias"]]
    ).sum().reset_index()

    # Get the custom "outbound_link_click" event
    df_custom_links = get_flat_data_df(
        analytics_params, 
        [METRIC_EVENT_COUNT, METRIC_TOTAL_USERS],
        [DIMENSION_EVENT_NAME, DIMENSION_CUSTOM_URL, DIMENSION_PAGE_PATH], 
        remove_matches=[DIMENSION_EVENT_NAME["remove_matches"], r"\(not set\)", None],
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