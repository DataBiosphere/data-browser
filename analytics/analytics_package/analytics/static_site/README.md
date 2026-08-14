# Static Analytics Site Generator

Generates static HTML dashboards from GA4 data for data-browser apps. Each app (e.g. AnVIL Explorer, AnVIL Catalog, HCA Data Explorer, LungMAP) has its own `generate_static_site.py` script that calls the shared `generate_site()` function with app-specific configuration.

See the [repository's main analytics readme](../../../readme.md) for details on the generator implementations for the actual apps.

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

Located in subfolders of the repository's `analytics` directory.

### Configuration

Each script passes a `config` dict and additional `generate_site()` parameters:

**Config dict** (controls branding and dashboard features):
- `site_title` — page heading and browser title
- `logo_url`, `logo_link`, `favicon_url` — header branding
- `primary_color`, `primary_color_dark` — theme colors
- `entity_label`, `entity_path` — entity type label ("Dataset" or "Project") and URL path prefix
- `summary_stats` — top-level stat cards aggregating multiple events
- `event_counts` — key metric count cards with labels (supports `\n` for line breaks)
- `file_downloads_position` — position of the file downloads card within detail tables

**`generate_site()` parameters** (passed alongside config):
- `custom_events` — list of GA4 events to track, with optional `detail_table`, `page_path_regex`, and `key` for disambiguation
- `access_request_urls` — URL patterns for tracking outbound access requests (AnVIL only)
- `title_resolver` — callback to enrich detail records with entity titles
- `historic_data_path` — path to pre-GA4 data (optional)

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
