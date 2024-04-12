import analytics.charts as ac
import pandas as pd
import json
import requests
from functools import cache
import re
from html import escape as escape_html

users_over_time_file_name = "users_over_time_history.json"


@cache
def get_project_name(id):
	info = requests.get("https://service.azul.data.humancellatlas.org/index/projects/" + id).json()
	if "projects" in info:
		return info["projects"][0]["projectTitle"]
	else:
		return id

def format_export_url_info(type, secondary_type, filter):
	result = escape_html(type.replace("-", " "))
	if secondary_type:
		result += escape_html(", " + secondary_type.replace("-", " "))
	for facet in json.loads(filter):
		if facet["facetName"] == "projectId":
			result += "\nProject: " + ", ".join(['<a href="https://data.humancellatlas.org/explore/projects/' + id + '">' + get_project_name(id) + '</a>' for id in facet["terms"]])
		else:
			result += escape_html("\n" + facet["facetName"] + ": " + ", ".join([term if isinstance(term, str) else json.dumps(term) for term in facet["terms"]]))
	return (result, True)

def adjust_table_index_key(val):
	if isinstance(val, str):
		hca_url_match = re.search("^((?:explore\\.)?data\\.humancellatlas\\.org)(/.*)$", val)
		if hca_url_match:
			host = hca_url_match.group(1)
			path = hca_url_match.group(2)
			if host == "explore.data.humancellatlas.org":
				match = re.search("^\\/(?:projects\\/([^\\/#?]+)|export\\/(export-to-terra|get-curl-command|download-manifest)(?:\\/(select-species))?\\?filter=(.+))", path)
				if match:
					if match.group(1):
						return ('<a href="' + escape_html("https://" + val) + '">' + escape_html(get_project_name(match.group(1))) + '</a>', True)
					else:
						return format_export_url_info(match.group(2), match.group(3), match.group(4))
			return ('<a href="' + escape_html("https://" + val) + '">' + escape_html(path) + '</a>', True)
	return val

def format_project_id_key(val):
	return ('<a href="' + escape_html("https://data.humancellatlas.org/explore/projects/" + val) + '">' + escape_html(get_project_name(val)) + '</a>', True)

def relative_url_index_processor(path_column_name, host_column_name):
	def process(df):
		df = df.copy(deep=True)
		path_index = df.index.get_level_values(path_column_name)
		host_index = df.index.get_level_values(host_column_name)
		host_prefix_column = host_index.where(path_index.str.startswith("/"), "")
		new_index = (host_prefix_column + path_index).set_names(path_column_name)
		df.index = new_index
		df = df.groupby(df.index).sum()
		return df

	return process

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
		df_processor=(lambda df: df.set_index(df.index + "01")[-2::-1]) if use_api else None,
		pre_plot_df_processor=None if old_data is None else (lambda df: df.add(old_data, fill_value=0).astype("int")[::-1]) if use_api else (lambda df: old_data),
		format_table=False,
		**other_params
	)
	return ac.format_change_over_time_table(df, change_dir=-1, **other_params)
