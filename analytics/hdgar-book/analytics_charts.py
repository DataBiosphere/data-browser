import analytics_api as ga
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from google.cloud import bigquery
import json
import requests


def authenticate_ga():
	ga.authenticate();

def percent_change(a, b):
	return (b - a)/a * 100

def format_pc_change_table(df, include_plus=False):
	# Expects pairs of columns in a 2D multi-index where the second column is named "% Change"
	
	change_cols = [name for name in df.columns if name[1] == '% Change']
	
	change_format = '({:+.2f}%)' if include_plus else '({:.2f}%)'
	
	s = df.style.format(na_rep='', formatter={name: change_format for name in change_cols})
	s = s.applymap(lambda v: 'color: red' if v < 0 else 'color: green' if v > 0 else None, subset=change_cols)
	s = s.set_table_styles([
		{'selector': 'th.col_heading', 'props': 'text-align: center'},
		{'selector': 'thead > tr:nth-child(2)', 'props': 'display: none'},
		{'selector': ', '.join(["td.col%i" % (i * 2 + 1) for i in range(len(change_cols))]), 'props': 'text-align: left; padding-left: 0'}
	], overwrite=False)

	return s

def format_change_over_time_table(df):
	df2 = df.copy(deep=True)
	
	data_cols = [c for c in df2.columns]
	
	df2['Quarter'] = df2.index.quarter
	df2['Year'] = df2.index.year

	df2 = df2.groupby(['Year','Quarter']).sum()
	
	df2.columns = pd.MultiIndex.from_tuples([(name, 'Value') for name in data_cols])
	
	for name in data_cols:
		df2[(name, '% Change')] = df2[name].pct_change().mul(100)
	
	df2 = df2[[(a, b) for a in data_cols for b in ['Value', '% Change']]]
	
	return format_pc_change_table(df2)

def format_table_with_change(df, df_prev):
	# The data frames must have the same column names but may have some different indices
	
	df_joined = df.join(df_prev, rsuffix="_prev")
	df_change = pd.concat([v for name in df.columns for v in (df_joined[name], percent_change(df_joined[name], df_joined[name + "_prev"]))], axis=1)
	df_change.columns = pd.MultiIndex.from_tuples([(df_change.columns[i - i%2], "Value" if i%2 == 0 else "% Change") for (i, name) in enumerate(df_change.columns)])
	
	return format_pc_change_table(df_change, True)

def plot_users_over_time(ga_property, start_date, end_date):

	metrics = 'ga:1dayUsers, ga:uniquePageviews'
	dimensions = 'ga:date'
	df = ga.get_metrics_by_dimensions(ga_property, metrics,dimensions, start_date, end_date)

	# Convert date to datetime object
	df["ga:date"] = pd.to_datetime(df['ga:date'])
	df.set_index('ga:date', inplace=True)

	# Convert strings returned by API to integers. Can we do this earlier!
	# If not numeric data the series won't graph
	df["ga:1dayUsers"] = df['ga:1dayUsers'].astype(str).astype(int)
	df["ga:uniquePageviews"] = df['ga:uniquePageviews'].astype(str).astype(int)


	# Rename for display
	df.rename(columns={'ga:1dayUsers':'Daily Users', 'ga:uniquePageviews':'Unique Pageviews'}, inplace=True)

	#Smooth (coiuld we not just use 7 day users then?)
	# df = df.rolling(window=1).mean()

	# Notes: Linking Mandas and Matplotlib
	# https://stackoverflow.com/questions/29568110/how-to-use-ax-with-pandas-and-matplotlib

	fontsize=16
	fig, ax = plt.subplots(figsize=(16, 9))
	df.plot(ax=ax) #Link the df with the axis

	ax.set_xlabel('Time', fontsize=fontsize)
	ax.set_ylabel('Count', fontsize=fontsize)

	for label in (ax.get_xticklabels() + ax.get_yticklabels()):
		label.set_fontsize(fontsize)

	plt.rcParams['font.size'] = fontsize
	fig.suptitle('Daily Activity Overview')
	plt.show()

	# Average per qurter

	dfmean = df.rolling(window=30).mean()
	fig, ax = plt.subplots(figsize=(16, 9))
	dfmean.plot(ax=ax) #Link the df with the axis

	ax.set_xlabel('Time', fontsize=fontsize)
	ax.set_ylabel('Count', fontsize=fontsize)

	for label in (ax.get_xticklabels() + ax.get_yticklabels()):
		label.set_fontsize(fontsize)

	plt.rcParams['font.size'] = fontsize
	fig.suptitle('Daily Activity Overview 30 Day average')
	plt.show()


	display(format_change_over_time_table(df))

def get_top_ga_df(ga_property, metric, dimension, start_date, end_date, ascending=True, limit=20):
	df = ga.get_metrics_by_dimensions(ga_property, metric, dimension, start_date, end_date)
	
	df.set_index(dimension, inplace=True)
	df[metric] = df[metric].astype(str).astype(int)
	df = df.sort_values(by=[metric], ascending=ascending)
	
	if not limit is None:
		df = df.tail(limit) if ascending else df.head(limit)
	
	return df

def plot_hbar(ga_property, title, xlabel, ylabel, metric, dimension, start_date, end_date):

	df = get_top_ga_df(ga_property, metric, dimension, start_date, end_date)

	fontsize=16
	# position = list(range(1, 20))

	fig, ax = plt.subplots(figsize=(16, 9))
	plt.barh(df.index, df[metric]) #Link the df with the axis

	fig.suptitle(title)
	ax.set_ylabel(ylabel)
	ax.set_xlabel(xlabel)


	for index, value in enumerate(df[metric]):
		plt.text(value, index,
			' ('+ str(value)+')')

	plt.rcParams['font.size'] = fontsize
	plt.show()

def show_difference_table(ga_property, xlabel, ylabel, metric, dimension, period_src, prev_period_src):
	period = pd.Period(period_src)
	prev_period = pd.Period(prev_period_src)
	
	df = get_top_ga_df(ga_property, metric, dimension, period.start_time.isoformat()[:10], period.end_time.isoformat()[:10], ascending=False)
	df_prev = get_top_ga_df(ga_property, metric, dimension, prev_period.start_time.isoformat()[:10], prev_period.end_time.isoformat()[:10], ascending=False, limit=None)
	
	df.rename(columns={metric: xlabel}, inplace=True)
	df_prev.rename(columns={metric: xlabel}, inplace=True)
	df.index.rename(ylabel, inplace=True)
	df_prev.index.rename(ylabel, inplace=True)
	
	display(format_table_with_change(df, df_prev))


def plot_downloads():
	QUERY = """
		SELECT
			day,
			COUNT(*) AS totalSessionCount,
			COUNTIF("fastq" IN UNNEST(fileTypes)) AS fastqSessionCount,
			COUNTIF("bam" IN UNNEST(fileTypes)) AS bamSessionCount,
			COUNTIF("matrix" IN UNNEST(fileTypes)) AS matrixSessionCount,
			COUNTIF("other" IN UNNEST(fileTypes)) AS otherSessionCount,
			COUNTIF(".loom" IN UNNEST(matrixTypes)) AS loomMatrixSessionCount,
			COUNTIF(ARRAY_LENGTH(matrixTypes) > 1 OR (ARRAY_LENGTH(matrixTypes) = 1 AND matrixTypes[OFFSET(0)] != ".loom")) AS otherMatrixSessionCount
		FROM (
			SELECT
				DATE_TRUNC(timestamp, DAY) AS day,
				protopayload_auditlog.requestMetadata.callerIp,
				ARRAY_AGG(
					DISTINCT
					IF(
						REGEXP_CONTAINS(protopayload_auditlog.resourceName, "(?i)\\\\.fastq(?:\\\\.|$)"),
						"fastq",
						IF(
							REGEXP_CONTAINS(protopayload_auditlog.resourceName, "(?i)\\\\.bam(?:\\\\.|$)"),
							"bam",
							IF(
								REGEXP_CONTAINS(protopayload_auditlog.resourceName, "(?i)\\\\.(?:h5ad|loom|mtx)(?:\\\\.|$)"),
								"matrix",
								"other"
							)
						)
					)
				) AS fileTypes,
				ARRAY_AGG(
					DISTINCT
					REGEXP_EXTRACT(protopayload_auditlog.resourceName, "(?i)\\\\.(?:(?:h5ad|mtx)(?:\\\\.|$)|loom$|loom\\\\.)")
					IGNORE NULLS
				) AS matrixTypes
			FROM `broad-datarepo-terra-prod-hca2.accesslogs.cloudaudit_googleapis_com_data_access_*`
			GROUP BY day, callerIp
		)
		GROUP BY day ORDER BY day
	"""

	client = bigquery.Client()

	df = client.query(QUERY).result().to_dataframe(create_bqstorage_client=False)
	df.set_index("day", inplace=True)

	ax_total = df["totalSessionCount"].plot(title='Number of sessions per day downloading files', legend=False, xlabel='')
	plt.show()
	
	df_a = df[["fastqSessionCount", "bamSessionCount", "matrixSessionCount", "otherSessionCount"]].rolling("7d").mean()
	
	axs_a = df_a.plot(subplots=True, ylim=(0, df_a.max().max() + 5), title="Number of sessions per day downloading given file types", xlabel="")
	axs_a[0].get_figure().set_size_inches(7, 6)
	axs_a[0].legend(["FASTQ"])
	axs_a[1].legend(["BAM"])
	axs_a[2].legend(["Matrix"])
	axs_a[3].legend(["Other"])
	plt.tight_layout()
	plt.show()

	df_b = pd.concat([
		(df["matrixSessionCount"] - df["loomMatrixSessionCount"]).rename("CGMs only"),
		(df["loomMatrixSessionCount"] + df["otherMatrixSessionCount"] - df["matrixSessionCount"]).rename("CGMs and DCP matrices"),
		(df["matrixSessionCount"] - df["otherMatrixSessionCount"]).rename("DCP matrices only")
	], axis=1).rolling("7d").mean()

	ax_b = df_b.plot(kind="area", stacked=True, title="Number of sessions per day downloading matrices", xlabel="")
	ax_b.get_figure().set_size_inches(7, 5)
	plt.tight_layout()
	plt.show()

def plot_ethnicity():
	catalog = "dcp13"

	def get_sources_expr():
		sources = requests.get("https://service.azul.data.humancellatlas.org/repository/sources?catalog=" + catalog).json()["sources"]
		return "(" + " UNION ALL ".join(["SELECT * FROM `" + get_table_name(source["sourceSpec"]) + "`" for source in sources]) + ")"

	def get_table_name(spec):
		parts = [p.split(":") for p in spec.split("/")]
		return parts[0][1] + "." + parts[1][0] + ".donor_organism"

	QUERY = """
		select
			IFNULL(ethnicity, "[Missing]") as Ethnicity,
			Code,
			count(*) as Count
		from (
			select
				datarepo_row_id,
				json_extract_scalar(gs, "$.ontology") as species,
				json_extract_scalar(eth, "$.ontology_label") as ethnicity, 
				json_extract_scalar(eth, "$.ontology") as Code,
				content,
				json_extract_scalar(content, "$.provenance.document_id") AS did
			from
				%s
				LEFT JOIN UNNEST(JSON_EXTRACT_ARRAY(content, "$.genus_species")) as gs
				LEFT JOIN UNNEST(JSON_EXTRACT_ARRAY(content, "$.human_specific.ethnicity")) AS eth
		) as T
		where species = "NCBITaxon:9606"
		GROUP BY T.ethnicity, T.Code
		ORDER BY Count DESC 
		""" % get_sources_expr()
	
	client = bigquery.Client()

	df = client.query(QUERY).result().to_dataframe(create_bqstorage_client=False)
	df.set_index("Ethnicity", inplace=True)
	
	series_a = df["Count"].groupby(lambda eth: "Unspecified" if eth == "[Missing]" else "Specified").sum()
	series_b = df.loc[df.index != "[Missing]"]["Count"]
	
	series_a.sort_values(inplace=True, ascending=False)
	
	ax_a = series_a.plot(kind="barh", title="Donor ethnicity (" + catalog.upper() + ") - Specified vs. Unspecified", xlabel="")
	ax_a.set_xlabel("Donors")
	plt.tight_layout()
	plt.show()
	
	ax_b = series_b.plot(kind="barh", title="Donor ethnicity (" + catalog.upper() + ")", xlabel="")
	ax_b.get_figure().set_size_inches(10, 6)
	ax_b.set_xlabel("Donors")
	plt.tight_layout()
	plt.show()

