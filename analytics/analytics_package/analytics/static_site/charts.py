"""Shared chart configuration for static analytics sites."""


def make_event_charts(entity_label, entity_path, chart_start):
    """Build the standard event_charts config for a static analytics site.

    Args:
        entity_label: Display label for the entity type (e.g., "Dataset" or "Project").
        entity_path: URL path segment for entities (e.g., "/datasets" or "/projects").
        chart_start: Start date for chart data (YYYY-MM-DD).

    Returns:
        Dict with "chart_start" and "charts" keys, ready to pass to generate_site.
    """
    path_segment = entity_path.strip("/")
    return {
        "chart_start": chart_start,
        "charts": [
            {
                "title": "Export to Terra",
                "series": [
                    {"label": f"Single {entity_label}", "event_key": "dataset_analyze_in_terra_requested", "event_name": "dataset_analyze_in_terra_requested"},
                    {"label": "Cross-Dataset", "event_key": "index_analyze_in_terra_requested", "event_name": "index_analyze_in_terra_requested"},
                ],
            },
            {
                "title": "curl Command",
                "series": [
                    {"label": f"Single {entity_label}", "event_key": "dataset_bulk_download_requested", "event_name": "bulk_download_requested", "page_path_regex": rf"^/{path_segment}/[0-9a-f-]+"},
                    {"label": "Cross-Dataset", "event_key": "index_bulk_download_requested", "event_name": "bulk_download_requested", "page_path_regex": rf"^(?!/{path_segment}/[0-9a-f-]+)"},
                ],
            },
            {
                "title": "File Manifest",
                "series": [
                    {"label": f"Single {entity_label}", "event_key": "dataset_file_manifest_requested", "event_name": "dataset_file_manifest_requested"},
                    {"label": "Cross-Dataset", "event_key": "index_file_manifest_requested", "event_name": "index_file_manifest_requested"},
                ],
            },
        ],
    }
