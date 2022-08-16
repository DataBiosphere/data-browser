from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
import os
import pandas as pd


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
		'max_results': 'maxResults'
	},
	lambda service, params: service.reports().query(**params).execute()
)

default_service_system = None

def authenticate(secret_name, service_params=ga_service_params):
	scopes, service_name, service_version, param_subs, source_query_func = service_params
	
	ANALYTICS_REPORTING_CLIENT_SECRET_PATH=os.getenv(secret_name)

	flow = InstalledAppFlow.from_client_secrets_file(ANALYTICS_REPORTING_CLIENT_SECRET_PATH,
		scopes=scopes)

	credentials = flow.run_local_server()
	
	# Build the service object.
	service = build(service_name, service_version, credentials=credentials)
	
	service_system = (
		lambda params: source_query_func(service, params),
		param_subs
	)
	
	global default_service_system
	if default_service_system is None:
		default_service_system = service_system
	
	return service_system


def get_metrics_by_dimensions(metrics, dimensions, property, start_date, end_date, filters=None, segment=None, property_prefix='ga:', service_system=None, **other_params):
	
	if service_system is None:
		service_system = default_service_system
	
	query_func, param_subs = service_system
	
	if isinstance(metrics, list):
		metrics = ",".join(metrics)
	if isinstance(dimensions, list):
		dimensions = ",".join(dimensions)
	
	# Dimensions and Metrics... 
	# Dimensions are atrributes, Metrics are quantitative measurements. e.g. city is a Dimension
	# Sessions  is a metric.
	#https://support.google.com/analytics/answer/1033861?hl=en#site-search-attribution&zippy=%2Cin-this-article
	
	# Required other params: ids, start_date, end_date
	# Other notable ones: filters, segment
	
	start_index_key = param_subs.get('start_index', 'start_index')
	max_results_key = param_subs.get('max_results', 'max_results')
	
	params = {
		param_subs.get('ids', 'ids'): property_prefix + property,
		param_subs.get('dimensions', 'dimensions'): dimensions,
		param_subs.get('metrics', 'metrics'): metrics,
		param_subs.get('start_date', 'start_date'): start_date,
		param_subs.get('end_date', 'end_date'): end_date,
		param_subs.get('filters', 'filters'): filters,
		param_subs.get('segment', 'segment'): segment,
		start_index_key: 1,
		max_results_key: 1000
	}

	results = []
	has_more = True

	while has_more:
		result = query_func(params)
		has_more = ('rows' in result) and (len(result['rows']) > 0)
		if has_more or len(results) == 0:
			results.append(result)
			params[start_index_key] += params[max_results_key] 
	
	df =  results_to_df(results)

	return df
	


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

