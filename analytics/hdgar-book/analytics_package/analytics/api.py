from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
import os
import pandas as pd


ga_service_params = (
	['https://www.googleapis.com/auth/analytics.readonly'],
	'analytics', 'v3',
	lambda service, params: service.data().ga().get(**params).execute()
)
yt_service_params = (
	['https://www.googleapis.com/auth/yt-analytics.readonly'],
	'youtubeAnalytics', 'v2',
	lambda service, params: service.reports().query(**params).execute()
)

default_query_function = None

def authenticate(secret_name, service_params=ga_service_params):
	# service_params contains scopes, service name, version, and query function (which takes a service object and a params dict)
	
	ANALYTICS_REPORTING_CLIENT_SECRET_PATH=os.getenv(secret_name)

	flow = InstalledAppFlow.from_client_secrets_file(ANALYTICS_REPORTING_CLIENT_SECRET_PATH,
		scopes=service_params[0])

	credentials = flow.run_local_server()
	
	# Build the service object.
	service = build(service_params[1], service_params[2], credentials=credentials)
	
	source_query_function = service_params[3]
	
	query_function = lambda params: source_query_function(service, params)
	
	global default_query_function
	if default_query_function is None:
		default_query_function = query_function
	
	return query_function


def get_metrics_by_dimensions(metrics, dimensions, property, start_date, end_date, filters=None, segment=None, property_prefix='ga:', query_function=None, **other_params):
	
	if query_function is None:
		query_function = default_query_function
	
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
	
	params = {
		'ids': property_prefix + property,
		'dimensions':dimensions,
		'metrics':metrics,
		'start_date': start_date,
		'end_date': end_date,
		'filters': filters,
		'segment': segment,
		'start_index':1,
		'max_results':1000
	}

	results = []
	has_more = True

	while has_more:
		result = query_function(params)
		results.append(result)
		has_more = result.get('nextLink')
		params['start_index']+= params['max_results'] 
	
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

