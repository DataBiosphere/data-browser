import analytics.charts as ac
import json
import re
from html import escape as escape_html

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

def plot_users_over_time(**other_params):
	df = ac.show_plot_over_time(
		"Monthly Activity Overview",
		["Users Per Month", "Total Pageviews Per Month"],
		["ga:30dayUsers", "ga:pageviews"],
		df_filter=ac.make_month_filter(["ga:30dayUsers"]),
		df_processor=lambda df: df[::-1],
		format_table=False,
		**other_params
	).rename(columns={"Users Per Month": "Users", "Total Pageviews Per Month": "Total Pageviews"})
	return ac.format_change_over_time_table(df, change_dir=-1,  **other_params)

