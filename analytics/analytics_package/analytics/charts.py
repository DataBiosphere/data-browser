from . import api as ga
import pandas as pd

"""

Functions related to tables and data frames will pass any extra parameters they recieve down to any such functions that they call
These parameters include the ones used by get_metrics_by_dimensions in the api module

Table formatting/construction parameters:
df_processor
num_keep_dimensions

"""

def get_data_df(metrics, dimensions, percentage_metrics=None, percentage_suffix="_percentage", num_keep_dimensions=None, df_processor=None, **other_params):
	if metrics is None:
		df = pd.DataFrame()
	else:
		df = ga.get_metrics_by_dimensions(metrics, dimensions, **other_params)
		
		if dimensions:
			if len(dimensions) > 1 and not num_keep_dimensions is None:
				df.drop(columns=dimensions[num_keep_dimensions:], inplace=True)
			df.set_index(dimensions[:num_keep_dimensions], inplace=True)
		for metric in metrics:
			str_column = df[metric].astype(str)
			try:
				num_column = str_column.astype(int)
			except ValueError:
				num_column = str_column.astype(float)
			df[metric] = num_column
		
		if percentage_metrics:
			for metric in percentage_metrics:
				df.insert(list(df.columns).index(metric) + 1, metric + percentage_suffix, df[metric] / df[metric].sum() * 100)
	
	if df_processor:
		df = df_processor(df)
	
	return df

def strings_to_lists(*vals):
	return [[v] if isinstance(v, str) else v for v in vals]

def get_df_over_time(xlabels, metrics, dimensions, df_filter=None, **other_params):
	xlabels, metrics = strings_to_lists(xlabels, metrics)
	
	df = get_data_df(metrics, dimensions, **other_params)
	
	# Convert date to datetime object
	df.index = pd.to_datetime(df.index)

	if (not df_filter is None):
		df = df_filter(df)

	# Rename for display
	df.rename(columns={name: xlabels[i] for i, name in enumerate(df.columns)}, inplace=True)

	return df
