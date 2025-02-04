from . import api as ga
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from IPython.core.display import HTML
from html import escape as escape_html


"""

init_tables must be called in the notebook to insert a required stylesheet


Functions related to tables and data frames will pass any extra parameters they recieve down to any such functions that they call
These parameters include the ones used by get_metrics_by_dimensions in the api module, as well as the table formatting parameters outlined below, and the the `fontsize` parameter for plotting functions


Table formatting/construction parameters, by table types
These parameters can be used with functions producing tables of the given type
Exceptions to this rule are given in parentheses

All tables:
rows_limit
df_processor
num_keep_dimensions (determined automatically based on ylabels if omitted for show_difference_table)
index_key_formatter
collapse_index (supplanted in format_change_over_time_table, show_plot_over_time - always True)
hide_index (supplanted in show_difference_table - determined by data shape)
hide_columns (supplanted in show_difference_table - determined by data shape)
split_vertical
pre_render_processor

Percent change tables:
include_plus
row_symbols (supplanted in format_table_with_change, show_difference_table - automatically inserted if show_symbols is True)

Change over time tables:
table_subindex
pre_plot_df_processor

Change between frames tables:
show_symbols (supplanted in show_difference_table - determined based on rows_type)

Change between periods tables:
rows_type

"""


authenticate_api = ga.authenticate

authenticate_ga = ga.authenticate

authenticate_ga4 = lambda secret_name: ga.authenticate(secret_name, ga.ga4_service_params)

authenticate_yt = lambda secret_name: ga.authenticate(secret_name, ga.yt_service_params)

def init_tables():
	display(HTML("""
		<style>
			
			.analyticsTable {
				display: grid;
				--symbol-width: 1.5em;
				--value-width: 2.9em;
				--percentage-width: 6.8em;
			}
			
			/*
			.anaEven {
				background: #f5f5f5;
			}
			*/
			
			.anaIndex:not(.anaColName) {
				white-space: pre-wrap;
				line-break: anywhere;
				word-break: break-all;
			}
			
			.anaColName {
				font-weight: bold;
				border-bottom: 1px solid black;
			}
			
			.anaIndex, .anaColName, .anaCell {
				padding: 0.3em;
			}
			
			.anaSubcolLeft, .anaIndex {
				padding-left: 1em;
			}
			
			.anaSubcolRight {
				padding-right: 1em;
			}
			
			.anaColName:not(.anaIndex) {
				text-align: right;
			}

			.anaColName.anaMultiCol {
				text-align: center;
			}
			
			.anaCell:not(.anaIndex) {
				text-align: right;
			}
			
			.analyticsTable .up::before {
				content: "↑";
				color: gray;
			}
			
			.analyticsTable .down::before {
				content: "↓";
				color: gray;
			}
			
			.analyticsTable .new::before {
				content: "+";
				color: gray;
			}
			
			.anaPositive {
				color: green;
			}
			
			.anaNegative {
				color: red;
			}
			
		</style>
	"""))

def percent_change(valfrom, valto):
	return (valto - valfrom)/valfrom * 100

def format_table(df, column_defs=["1fr"], index_key_formatter=None, collapse_index=False, hide_index=False, hide_columns=False, split_vertical=None, pre_render_processor=None, **other_params):
	if not isinstance(column_defs, dict):
		column_defs = {None: column_defs}
	
	if not pre_render_processor is None:
		df, column_defs = pre_render_processor(df, column_defs)
	

	def make_item_col_header_code(name):
		num_subcols = len(column_defs[name if name in column_defs else None])
		return '<div class="anaColName' + ("" if num_subcols == 1 else " anaMultiCol") + '" style="grid-column: span ' + str(num_subcols) + '">' + escape_html(str(name)) + '</div>'


	header_text = 'grid-template-columns: '
	
	if not hide_index:
		if isinstance(df.index, pd.MultiIndex):
			header_text += 'repeat(' + str(df.index.nlevels - 1) + ', auto) '
		header_text += '1fr '
	
	header_text += " ".join([cdef[0] if isinstance(cdef, tuple) else cdef for name in df.columns for cdef in column_defs[name if name in column_defs else None]]) + '">'
	
	if not hide_columns:
		if not hide_index:
			if isinstance(df.index, pd.MultiIndex):
				header_text += "".join(['<div class="anaIndex anaColName">' + escape_html(name) + '</div>' for name in df.index.names])
			else:
				header_text += '<div class="anaIndex anaColName">' + escape_html(df.index.name) + '</div>'
		header_text += "".join([make_item_col_header_code(name) for name in df.columns])
	
	
	def apply_formatter(formatter, val, *rest):
		if formatter:
			result = formatter(val, *rest)
			return (str(result[0]) if result[1] else escape_html(str(result[0]))) if isinstance(result, tuple) else escape_html(str(result))
		else:
			return escape_html(str(val))
	
	def make_index_col_code(index_runs, v, classes, row_n, icol_n):
		if index_runs and index_runs[icol_n][row_n] == 0:
			return ""
		result = '<div class="anaIndex ' + classes + '"'
		if index_runs:
			result += ' style="grid-row: span ' + str(index_runs[icol_n][row_n]) + '"'
		result += '>' + apply_formatter(index_key_formatter, v) + '</div>'
		return result
	
	def make_index_code(index_runs, val, classes, row_n):
		if hide_index:
			return ""
		if not isinstance(val, tuple):
			val = (val,)
		return "".join([make_index_col_code(index_runs, v, classes, row_n, icol_n) for icol_n, v in enumerate(val)])
	
	def make_item_col_code(val, classes, i, c, cdef):
		return '<div class="anaCell ' + classes + '">' + (apply_formatter(cdef[1], val, i, c) if isinstance(cdef, tuple) else escape_html(str(val))) + '</div>'
	
	def make_item_code(val, classes, i, c):
		this_column_defs = column_defs[c if c in column_defs else None]
		return "".join([make_item_col_code(val, classes + (" anaSubcolLeft" if subcol_n == 0 else " anaSubcolRight" if subcol_n == len(this_column_defs) - 1 else ""), i, c, cdef) for subcol_n, cdef in enumerate(this_column_defs)])
	
	def make_row_code(index_runs, row, n, i):
		row_class = "anaOdd" if n%2 else "anaEven"
		return make_index_code(index_runs, i, row_class, n) + "".join([make_item_code(item, row_class, i, c) for c, item in row.items()])
	
	def format_table_split(df, final):
		index_runs = None
		
		if collapse_index:
			index_df = df.index.to_frame(index=False)
			index_runs = [index_df[name].groupby((index_df[name] != index_df[name].shift()).cumsum()).transform(lambda g: [g.shape[0]] + [0] * (g.shape[0] - 1)) for name in index_df.columns]
		
		result_text = '<div class="analyticsTable" style="'
		if not final:
			result_text += 'page-break-after: always; '
		result_text += header_text
		result_text += "".join([make_row_code(index_runs, df.loc[[i]].astype("O").loc[i], n, i) for n, i in enumerate(df.index)])
		result_text += '</div>'
		
		return result_text
	
	
	result_text = None
	
	if split_vertical:
		if not isinstance(split_vertical, list):
			split_vertical = [split_vertical]
		split_indices = np.cumsum(split_vertical)
		result_text = "".join([format_table_split(df.iloc[(0 if j == 0 else split_indices[j - 1]):index], j == len(split_indices - 1) and index == df.shape[0]) for j, index in enumerate(split_indices)])
		if split_indices[-1] < df.shape[0]:
			result_text += format_table_split(df.iloc[split_indices[-1]:], True)
	else:
		result_text = format_table_split(df, True)
	
	
	return HTML(result_text)

def format_pc_change_table(df, include_plus=True, row_symbols=None, **other_params):
	# Expects pairs of columns in a 2D multi-index where the columns are name "Value" and "% Change"
	
	df_values = pd.concat([df[name].rename(name[0]) for name in df.columns if name[1] == "Value"], axis="columns")
	df_changes = pd.concat([df[name].rename(name[0]) for name in df.columns if name[1] == "% Change"], axis="columns")
	
	change_format = '({:+.2f}%)' if include_plus else '({:.2f}%)'
	
	def format_change_value(val):
		return "" if pd.isna(val) or val == np.inf else ('<div class="' + ("anaNegative" if val < 0 else "anaPositive" if val > 0 else "anaZero") + '">' + change_format.format(val) + '</div>', True)
	
	def format_row_symbol(name):
		return ('<div class="' + name + '"></div>', True) if name else ""
	
	column_defs = [
		("minmax(var(--value-width), min-content)", lambda v, i, c: str(v) if isinstance(v, int) else "{:.2f}".format(v)),
		("minmax(var(--percentage-width), min-content)", lambda v, i, c: format_change_value(df_changes.loc[i, c]))
	]
	
	if not row_symbols is None:
		column_defs = {None: column_defs, df_values.columns[0]: [("var(--symbol-width)", lambda v, i, c: format_row_symbol(row_symbols.loc[i, (c, "Value")]))] + column_defs}
	
	return format_table(df_values, column_defs, **other_params)

def format_change_over_time_table(df, table_subindex="Month", change_dir=1, **other_params):
	df2 = df.copy(deep=True)
	
	data_cols = [c for c in df2.columns]
	
	df2[table_subindex] = df2.index.quarter if table_subindex == "Quarter" else df2.index.month_name()
		
	df2['Year'] = df2.index.year

	df2 = df2.groupby(['Year', table_subindex], sort=False).sum()
	
	df2.columns = pd.MultiIndex.from_tuples([(name, 'Value') for name in data_cols])
	
	for name in data_cols:
		df2[(name, '% Change')] = df2[name][::change_dir].pct_change()[::change_dir].mul(100)
	
	df2 = df2[[(a, b) for a in data_cols for b in ['Value', '% Change']]]
	
	return format_pc_change_table(df2, collapse_index=True, **other_params)

def format_table_with_change(df, df_prev, show_symbols=True, **other_params):
	# The data frames must have the same column names but may have some different rows
	
	df_joined = df.join(df_prev, rsuffix="_prev")
	df_change = pd.concat([v for name in df.columns for v in (df_joined[name], percent_change(df_joined[name + "_prev"], df_joined[name]))], axis=1)
	df_change.columns = pd.MultiIndex.from_tuples([(df_change.columns[i - i%2], "Value" if i%2 == 0 else "% Change") for (i, name) in enumerate(df_change.columns)])
	
	indices = pd.DataFrame(index=df.index)
	indices["index"] = range(indices.shape[0])
	indices_prev = pd.DataFrame(index=df_prev.index)
	indices_prev["index"] = range(indices_prev.shape[0])
	indices_combined = indices.join(indices_prev, rsuffix="_prev")
	
	indices_diff = indices_combined["index"] - indices_combined["index_prev"]
	
	classes = None
	
	if show_symbols:
		classes_series = indices_diff.map(lambda v: "new" if pd.isna(v) else None if v == 0 else "up" if v < 0 else "down") # lower index = higher in chart
		classes = pd.DataFrame(index=df_change.index, columns=df_change.columns)
		classes[:] = None
		classes.iloc[:, [0]] = classes_series
	
	return format_pc_change_table(df_change, row_symbols=classes, **other_params)

def get_top_ga_df(metrics, dimensions, ascending=True, rows_limit=30, **other_params):
	df = get_data_df(metrics, dimensions, **other_params)
	
	if ascending != None:
		df = df.sort_values(by=metrics, ascending=ascending)
	
	if not rows_limit is None:
		df = df.tail(rows_limit) if ascending else df.head(rows_limit)
	
	return df

def get_data_df(metrics, dimensions, percentage_metrics=None, percentage_suffix="_percentage", num_keep_dimensions=None, df_processor=None, **other_params):
	if metrics is None:
		df = pd.DataFrame()
	else:
		df = ga.get_metrics_by_dimensions(metrics, dimensions, **other_params)
		
		if dimensions:
			if len(dimensions) > 1 and not num_keep_dimensions is None:
				df.drop(columns=dimensions[num_keep_dimensions:], inplace=True);
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

def show_difference_table(xlabels, ylabels, metrics, dimensions, period, prev_period, rows_type="ordered", prev_period_params={}, num_keep_dimensions=None, **other_params):
	xlabels, ylabels, metrics, dimensions = strings_to_lists(xlabels, ylabels, metrics, dimensions)
	
	period = pd.Period(period)
	prev_period = prev_period and pd.Period(prev_period)
	
	shared_params = {
		"metrics": metrics,
		"dimensions": dimensions,
		"ascending": False if rows_type == "ordered" else None,
		"num_keep_dimensions": (len(ylabels) if ylabels else 1) if num_keep_dimensions is None else num_keep_dimensions
	}
	df = get_top_ga_df(**shared_params, start_date=period.start_time.isoformat()[:10], end_date=period.end_time.isoformat()[:10], **other_params)
	if prev_period is None:
		all_frames = (df,)
	else:
		all_frames = (df, get_top_ga_df(**shared_params, start_date=prev_period.start_time.isoformat()[:10], end_date=prev_period.end_time.isoformat()[:10], **{**other_params, **prev_period_params}))
	
	is_single_cell = all([f.shape[0] == 1 and f.shape[1] == 1 for f in all_frames])
	
	if is_single_cell and not ylabels:
		for f in all_frames:
			f.index = pd.Index(xlabels)
	else:
		xlabels_dict = {col: xlabel for col, xlabel in zip(df.columns, xlabels)}
		for f in all_frames:
			f.rename(columns=xlabels_dict, inplace=True)
			if ylabels:
				f.index.rename(ylabels if len(ylabels) > 1 else ylabels[0], inplace=True)
	
	formatting_params = {
		"hide_index": not ylabels and not is_single_cell,
		"hide_columns": is_single_cell
	}

	if len(all_frames) == 2:
		formatted = format_table_with_change(*all_frames, show_symbols=(rows_type == "ordered" or rows_type == "unordered"), **formatting_params, **other_params)
	else:
		formatted = format_table(
			df,
			column_defs=[("minmax(calc(var(--value-width) + var(--percentage-width)), min-content)", lambda v, i, c: str(v) if isinstance(v, int) else "{:.2f}".format(v))],
			**formatting_params,
			**other_params
		)

	display(formatted)

def make_month_filter(filter_cols):
	def filter(df):
		non_filter_cols = [name for name in df.columns if not name in filter_cols]
		filtered = df[df.index.month != (df.index + pd.Timedelta(days=1)).month]
		filtered = filtered.set_axis(filtered.index.to_period("M").to_timestamp(), axis="index")
		agg = df[non_filter_cols].groupby(df.index.to_period("M")).sum()
		agg = agg.set_axis(agg.index.to_timestamp(), axis="index")
		return pd.concat([filtered[name] if name in filter_cols else agg[name] for name in df.columns], axis="columns", join="inner")
	
	return filter

def show_plot(df, title, fontsize=16, **other_params):
	# Notes: Linking Pandas and Matplotlib
	# https://stackoverflow.com/questions/29568110/how-to-use-ax-with-pandas-and-matplotlib

	fig, ax = plt.subplots(figsize=(16, 9))
	df.plot(ax=ax, fontsize=fontsize) #Link the df with the axis
	
	ax.set_xlabel('Time', fontsize=fontsize)
	ax.set_ylabel('Count', fontsize=fontsize)
	
	ax.legend(fontsize=fontsize)
	
	fig.suptitle(title, fontsize=fontsize)
	plt.show()

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

def show_plot_over_time(titles, xlabels, metrics, dimensions="ga:date", format_table=True, df_filter=None, pre_plot_df_processor=None, **other_params):
	df = get_df_over_time(xlabels, metrics, dimensions, df_filter=df_filter, **other_params)

	if (not pre_plot_df_processor is None):
		df = pre_plot_df_processor(df)

	if isinstance(titles[0], str):
		show_plot(df, titles[0], **other_params)

	if len(titles) > 1 and isinstance(titles[1], str):
		# Average per qurter
		dfmean = df.rolling(window=30).mean()
		show_plot(dfmean, titles[1], **other_params)

	
	if format_table:
		return format_change_over_time_table(df, **other_params)
	else:
		return df

