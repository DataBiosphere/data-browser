import analytics.charts as ac
import pandas as pd
import json
import re
from html import escape as escape_html
from datetime import date

users_over_time_file_name = "users_over_time_history.json"

def format_export_url_info(type, secondary_type, filter):
	result = escape_html(type.replace("-", " "))
	if secondary_type:
		result += escape_html(", " + secondary_type.replace("-", " "))
	for facet in json.loads(filter):
		if facet["facetName"] == "projectId":
			result += "\nProject: " + ", ".join(['<a href="https://data-browser.lungmap.net/explore/projects/' + id + '">' + id + '</a>' for id in facet["terms"]])
		else:
			result += escape_html("\n" + facet["facetName"] + ": " + ", ".join([term if isinstance(term, str) else json.dumps(term) for term in facet["terms"]]))
	return (result, True)

def adjust_table_index_key(val):
	if isinstance(val, str):
		match = re.search("^\\/explore\\/(?:projects\\/([^\\/#?]+)|export\\/(export-to-terra|get-curl-command|download-manifest)(?:\\/(select-species))?\\?filter=(.+))", val)
		if match:
			if not match.group(1):
				return format_export_url_info(match.group(2), match.group(3), match.group(4))
		if val[0] == "/":
			return ('<a href="' + escape_html("https://data-browser.lungmap.net" + val) + '">' + escape_html(val) + '</a>', True)
	return val

def save_ga3_users_over_time_data(users_params, views_params, **other_params):
	users_df = ac.get_data_df(["ga:30dayUsers"], ["ga:date"], df_processor=lambda df: df[::-1], **users_params, **other_params)
	users_df.index = pd.to_datetime(users_df.index)
	views_df = ac.get_data_df(["ga:pageviews"], ["ga:date"], df_processor=lambda df: df[::-1], **views_params, **other_params)
	views_df.index = pd.to_datetime(views_df.index)

	df = ac.make_month_filter(["ga:30dayUsers"])(users_df.join(views_df)).rename(columns={"ga:30dayUsers": "Users", "ga:pageviews": "Total Pageviews"})
	df.to_json(users_over_time_file_name)

def plot_users_over_time(load_json=True, use_api=True, **other_params):
	old_data = pd.read_json(users_over_time_file_name) if load_json else None
	df = ac.show_plot_over_time(
		"Monthly Activity Overview",
		["Users", "Total Pageviews"],
		["activeUsers", "screenPageViews"] if use_api else None,
		dimensions="yearMonth",
		sort_results=["yearMonth"],
		df_processor=process_users_over_time_df if use_api else None,
		pre_plot_df_processor=None if old_data is None else (lambda df: df.add(old_data, fill_value=0).astype("int")[::-1]) if use_api else (lambda df: old_data),
		format_table=False,
		**other_params
	)
	return ac.format_change_over_time_table(df, change_dir=-1, **other_params)

def process_users_over_time_df(df):
	df = add_missing_dates(df)
	if df.index[-1] == date.today().strftime("%Y%m"):
		return df.set_index(df.index + "01")[-2::-1]
	return df.set_index(df.index + "01")[-1::-1]

def add_missing_dates(df):
	start = df.index[0]
	end = df.index[-1]
	start_num = int(start[0:4]) * 12 + (int(start[4:6]) - 1)
	end_num = int(end[0:4]) * 12 + (int(end[4:6]) - 1)
	return df.reindex(fill_value=0, index=[f"{int(n/12):0>4}{(n%12+1):0>2}" for n in range(start_num, end_num + 1)])
