import datetime as dt
from .charts import get_data_df, get_df_over_time
from .entities import ADDITIONAL_DATA_BEHAVIOR
import numpy as np
import pandas as pd

def get_data_df_from_fields(metrics, dimensions, **other_params):
    """
    Get a df from the Analytics API with metrics and dimensions as specified in fields.py

    :param metrics: the metrics to get
    :param dimensions: the dimensions to get
    :param other_params: any other parameters to be passed to the get_data_df function, including service params
    :return: a DataFrame with the data from the Analytics API. 
        The DF has an arbitrary RangeIndex, 
        string columns containing dimensions with names equal to the dimension alias value, 
        and int columns containing metrics with names equal to the metric alias value.
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


def get_one_period_change_series(series_current, series_previous, start_current, end_current, start_previous, end_previous):
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


def get_change_over_time_df(
    metrics, time_dimension, include_changes=True, additional_data_path=None, additional_data_behavior=None, strftime_format="%Y-%m", **other_params
):
    """
    Get a DataFrame with the change over time for the given metrics, renamed to match metric_titles
    :param metrics: the metrics to be displayed
    :param time_dimension: the time dimension to be used
    :param include_changes: whether to include the percent change columns, defaults to True
    :param additional_data_path: the path to a JSON file with additional data to be added to the DataFrame, defaults to None
    :param additional_data_behavior: the behavior to use when adding the additional data, defaults to None
    :param strftime_format: the format to use for the time dimension, defaults to "%Y-%m". None means a datetime will be returned
    :param other_params: any other parameters to be passed to the get_df_over_time function, including service params
    :returns: a datetime with the values of the metrics for each time dimension.
        Columns are the time dimension alias (as a datetime), metric aliases (as ints), and change metric aliases (as floats)
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