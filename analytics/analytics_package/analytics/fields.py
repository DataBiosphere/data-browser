# Metric names
METRIC_EVENT_COUNT = 'eventCount'
METRIC_TOTAL_USERS = 'totalUsers'
METRIC_PAGE_VIEW = 'screenPageViews'

# DIMENSIONS
DIMENSION_PAGE_PATH = {
    'id': 'pagePath',
    'alias': 'page_path',
    'remove_matches': None,
}
DIMENSION_BUILTIN_URL = {
    'id': 'linkUrl',
    'alias': 'builtin_url',
    'remove_matches': r"\s*",
}
DIMENSION_EVENT_NAME = {
    'id': 'eventName',
    'alias': 'event_name',
    'remove_matches': None,
}
DIMENSION_CUSTOM_URL = {
    'id': 'customEvent:click_url',
    'alias': 'outbound_url',
    'remove_matches': r"\(not set\)",
}
