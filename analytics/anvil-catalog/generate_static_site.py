#!/usr/bin/env python3
"""Generate static analytics site for AnVIL Catalog."""

import os

import analytics.api as ga
from analytics.static_site import generate_site
from constants import CURRENT_MONTH, ANVIL_CATALOG_ID, SECRET_NAME, ANALYTICS_START, OAUTH_PORT, HISTORIC_UA_DATA_PATH

os.environ.setdefault(SECRET_NAME, "../../.credentials/anvil_ga4_credentials.json")

ga_authentication = ga.authenticate(
    SECRET_NAME,
    ga.ga4_service_params,
    port=OAUTH_PORT,
)

generate_site(
    ga_authentication=ga_authentication,
    config={
        "site_title": "AnVIL Catalog",
        "logo_url": "https://explore.anvilproject.org/images/logoAnvil.png",
        "favicon_url": "https://explore.anvilproject.org/favicons/favicon.ico",
        "logo_link": "https://explore.anvilproject.org",
        "primary_color": "#035C94",
        "primary_color_dark": "#003E76",
    },
    property_id=ANVIL_CATALOG_ID,
    current_month=CURRENT_MONTH,
    analytics_start=ANALYTICS_START,
    output_dir="./site",
    custom_events=[
        {"event_name": "filter_selected", "label": "Filter Selections"},
    ],
    historic_data_path=HISTORIC_UA_DATA_PATH,
)
