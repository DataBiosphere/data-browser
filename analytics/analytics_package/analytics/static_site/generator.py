"""Generate a static analytics site from GA4 data."""

import os
import shutil

from .fetch import fetch_data
from .export import export_data

TEMPLATE_DIR = os.path.join(os.path.dirname(__file__), "template")


def generate_site(
    ga_authentication,
    config,
    property_id,
    current_month,
    analytics_start,
    output_dir="site",
    custom_events=None,
    historic_data_path=None,
    title_resolver=None,
    access_request_urls=None,
):
    """Generate a static analytics site.

    Args:
        ga_authentication: GA4 authentication object from analytics.api.authenticate.
        config: Site config dict with keys:
            - site_title: Display title (e.g., "AnVIL Catalog").
            - logo_url: URL to the logo image.
            - logo_link: URL the logo links to.
            - primary_color: Primary color hex (e.g., "#035C94").
            - primary_color_dark: Darker primary color hex.
        property_id: GA4 property ID.
        current_month: Current month string (YYYY-MM).
        analytics_start: Start date for all-time data (YYYY-MM-DD).
        output_dir: Output directory for the generated site.
        custom_events: List of dicts with "event_name" and "label" keys.
            Example: [{"event_name": "chat_submitted", "label": "Chat Submissions"}]
        historic_data_path: Path to historic UA data JSON file (optional).
        title_resolver: Optional callable that accepts the data dict and enriches
            detail records with resolved entity titles (e.g., dataset/project names).
    """
    if custom_events is None:
        custom_events = []

    print("=" * 50)
    print(f"Generating analytics site: {config['site_title']}")
    print("=" * 50)
    print()

    data = fetch_data(
        ga_authentication=ga_authentication,
        property_id=property_id,
        current_month=current_month,
        analytics_start=analytics_start,
        custom_events=custom_events,
        historic_data_path=historic_data_path,
        access_request_urls=access_request_urls,
    )

    if title_resolver:
        print("Resolving entity titles...")
        title_resolver(data)

    os.makedirs(output_dir, exist_ok=True)
    template_html = os.path.join(TEMPLATE_DIR, "index.html")
    output_html = os.path.join(output_dir, "index.html")
    shutil.copy2(template_html, output_html)
    print(f"Copied template to {output_html}")

    data_dir = os.path.join(output_dir, "data")
    export_data(
        data=data,
        config=config,
        current_month=current_month,
        analytics_start=analytics_start,
        custom_events=custom_events,
        output_dir=data_dir,
    )

    print("\n" + "=" * 50)
    print("Static site generation complete!")
    print(f"Files written to: {os.path.abspath(output_dir)}")
    print("\nTo view the site locally, run:")
    print(f"  cd {output_dir} && python -m http.server 8080")
    print("Then open http://localhost:8080 in your browser.")
