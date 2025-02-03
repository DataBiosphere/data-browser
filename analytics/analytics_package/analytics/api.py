from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
import os
import pandas as pd
import re


ga_service_params = (
	['https://www.googleapis.com/auth/analytics.readonly'],
	'analytics', 'v3',
	{},
	lambda service, params: service.data().ga().get(**params).execute()
)
yt_service_params = (
	['https://www.googleapis.com/auth/yt-analytics.readonly'],
	'youtubeAnalytics', 'v2',
	{
		'start_date': 'startDate',
		'end_date': 'endDate',
		'start_index': 'startIndex',
		'max_results': 'maxResults',
		'segment': None
	},
	lambda service, params: service.reports().query(**params).execute()
)

drive_service_params = (
	["https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/spreadsheets"],
	"drive", "v3",
	{},
)

sheets_service_params = (
	["https://www.googleapis.com/auth/spreadsheets"],
	"sheets", "v4",
	{}
)

next_port = None
default_service_system = None

def authenticate(secret_name, first_service_params=ga_service_params, *other_service_params, port=None):
	service_param_sets = (first_service_params,) + other_service_params

	all_scopes = {scope for service_params in service_param_sets for scope in service_params[0]}

	ANALYTICS_REPORTING_CLIENT_SECRET_PATH=os.getenv(secret_name)

	flow = InstalledAppFlow.from_client_secrets_file(ANALYTICS_REPORTING_CLIENT_SECRET_PATH,
		scopes=all_scopes)
	
	global next_port

	if port is None:
		if next_port is None:
			port = 8082
		else:
			port = next_port
		next_port = port + 1
	elif next_port is None:
		next_port = port + 1
	
	credentials = flow.run_local_server(port=port)

	built_systems = [build_service_system(service_params, credentials) for service_params in service_param_sets]

	return built_systems if len(built_systems) > 1 else built_systems[0]

def build_service_system(service_params, credentials):
	if len(service_params) == 4:
		service_name, service_version, param_subs_or_alt_api = service_params[1:]
		query_func = None
	else:
		service_name, service_version, param_subs_or_alt_api, query_func = service_params[1:]
	
	# Build the service object.
	service = build(service_name, service_version, credentials=credentials)
	
	service_system = (service, query_func, param_subs_or_alt_api, credentials)
	
	global default_service_system
	if default_service_system is None:
		default_service_system = service_system
	
	return service_system


def get_metrics_by_dimensions(metrics, dimensions, service_system=None, sort_results=None, **other_params):
	if service_system is None:
		service_system = default_service_system
	
	service, query_func, param_subs_or_alt_api = service_system[:3]
	
	metrics = normalize_id_list(metrics)
	dimensions = normalize_id_list(dimensions)
	sort_results = normalize_id_list(sort_results)
	
	if query_func is None:
		return param_subs_or_alt_api(service, metrics, dimensions, sort_results=sort_results, **other_params)
	
	return get_metrics_by_dimensions_v3_style(service, query_func, param_subs_or_alt_api, metrics, dimensions, sort_results=sort_results, **other_params)


def get_metrics_by_dimensions_v3_style(service, query_func, param_subs, metrics, dimensions, property, start_date, end_date, sort_results, filters=None, segment=None, property_prefix='ga:', max_results=1000, **other_params):
	metrics = join_id_list(metrics)
	dimensions = join_id_list(dimensions)
	sort_results = join_id_list(sort_results)
	
	# Dimensions and Metrics... 
	# Dimensions are atrributes, Metrics are quantitative measurements. e.g. city is a Dimension
	# Sessions  is a metric.
	#https://support.google.com/analytics/answer/1033861?hl=en#site-search-attribution&zippy=%2Cin-this-article
	
	# Required other params: ids, start_date, end_date
	# Other notable ones: filters, segment
	
	params = build_params({
		'ids': property_prefix + property,
		'dimensions': dimensions,
		'metrics': metrics,
		'start_date': start_date,
		'end_date': end_date,
		'filters': filters,
		'segment': segment,
		'start_index': 1,
		'max_results': max_results,
		'sort': sort_results
	}, param_subs)

	start_index_key = param_subs.get('start_index', 'start_index')
	max_results_key = param_subs.get('max_results', 'max_results')
	
	results = []
	has_more = True

	while has_more:
		result = query_func(service, params)
		has_more = ('rows' in result) and (len(result['rows']) > 0)
		if has_more or len(results) == 0:
			results.append(result)
			params[start_index_key] += params[max_results_key] 
	
	df =  results_to_df(results)

	return df


def get_metrics_by_dimensions_v4_style(service, metrics, dimensions, property, start_date, end_date, sort_results, metric_filter=None, dimension_filter=None, base_metric_filter=None, base_dimension_filter=None, property_prefix="properties/", max_results=1000, **other_params):
	property = property_prefix + property
	
	params = {
		"dateRanges": [{"startDate": start_date, "endDate": end_date}],
		"metrics": [{"name": metric} for metric in metrics],
		"dimensions": [{"name": dimension} for dimension in dimensions],
		"metricFilter": parse_filter_expressions([base_metric_filter, metric_filter], True),
		"dimensionFilter": parse_filter_expressions([base_dimension_filter, dimension_filter], False),
		"orderBys": [({"dimension": {"dimensionName": field}} if field in dimensions else {"metric": {"metricName": field}}) for field in sort_results],
		"limit": max_results
	}

	offset = 0
	results = []
	rows_left = None
	has_more = True

	while has_more:
		result = service.properties().runReport(property=property, body=params).execute()
		if rows_left is None:
			rows_left = result.get("rowCount", 0)
		page_row_count = len(result["rows"]) if "rows" in result else 0
		has_more = page_row_count > 0
		if has_more:
			results.append(result)
			rows_left -= page_row_count
			if rows_left <= 0:
				has_more = False
			else:
				offset += max_results
				params["offset"] = offset
	
	df = v4_results_to_df(results, dimensions, metrics)

	return df

def v4_results_to_df(results, dimensions, metrics):
	if (len(results) == 0):
		return pd.DataFrame(columns=dimensions + metrics)

	df = pd.DataFrame()
	for result in results:  
		# Collect column names 
		column_names = [header["name"] for header in result.get("dimensionHeaders", [])] + [header["name"] for header in result.get("metricHeaders", [])]
		
		# Get data  
		if "rows" in result:
			data = [[cell["value"] for cell in row.get("dimensionValues", [])] + [cell["value"] for cell in row.get("metricValues", [])] for row in result["rows"]]
		else:
			data = None

		# Crete the dataframe
		df = pd.concat([df, pd.DataFrame(data, columns = column_names)])

	return df

ga4_service_params = (
	['https://www.googleapis.com/auth/analytics.readonly'],
	'analyticsdata', 'v1beta',
	get_metrics_by_dimensions_v4_style
)

filter_match_re = re.compile(r"^(\w+)(?:(==|>|<|>=|<=|=@|=~)|(!=|!@|!~))(.*)$")
filter_escape_re = re.compile(r"\\([,;])")
filter_and_re = re.compile(r"((?:[^\\;]|\\(?:\\\\)*.)+)(?:;|$)")
filter_or_re = re.compile(r"((?:[^\\,]|\\(?:\\\\)*.)+)(?:,|$)")
filter_op_names = {
	"==": "EQUAL",
	"!=": "EQUAL",
	">": "GREATER_THAN",
	"<": "LESS_THAN",
	">=": "GREATER_THAN_OR_EQUAL",
	"<=": "LESS_THAN_OR_EQUAL",
	"=@": "CONTAINS",
	"!@": "CONTAINS",
	"=~": "PARTIAL_REGEXP",
	"!~": "PARTIAL_REGEXP"
}

def parse_filter_expression(text, is_metric):
	if not isinstance(text, str):
		return text

	def unescape(value):
		return filter_escape_re.sub(r"\1", value)

	def parse_match(text):
		field_name, plain_op, inverted_op, value = filter_match_re.match(text).groups()
		op_name = filter_op_names[plain_op or inverted_op]
		if is_metric:
			plain_expression = {
				"filter": {
					"fieldName": field_name,
					"numericFilter": {
						"operation": op_name,
						"value": {
							"int64Value": value
						}
					}
				}
			}
		else:
			plain_expression = {
				"filter": {
					"fieldName": field_name,
					"stringFilter": {
						"matchType": "EXACT" if op_name == "EQUAL" else op_name,
						"value": unescape(value),
						"caseSensitive": True
					}
				}
			}
		return plain_expression if plain_op else {"notExpression": plain_expression}

	def parse_or(text):
		or_terms = [parse_match(t) for t in filter_or_re.findall(text)]
		return or_terms[0] if len(or_terms) == 1 else {"orGroup": {"expressions": or_terms}}

	and_terms = [parse_or(t) for t in filter_and_re.findall(text)]
	return and_terms[0] if len(and_terms) == 1 else {"andGroup": {"expressions": and_terms}}

def parse_filter_expressions(filters, is_metric):
	result = None
	for filter in filters:
		parsed = parse_filter_expression(filter, is_metric)
		if parsed:
			result = parsed if result is None else {"andGroup": {"expressions": [result, parsed]}}
	return result


def normalize_id_list(ids):
	return (ids.split(",") if isinstance(ids, str) else ids) if ids else []

def join_id_list(ids):
	return ",".join(ids) if len(ids) > 0 else None


def build_params(source, subs):
	result = {}
	
	for key, value in source.items():
		if key in subs:
			if not subs[key] is None:
				result[subs[key]] = value
		else:
			result[key] = value
	
	return result


def results_to_df(results):
	df = pd.DataFrame()
	for result in results:  
		# Collect column nmes 
		column_names = []
		for header in result.get('columnHeaders'):
			column_names.append(header.get('name'))

		# Get data  
		data = result.get('rows')

		# Crete the dataframe
		df = pd.concat([df, pd.DataFrame(data, columns = column_names)])

	return df

