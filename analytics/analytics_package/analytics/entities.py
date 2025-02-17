# Metric names
# The number of events that occur
from enum import Enum

# The number of events that occur
METRIC_EVENT_COUNT = {
    "id": "eventCount",
    "alias": "Event Count",
    "change_alias": "Event Count Change",
}
# The total number of users that trigger an event
# Includes users who visit very briefly and do not interact with the site
# See https://support.google.com/analytics/answer/12253918?hl=en
METRIC_TOTAL_USERS = {
    "id": "totalUsers",
    "alias": "Total Users",
    "change_alias": "Total Users Change",
}
# The number of active users as defined by GA4
# See https://support.google.com/analytics/answer/12253918?hl=en
METRIC_ACTIVE_USERS = {
    "id": "activeUsers",
    "alias": "Users",
    "change_alias": "Active Users Change",
}
# The number of page views
METRIC_PAGE_VIEWS = {
    "id": "screenPageViews",
    "alias": "Total Pageviews",
    "change_alias": "Total Pageviews Change",
}
# The number of sessions
METRIC_SESSIONS = {
    "id": "sessions",
    "alias": "Sessions",
    "change_alias": "Sessions Change",
}
# The total number of clicks on outbound links. Generated from other metrics, so does not have an id field
SYNTHETIC_METRIC_CLICKS = {
    "id": None,
    "alias": "Total Clicks",
    "change_alias": "Total Clicks Change",
}

# Event Names
# The builtin outbound link click event. Stores the clicked URL in DIMENSION_BUILTIN_URL
# Triggers under some circumstances where custom click does not, but does not include url fragments in any dimensions
EVENT_BUILTIN_CLICK = "click"
# The custom outbound link click event. Stores the clicked URL DIMENSION_CUSTOM_URL
# Includes url fragments, sometimes has a slightly different count to the built in click event
EVENT_CUSTOM_CLICK = "outbound_link_clicked"
# The builtin page view event. 
EVENT_PAGE_VIEW = "page_view"

# DIMENSIONS
# The path to the page the user is on when the event occurs. Does not include fragments or parameters
DIMENSION_PAGE_PATH = {
    "id": "pagePath",
    "alias": "Page Path",
}
# The url of the clicked link, only returned in EVENT_BUILTIN_CLICK. Does not include URL fragments
DIMENSION_BUILTIN_URL = {
    "id": "linkUrl",
    "alias": "URL",
}
# The name of the event. See GA4 docs for event names
DIMENSION_EVENT_NAME = {
    "id": "eventName",
    "alias": "Event Name",
}
# The url of the clicked link, only returned in EVENT_CUSTOM_CLICK. Includes URL fragments.
DIMENSION_CUSTOM_URL = {
    "id": "customEvent:click_url",
    "alias": "Outbound URL",
}
# The landing page for a session
DIMENSION_LANDING_PAGE = {
    "id": "landingPage",
    "alias": "Landing Page",
}
# The current month in the format YYYYMM
DIMENSION_YEAR_MONTH = {
    "id": "yearMonth",
    "alias": "Month",
}
# The hostname of the clicked link. Based on DIMENSION_CUSTOM_URL and DIMENSION_BUILTIN_URL
SYNTHETIC_DIMENSION_CLICKED_HOSTNAME = {
    "id": None,
    "alias": "Clicked Hostname",
}
# The complete clicked link, including hostname, parameters, fragments, and prefix. Based on DIMENSION_CUSTOM_URL and DIMENSION_BUILTIN_URL
SYNTHETIC_DIMENSION_CLICKED_LINK = {
    "id": None,
    "alias": "Outbound Link",
}

# Used as arguments in get_change_over_time_df
class ADDITIONAL_DATA_BEHAVIOR(Enum):
    ADD = "add" # Sum the cached data with the api data
    REPLACE = "replace"# Replace the api data with the cached data