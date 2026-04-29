"""Resolve entity UUIDs to titles via catalog APIs."""

import re

import requests


def fetch_entity_title_map(api_url, entity_key, title_key, page_size=50, catalog=None):
    """Fetch all entities from a catalog API and return a mapping of entryId to title.

    Args:
        api_url: Full API URL (e.g., "https://service.azul.data.humancellatlas.org/index/projects").
        entity_key: Key in each hit containing entity list (e.g., "projects", "datasets").
        title_key: Key within each entity for the title (e.g., "projectTitle", "title").
        page_size: Number of results per page.

    Returns:
        Dict mapping entryId to title string.
    """
    title_map: dict[str, str] = {}
    url: str | None = api_url
    params: dict | None = {"size": page_size}
    if catalog:
        params["catalog"] = catalog
    while url is not None:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        for hit in data["hits"]:
            entry_id = hit.get("entryId")
            entities = hit.get(entity_key, [])
            if entry_id and entities:
                title = entities[0].get(title_key, "")
                if title:
                    title_map[entry_id] = title
        url = data.get("pagination", {}).get("next")
        params = None
    return title_map


def enrich_detail_records(data, title_map, path_pattern):
    """Enrich in-memory detail records with resolved titles.

    Args:
        data: The data dict from fetch_data, containing event detail lists.
        title_map: Dict mapping entity UUIDs to titles.
        path_pattern: Regex pattern with one capture group for the UUID
            (e.g., r"/projects/([0-9a-f-]+)").

    Returns:
        Number of records enriched.
    """
    pattern = re.compile(path_pattern)
    enriched = 0

    # Enrich dataset-level detail tables
    for key, records in data.items():
        if not key.endswith("_detail") or not isinstance(records, list):
            continue
        if not key.startswith("event_dataset_"):
            continue
        for record in records:
            match = pattern.search(record.get("page_path", ""))
            if match:
                uuid = match.group(1)
                record["dataset_title"] = title_map.get(uuid, uuid)
                enriched += 1

    # Enrich access request records
    for record in data.get("access_requests", []):
        match = pattern.search(record.get("page_path", ""))
        if match:
            uuid = match.group(1)
            record["dataset_title"] = title_map.get(uuid, uuid)
            enriched += 1
    return enriched
