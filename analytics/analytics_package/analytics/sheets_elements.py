import pandas as pd
from .charts import get_data_df
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
        dimensions,
        **analytics_params,
    )
    if remove_matches is not None:
        for i, match in enumerate(remove_matches):
            if match is not None:
                df = df.loc[~df.index.get_level_values(i).str.fullmatch(match)]
    return df.reset_index().copy()


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
        ["eventCount", "totalUsers"],
        ["pagePath", "linkUrl", "eventName"],
        remove_matches=[None, r"\s*", None]
    ).groupby(
        ["pagePath", "linkUrl"]
    ).sum().reset_index().rename(
        columns={"linkUrl": "builtin_url"}
    )

    # Get the custom "outbound_link_click" event
    df_custom_links = get_flat_data_df(
        analytics_params, 
        ["eventCount", "totalUsers"],
        ["pagePath", "customEvent:click_url", "eventName"], 
        remove_matches=[None, r"\(not set\)", None],
    ).groupby(
        ["pagePath", "customEvent:click_url"]
    ).sum().reset_index().rename(
        columns={"customEvent:click_url": "outbound_url"}
    )
    # Concatenate the two dataframes, avoiding duplicates
    # Keep the link from the builtin event, unless the link contains a #fragment, in which case keep the link from the custom event
    df_builtin_links["builtin"] = True
    df_builtin_links["truncated_url"] = df_builtin_links["builtin_url"]
    df_custom_links["truncated_url"] = df_custom_links["outbound_url"].str.replace(r"#.*", "", regex=True)
    df_outbound_links_fragments = df_custom_links.loc[df_custom_links["outbound_url"].str.contains("#")]
    df_outbound_links_fragments["is_fragment"] = True
    df_all_links = pd.concat(
        [df_builtin_links, df_outbound_links_fragments], ignore_index=True
    )
    df_all_links = df_all_links.loc[
        ~(df_all_links["truncated_url"].isin(df_outbound_links_fragments["truncated_url"]) & df_all_links["builtin"])
    ].sort_values("eventCount", ascending=False)
    # Determine whther a link is a fragment or an outbound link
    df_all_links["outbound"] = df_all_links["truncated_url"].isin(df_custom_links["truncated_url"])
    df_all_links["is_fragment"] = df_all_links["is_fragment"].fillna(False).astype(bool)
    df_all_links["complete_url"]  = df_all_links["builtin_url"].where(
        ~df_all_links["is_fragment"],
        df_all_links["outbound_url"]
    )
    df_all_links["hostname"] = df_all_links["complete_url"].map(lambda x: urlparse(x).hostname)
    df_all_links = df_all_links.drop(
        columns=["builtin_url", "outbound_url", "builtin", "is_fragment"]
    ).rename(
        columns={
            "pagePath": "Page Path",
            "complete_url": "Outbound Link",
            "eventCount": "Total Clicks",
            "totalUsers": "Total Users",
            "outbound": "Is Outbound",
            "hostname": "Hostname",
        } 
    )[["Page Path", "Hostname", "Outbound Link", "Total Clicks", "Total Users", "Is Outbound"]]
    return df_all_links.copy().reset_index(drop=True)