import analytics.charts as ac
from html import escape as escape_html

def adjust_table_index_key(val):
	if isinstance(val, str):
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

