from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
import os
import pandas as pd


service = None

def authenticate(secret_name):
	
	ANALYTICS_REPORTING_CLIENT_SECRET_PATH=os.getenv(secret_name)

	flow = InstalledAppFlow.from_client_secrets_file(ANALYTICS_REPORTING_CLIENT_SECRET_PATH,
		scopes=['https://www.googleapis.com/auth/analytics.readonly'])

	credentials = flow.run_local_server()

	# Build the service object.
	global service
	service = build('analytics', 'v3', credentials=credentials)
	
	
def get_accounts():
	
	if service == None:
		authenticate()
		
	accounts = service.management().accounts().list().execute
		

def get_metrics_by_dimensions(metrics, dimensions, property, start_date, end_date, filters=None, segment=None, **other_params):
	
	if isinstance(metrics, list):
		metrics = ",".join(metrics)
	if isinstance(dimensions, list):
		dimensions = ",".join(dimensions)
	
	if service == None:
		authenticate()
	
	# Dimensions and Metrics... 
	# Dimensions are atrributes, Metrics are quantitative measurements. e.g. city is a Dimension
	# Sessions  is a metric.
	#https://support.google.com/analytics/answer/1033861?hl=en#site-search-attribution&zippy=%2Cin-this-article
	
	# Required other params: ids, start_date, end_date
	# Other notable ones: filters, segment
	
	params = {
		'ids': 'ga:' + property,
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
		result = service.data().ga().get(**params).execute()
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

