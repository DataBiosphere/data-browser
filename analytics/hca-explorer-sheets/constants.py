# CHANGE THESE VALUES TO GENERATE NEW REPORTS
# The date of the current month to report on (yyyy-mm)
CURRENT_MONTH = "2025-01"
# The name of the folder in which to save the report
PARENT_FOLDER_NAME = "January 2025"

# The name of the spreadsheet with the report
SHEET_NAME = "HCA Explorer"

HCA_ID = "361323030"
# Filter to exclude the Data Explorer
HCA_BROWSER_ONLY_FILTER = {"filter": {"fieldName": "hostName", "stringFilter": {"matchType": "EXACT", "value": "explore.data.humancellatlas.org"}}}
SECRET_NAME = "HCA_ANALYTICS_REPORTING_CLIENT_SECRET_PATH"
ANALYTICS_START = "2024-02-01"

OAUTH_PORT = 8082