# CHANGE THESE VALUES TO GENERATE NEW REPORTS
# The date of the current month to report on (yyyy-mm)
CURRENT_MONTH = "2025-01"
# The name of the folder in which to save the report
PARENT_FOLDER_NAME = "Test Folder 2"

# THESE VALUES SHOULD ONLY NOT BE CHANGED EXCEPT TO ADD NEW PROPERTIES
# The name of the spreadsheet with the report
SHEET_NAME = "Test Report Table" 
# The path to a file containing historic GA data. Provided as an example, it is not used in this script
HISTORIC_UA_DATA_PATH = "./users_over_time_history.json" 
# The catalog id for the selected property. In this case, the HCA browser/portal
ANALYTICS_PROPERTY_ID = "361323030" 
# The name of the environment variable that contains the path to the client secret file
SECRET_NAME = 'ANALYTICS_CLIENT_SECRET_PATH' 
# The start date of the month for which reliable GA4 data is available for each day. Varies betweren properties
ANALYTICS_START = "2023-07-01" 
# The start of the first month in which custom events are available. Multiple values for this will need to be added if more custom events are added
CUSTOM_EVENT_START = "2024-12-01" 
# The port to host the Oauth authentication on. Needs to match a configured redirect_uri on the google developer portal
OAUTH_PORT = 8082