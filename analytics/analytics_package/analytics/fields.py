# Metric names
METRIC_EVENT_COUNT = 'eventCount'
METRIC_TOTAL_USERS = 'totalUsers'
METRIC_PAGE_VIEW = 'screenPageViews'

# Event Names
EVENT_BUILTIN_CLICK = "click"
EVENT_CUSTOM_CLICK = "outbound_link_clicked"
EVENT_PAGE_VIEW = "page_view"

# DIMENSIONS
DIMENSION_PAGE_PATH = {
    'id': 'pagePath',
    'alias': 'page_path',
}
DIMENSION_BUILTIN_URL = {
    'id': 'linkUrl',
    'alias': 'builtin_url',
}
DIMENSION_EVENT_NAME = {
    'id': 'eventName',
    'alias': 'event_name',
}
DIMENSION_CUSTOM_URL = {
    'id': 'customEvent:click_url',
    'alias': 'outbound_url',
}
