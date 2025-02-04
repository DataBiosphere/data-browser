# CHANGE THESE VALUES TO GENERATE NEW REPORTS
# The start and end dates of the current month (yyyy-mm-dd)
START_DATE_CURRENT = "2024-12-01"
END_DATE_CURRENT = "2024-12-31"
# The start and end dates of the prior months
START_DATE_PRIOR = "2024-11-01"
END_DATE_PRIOR = "2024-11-30"
# The name of the folder in which to save the report
PARENT_FOLDER_NAME = "December 2024 (demos)"

# The name of the spreadsheet with the report
SHEET_NAME = "HCA Explorer"

HCA_PORTAL_ID = "361323030"
# Filter to exclude the Data Explorer
HCA_BROWSER_EXCLUDE_FILTER = {"filter": {"fieldName": "hostName", "stringFilter": {"matchType": "EXACT", "value": "explore.data.humancellatlas.org"}}}
SECRET_NAME = "HCA_ANALYTICS_REPORTING_CLIENT_SECRET_PATH"
ANALYTICS_START = "2021-01-01"

OAUTH_PORT = 8082