#!/usr/bin/env python3
"""Generate static analytics site for HCA Data Explorer."""

import os

import analytics.api as ga
from analytics.static_site import generate_site, fetch_entity_title_map, enrich_detail_records
from constants import CURRENT_MONTH, HCA_ID, SECRET_NAME, ANALYTICS_START, OAUTH_PORT, HCA_BROWSER_ONLY_FILTER

AZUL_PROJECTS_URL = "https://service.azul.data.humancellatlas.org/index/projects"

os.environ.setdefault(SECRET_NAME, "../../.credentials/hca_ga4_credentials.json")

ga_authentication = ga.authenticate(
    SECRET_NAME,
    ga.ga4_service_params,
    port=OAUTH_PORT,
)


def resolve_project_titles(data):
    title_map = fetch_entity_title_map(AZUL_PROJECTS_URL, "projects", "projectTitle")
    count = enrich_detail_records(data, title_map, r"/projects/([0-9a-f-]+)")
    print(f"  Enriched {count} records with project titles")


generate_site(
    ga_authentication=ga_authentication,
    config={
        "site_title": "HCA Data Explorer User Analytics",
        "logo_url": "https://explore.data.humancellatlas.org/images/hcaExplorer.png",
        "favicon_url": "https://explore.data.humancellatlas.org/favicons/favicon.ico",
        "logo_link": "https://explore.data.humancellatlas.org",
        "primary_color": "#1C7CC7",
        "primary_color_dark": "#005EA9",
        "entity_label": "Project",
        "entity_path": "/projects",
        "summary_stats": [
            {
                "label": "Cohort Export Requests",
                "event_keys": ["index_bulk_download_requested", "index_file_manifest_requested", "index_analyze_in_terra_requested"],
            },
            {
                "label": "Project Export Requests",
                "event_keys": ["dataset_bulk_download_requested", "dataset_file_manifest_requested", "dataset_analyze_in_terra_requested"],
            },
        ],
        "file_downloads_position": 3,
        "event_counts": [
            {"label": "Export to Terra\n(Single Project)", "event_key": "dataset_analyze_in_terra_requested"},
            {"label": "Export to Terra\n(Cross-Dataset)", "event_key": "index_analyze_in_terra_requested"},
            {"label": "curl Command\n(Single Project)", "event_key": "dataset_bulk_download_requested"},
            {"label": "curl Command\n(Cross-Dataset)", "event_key": "index_bulk_download_requested"},
            {"label": "File Manifest\n(Single Project)", "event_key": "dataset_file_manifest_requested"},
            {"label": "File Manifest\n(Cross-Dataset)", "event_key": "index_file_manifest_requested"},
        ],
    },
    property_id=HCA_ID,
    current_month=CURRENT_MONTH,
    analytics_start=ANALYTICS_START,
    output_dir="./site",
    custom_events=[
        {"event_name": "filter_selected", "label": "Filter Selections"},
        {
            "event_name": "bulk_download_requested",
            "key": "index_bulk_download_requested",
            "label": "Cohort curl Download Requests",
            "page_path_regex": r"^(?!/projects/[0-9a-f-]+)",
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
            "label": "Project Analyze in Terra Requests",
            "detail_table": True,
        },
        {
            "event_name": "bulk_download_requested",
            "key": "dataset_bulk_download_requested",
            "label": "Project curl Download Requests",
            "page_path_regex": r"^/projects/[0-9a-f-]+",
            "detail_table": True,
        },
        {
            "event_name": "dataset_file_manifest_requested",
            "label": "Project File Manifest Requests",
            "detail_table": True,
        },
    ],
    title_resolver=resolve_project_titles,
    base_dimension_filter=HCA_BROWSER_ONLY_FILTER,
)
