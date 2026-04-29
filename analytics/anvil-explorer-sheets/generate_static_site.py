#!/usr/bin/env python3
"""Generate static analytics site for AnVIL Explorer."""

import os

import analytics.api as ga
from analytics.static_site import generate_site, enrich_detail_records
from constants import CURRENT_MONTH, ANVIL_EXPLORER_ID, SECRET_NAME, ANALYTICS_START, OAUTH_PORT
from utils import fetch_dataset_title_map

os.environ.setdefault(SECRET_NAME, "../../.credentials/anvil_ga4_credentials.json")

ga_authentication = ga.authenticate(
    SECRET_NAME,
    ga.ga4_service_params,
    port=OAUTH_PORT,
)


def resolve_dataset_titles(data):
    title_map = fetch_dataset_title_map()
    count = enrich_detail_records(data, title_map, r"/datasets/([0-9a-f-]+)")
    print(f"  Enriched {count} records with dataset titles")


generate_site(
    ga_authentication=ga_authentication,
    config={
        "site_title": "AnVIL Explorer User Analytics",
        "logo_url": "https://explore.anvilproject.org/images/logoAnvil.png",
        "favicon_url": "https://explore.anvilproject.org/favicons/favicon.ico",
        "logo_link": "https://explore.anvilproject.org",
        "primary_color": "#035C94",
        "primary_color_dark": "#003E76",
        "entity_label": "Dataset",
        "entity_path": "/datasets",
        "summary_stats": [
            {
                "label": "Cohort Export Requests",
                "event_keys": ["index_bulk_download_requested", "index_file_manifest_requested", "index_analyze_in_terra_requested"],
            },
            {
                "label": "Dataset Export Requests",
                "event_keys": ["dataset_bulk_download_requested", "dataset_file_manifest_requested", "dataset_analyze_in_terra_requested"],
            },
        ],
        "file_downloads_position": 3,
        "event_counts": [
            {"label": "Export to Terra\n(Single Dataset)", "event_key": "dataset_analyze_in_terra_requested"},
            {"label": "Export to Terra\n(Cross-Dataset)", "event_key": "index_analyze_in_terra_requested"},
            {"label": "curl Command\n(Single Dataset)", "event_key": "dataset_bulk_download_requested"},
            {"label": "curl Command\n(Cross-Dataset)", "event_key": "index_bulk_download_requested"},
            {"label": "File Manifest\n(Single Dataset)", "event_key": "dataset_file_manifest_requested"},
            {"label": "File Manifest\n(Cross-Dataset)", "event_key": "index_file_manifest_requested"},
        ],
    },
    property_id=ANVIL_EXPLORER_ID,
    current_month=CURRENT_MONTH,
    analytics_start=ANALYTICS_START,
    output_dir="./site",
    custom_events=[
        {"event_name": "filter_selected", "label": "Filter Selections"},
        {
            "event_name": "bulk_download_requested",
            "key": "index_bulk_download_requested",
            "label": "Cohort curl Download Requests",
            "page_path_regex": r"^(?!/datasets/[0-9a-f-]+)",
        },
        {
            "event_name": "index_file_manifest_requested",
            "label": "Cohort File Manifest Requests",
        },
        {
            "event_name": "index_analyze_in_terra_requested",
            "label": "Cohort Analyze in Terra Requests",
        },
        {
            "event_name": "dataset_analyze_in_terra_requested",
            "label": "Dataset Analyze in Terra Requests",
            "detail_table": True,
        },
        {
            "event_name": "bulk_download_requested",
            "key": "dataset_bulk_download_requested",
            "label": "Dataset curl Download Requests",
            "page_path_regex": r"^/datasets/[0-9a-f-]+",
            "detail_table": True,
        },
        {
            "event_name": "dataset_file_manifest_requested",
            "label": "Dataset File Manifest Requests",
            "detail_table": True,
        },
    ],
    title_resolver=resolve_dataset_titles,
    access_request_urls=["duos.org", "dbgap.ncbi.nlm.nih.gov"],
)
