import analytics_api as ga
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from google.cloud import bigquery
import json
import requests


def authenticate_ga():
	ga.authenticate();

def format_fancy_chart(df):
    df2 = df.copy(deep=True)
    
    data_cols = [c for c in df2.columns]
    
    df2['Quarter'] = df2.index.quarter
    df2['Year'] = df2.index.year

    df2 = df2.groupby(['Year','Quarter']).sum()
    
    df2.columns = pd.MultiIndex.from_tuples([(name, 'Value') for name in data_cols])
    
    for name in data_cols:
        df2[(name, '% Change')] = df2[name].pct_change().mul(100)
    
    df2 = df2[[(a, b) for a in data_cols for b in ['Value', '% Change']]]
    
    s = df2.style.format(na_rep='', formatter={(name, '% Change'): '({:.2f}%)' for name in data_cols})
    s = s.applymap(lambda v: 'color: red' if v < 0 else 'color: green' if v > 0 else None, subset=[(name, '% Change') for name in data_cols])
    s = s.set_table_styles([
        {'selector': 'th.col_heading', 'props': 'text-align: center'},
        {'selector': 'thead > tr:nth-child(2)', 'props': 'display: none'},
        {'selector': 'td.col1, td.col3', 'props': 'text-align: left; padding-left: 0'}
    ], overwrite=False)

    return s

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


	display(format_fancy_chart(df))

def plot_hbar(ga_property, title, xlabel, ylabel, metric, dimension, start_date, end_date):

	df = ga.get_metrics_by_dimensions(ga_property, metric,dimension, start_date, end_date)

	fontsize=16
	position = list(range(1, 20))

	df.set_index(dimension, inplace=True)
	df[metric] = df[metric].astype(str).astype(int)
	df = df.sort_values(by=[metric]).tail(20)

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

