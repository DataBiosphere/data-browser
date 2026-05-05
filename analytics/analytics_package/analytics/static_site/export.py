"""Export analytics DataFrames to JSON files for the static site."""

import glob
import json
import os
from datetime import datetime

import pandas as pd

from ..entities import (
    DIMENSION_PAGE_PATH,
    DIMENSION_FILTER_NAME,
    DIMENSION_FILTER_VALUE,
    METRIC_EVENT_COUNT,
    METRIC_PAGE_VIEWS,
    SYNTHETIC_DIMENSION_CLICKED_LINK,
    SYNTHETIC_METRIC_CLICKS,
)
from .fetch import event_key


def export_df_as_json(df, col_map, change_col, filename, output_dir):
    """Export a DataFrame to JSON with column renaming and NaN handling.

    Args:
        df: Source DataFrame.
        col_map: Dict mapping source column names to output names.
        change_col: Source column name for the change metric (may be absent).
        filename: Output JSON filename.
        output_dir: Output directory.
    """
    if df is None or len(df) == 0:
        records = []
    else:
        export_cols = list(col_map.keys())
        output_names = list(col_map.values())
        if change_col is not None and change_col in df.columns:
            export_cols.append(change_col)
            output_names.append("change")

        export = df[export_cols].copy()
        export.columns = output_names

        for col in output_names:
            if col != "change" and export[col].dtype != object:
                export[col] = export[col].fillna(0).astype(int)

        records = export.to_dict(orient="records")
        for record in records:
            if pd.isna(record.get("change")):
                record["change"] = None

    with open(os.path.join(output_dir, filename), "w") as f:
        json.dump(records, f, indent=2)
    print(f"  Wrote {filename} ({len(records)} records)")


def export_data(data, config, current_month, analytics_start, custom_events, output_dir):
    """Export all analytics data to JSON files.

    Args:
        data: Dict containing DataFrames and stats from fetch_data.
        config: Site config dict (title, logo, colors).
        current_month: Current month string (YYYY-MM).
        analytics_start: Analytics start date string.
        custom_events: List of custom event dicts with results.
        output_dir: Output directory for JSON files.
    """
    os.makedirs(output_dir, exist_ok=True)

    for old_file in glob.glob(os.path.join(output_dir, "event_*_detail.json")):
        os.remove(old_file)

    df_monthly_traffic = data["monthly_traffic"]
    dates = data.get("dates", {})

    # Monthly traffic
    print("Exporting monthly traffic data...")
    traffic_data = df_monthly_traffic[["Month", "Users", "Total Pageviews"]].copy()
    traffic_data.columns = ["month", "users", "pageviews"]
    traffic_data["month"] = traffic_data["month"].astype(str)
    traffic_data["users"] = traffic_data["users"].fillna(0).astype(int)
    traffic_data["pageviews"] = traffic_data["pageviews"].fillna(0).astype(int)

    with open(os.path.join(output_dir, "monthly_traffic.json"), "w") as f:
        json.dump(traffic_data.to_dict(orient="records"), f, indent=2)
    print(f"  Wrote monthly_traffic.json ({len(traffic_data)} records)")

    # Pageviews
    print("Exporting pageviews data...")
    export_df_as_json(
        data["pageviews"],
        {DIMENSION_PAGE_PATH["alias"]: "page", METRIC_PAGE_VIEWS["alias"]: "views"},
        METRIC_PAGE_VIEWS["change_alias"],
        "pageviews.json",
        output_dir,
    )

    print("Exporting outbound links data...")
    export_df_as_json(
        data["outbound"],
        {SYNTHETIC_DIMENSION_CLICKED_LINK["alias"]: "link", SYNTHETIC_METRIC_CLICKS["alias"]: "clicks"},
        SYNTHETIC_METRIC_CLICKS["change_alias"],
        "outbound_links.json",
        output_dir,
    )

    print("Exporting filter selections data...")
    export_df_as_json(
        data.get("filter_selected"),
        {DIMENSION_FILTER_NAME["alias"]: "filterName", DIMENSION_FILTER_VALUE["alias"]: "filterValue", METRIC_EVENT_COUNT["alias"]: "count"},
        METRIC_EVENT_COUNT["change_alias"],
        "filter_selected.json",
        output_dir,
    )

    # File downloads
    print("Exporting file downloads data...")
    file_downloads = data.get("file_downloads", [])
    with open(os.path.join(output_dir, "file_downloads.json"), "w") as f:
        json.dump(file_downloads, f, indent=2)
    print(f"  Wrote file_downloads.json ({len(file_downloads)} records)")

    # Access requests
    print("Exporting access requests data...")
    access_requests = data.get("access_requests", [])
    with open(os.path.join(output_dir, "access_requests.json"), "w") as f:
        json.dump(access_requests, f, indent=2)
    print(f"  Wrote access_requests.json ({len(access_requests)} records)")

    # File download events (GA4 enhanced measurement)
    print("Exporting file download events data...")
    file_download_events = data.get("file_download_events", {"total": 0, "files": []})
    with open(os.path.join(output_dir, "file_download_events.json"), "w") as f:
        json.dump(file_download_events, f, indent=2)
    print(f"  Wrote file_download_events.json ({len(file_download_events.get('files', []))} files)")

    # Search queries
    print("Exporting search queries data...")
    search_queries = data.get("search_queries", {"total": 0, "queries": []})
    with open(os.path.join(output_dir, "search_queries.json"), "w") as f:
        json.dump(search_queries, f, indent=2)
    print(f"  Wrote search_queries.json ({len(search_queries.get('queries', []))} queries)")

    # Custom events
    print("Exporting custom events data...")
    events_output = []
    for event in custom_events:
        key = event_key(event)
        stats = data.get(f"event_{key}", {"current": 0, "prior": 0, "change": None})
        events_output.append({
            "event_name": key,
            "label": event["label"],
            **stats,
        })

    with open(os.path.join(output_dir, "custom_events.json"), "w") as f:
        json.dump(events_output, f, indent=2)
    print(f"  Wrote custom_events.json ({len(events_output)} events)")

    # Export detail tables for events that have them
    for event in custom_events:
        key = event_key(event)
        detail = data.get(f"event_{key}_detail")
        if detail is not None:
            filename = f"event_{key}_detail.json"
            with open(os.path.join(output_dir, filename), "w") as f:
                json.dump(detail, f, indent=2)
            print(f"  Wrote {filename} ({len(detail)} records)")

    # Config (for the HTML template)
    print("Exporting site config...")
    with open(os.path.join(output_dir, "config.json"), "w") as f:
        json.dump(config, f, indent=2)
    print("  Wrote config.json")

    # Metadata
    print("Exporting metadata...")
    meta = {
        "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "current_month": current_month,
        "current_month_start": dates.get("start_current", ""),
        "current_month_end": dates.get("end_current", ""),
        "prior_month_start": dates.get("start_prior", ""),
        "prior_month_end": dates.get("end_prior", ""),
        "analytics_start": analytics_start,
        "sessions": data.get("sessions", {}),
        "engagement_rate": data.get("engagement_rate", {}),
    }

    with open(os.path.join(output_dir, "meta.json"), "w") as f:
        json.dump(meta, f, indent=2)
    print("  Wrote meta.json")
