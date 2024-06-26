from google.cloud import bigquery
import matplotlib.pyplot as plt
import pandas as pd
import requests

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
	
	def plot_total():
		plt.rc("font", size=16)

		ax_total = df["totalSessionCount"].plot(title='Number of sessions per day downloading files', legend=False, xlabel='', figsize=(16, 9))
		plt.show()
	
	def plot_a():
		plt.rc("font", size=16)

		df_a = df[["fastqSessionCount", "bamSessionCount", "matrixSessionCount", "otherSessionCount"]].rolling("7d").mean()
		
		axs_a = df_a.plot(subplots=True, ylim=(0, df_a.max().max() + 5), title="Number of sessions per day downloading given file types", xlabel="", figsize=(16, 9))
		axs_a[0].legend(["FASTQ"])
		axs_a[1].legend(["BAM"])
		axs_a[2].legend(["Matrix"])
		axs_a[3].legend(["Other"])
		plt.tight_layout()
		plt.show()

	def plot_b():
		plt.rc("font", size=16)

		df_b = pd.concat([
			(df["matrixSessionCount"] - df["loomMatrixSessionCount"]).rename("CGMs only"),
			(df["loomMatrixSessionCount"] + df["otherMatrixSessionCount"] - df["matrixSessionCount"]).rename("CGMs and DCP matrices"),
			(df["matrixSessionCount"] - df["otherMatrixSessionCount"]).rename("DCP matrices only")
		], axis=1).rolling("7d").mean()
		ax_b = df_b.plot(kind="area", stacked=True, title="Number of sessions per day downloading matrices", xlabel="", figsize=(16, 9))
		plt.tight_layout()
		plt.show()
	
	return plot_total, plot_a, plot_b

def plot_ethnicity(catalog):
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
	
	def plot_a():
		plt.rc("font", size=16)

		ax_a = series_a.plot(kind="barh", title="Donor ethnicity (" + catalog.upper() + ") - Specified vs. Unspecified", xlabel="", figsize=(16, 9))
		ax_a.set_xlabel("Donors")
		plt.tight_layout()
		plt.show()
	
	def plot_b():
		plt.rc("font", size=16)
	
		ax_b = series_b.plot(kind="barh", title="Donor ethnicity (" + catalog.upper() + ")", xlabel="", figsize=(16, 9))
		ax_b.set_xlabel("Donors")
		plt.tight_layout()
		plt.show()
	
	return plot_a, plot_b
