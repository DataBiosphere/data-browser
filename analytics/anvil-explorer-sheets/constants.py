# CHANGE THESE VALUES TO GENERATE NEW REPORTS
# The date of the current month to report on (yyyy-mm)
CURRENT_MONTH = "2026-07"
# The name of the folder in which to save the report
PARENT_FOLDER_NAME = "July 2026"

# The name of the spreadsheet with the report
SHEET_NAME = "AnVIL Explorer"
ANVIL_EXPLORER_ID = "383267328"
# Dates of known synthetic/bot traffic (headless-browser burst, likely a load test)
# to exclude from reports; see DataBiosphere/data-browser#4907.
EXCLUDE_BOT_TRAFFIC_DATES = ["2025-02-10", "2025-02-11"]
SECRET_NAME = 'ANVIL_ANALYTICS_REPORTING_CLIENT_SECRET_PATH'
GA_PROPERTY_PORTAL = "368678391" # AnVIL Explorer - GA4
ANALYTICS_START = "2024-01-01"

OAUTH_PORT = 8082