# Static Analytics Site Generator

Generates static HTML dashboards from GA4 data for data-browser apps. Each app (AnVIL Explorer, AnVIL Catalog, HCA Data Explorer, LungMAP) has its own `generate_static_site.py` script that calls the shared `generate_site()` function with app-specific configuration.

## Prerequisites

1. **Python virtual environment**:
   ```
   cd analytics
   source ./venv/bin/activate
   pip install -e ./analytics_package/
   ```

2. **OAuth credentials**: Place the GA4 OAuth client secret JSON file in `.credentials/` at the repo root:
   - `.credentials/anvil_ga4_credentials.json` — AnVIL Explorer and AnVIL Catalog
   - `.credentials/hca_ga4_credentials.json` — HCA Data Explorer and LungMAP

## Generating a site

From the app's analytics directory, run:

```
cd analytics
source ./venv/bin/activate
cd anvil-explorer-sheets    # or anvil-catalog-sheets, hca-explorer-sheets, lungmap-analytics/sheets
python generate_static_site.py
```

A browser window will open for Google OAuth. After authenticating, the script fetches data from GA4 and writes the site to `./site/`.

To view locally:

```
cd site && python -m http.server 8080
```

Then open http://localhost:8080.

## Updating the report month

Each app has a `constants.py` file with `CURRENT_MONTH` (e.g., `"2026-03"`). Update this value before generating a new report.

## Architecture

### Shared package (`analytics/analytics_package/analytics/static_site/`)

| File | Purpose |
|------|---------|
| `generator.py` | Orchestrates fetch, title resolution, template copy, and data export |
| `fetch.py` | Fetches GA4 data: traffic, pageviews, outbound links, filter selections, sessions, engagement rate, custom events, file downloads, and access requests |
| `export.py` | Exports DataFrames and dicts to JSON files in `site/data/` |
| `resolve.py` | Resolves entity UUIDs to titles via catalog APIs (AnVIL, HCA/LungMAP Azul) |
| `template/index.html` | Config-driven HTML template with Chart.js charts and data tables |

### Per-app scripts

| App | Script | Credentials | Catalog API |
|-----|--------|-------------|-------------|
| AnVIL Explorer | `anvil-explorer-sheets/generate_static_site.py` | `anvil_ga4_credentials.json` | `service.explore.anvilproject.org/index/datasets` |
| AnVIL Catalog | `anvil-catalog-sheets/generate_static_site.py` | `anvil_ga4_credentials.json` | — |
| HCA Data Explorer | `hca-explorer-sheets/generate_static_site.py` | `hca_ga4_credentials.json` | `service.azul.data.humancellatlas.org/index/projects` |
| LungMAP | `lungmap-analytics/sheets/generate_static_site.py` | `hca_ga4_credentials.json` | `service.azul.data.humancellatlas.org/index/projects` (catalog=lm10) |

### Configuration

Each script passes a `config` dict that controls branding and dashboard features:

- `site_title` — page heading and browser title
- `logo_url`, `logo_link`, `favicon_url` — header branding
- `primary_color`, `primary_color_dark` — theme colors
- `summary_stats` — top-level stat cards aggregating multiple events
- `event_counts` — key metric count cards with labels (supports `\n` for line breaks)
- `file_downloads_position` — position of the file downloads card within detail tables
- `custom_events` — list of GA4 events to track, with optional `detail_table`, `page_path_regex`, and `key` for disambiguation
- `access_request_urls` — URL patterns for tracking outbound access requests (AnVIL only)

### Title resolution

For apps with dataset/project detail tables, a `title_resolver` callback enriches records with human-readable names by querying the app's catalog API. This happens in-memory before data is written to disk.

### Output structure

```
site/
├── index.html          # Dashboard (copied from template)
└── data/
    ├── config.json
    ├── meta.json
    ├── monthly_traffic.json
    ├── pageviews.json
    ├── outbound_links.json
    ├── filter_selected.json
    ├── file_downloads.json
    ├── custom_events.json
    ├── access_requests.json          # AnVIL only
    └── event_*_detail.json           # Per-event detail tables
```
