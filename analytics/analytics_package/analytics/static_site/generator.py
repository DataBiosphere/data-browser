"""Generate a static analytics site from GA4 data."""

import html
import re
import shutil
from pathlib import Path

from .export import export_data
from .fetch import fetch_data

TEMPLATE_DIR = Path(__file__).parent / "template"
STYLESHEET = "analytics.css"


def generate_site(
    ga_authentication,
    config,
    property_id,
    current_month,
    analytics_start,
    output_dir="site",
    custom_events=None,
    event_charts=None,
    historic_data_path=None,
    title_resolver=None,
    access_request_urls=None,
    exclude_pages=None,
    base_dimension_filter=None,
    search_path=None,
    exclude_dates=None,
):
    """Generate a static analytics site.

    Args:
        ga_authentication: GA4 authentication object from analytics.api.authenticate.
        config: Site config dict with keys:
            - site_title: Display title (e.g., "AnVIL Catalog").
            - logo_url: URL to the logo image.
            - logo_link: URL the logo links to.
            - logo_width, logo_height: Optional logo size in px, as shown in the
              app's header; sets the <img> size and --fui-header-logo-height.
            - extra_css: Optional CSS added to the page's <head>, e.g. a
              per-breakpoint --fui-header-logo-height override.
            - primary_color: Primary color hex (e.g., "#035C94").
            - primary_color_dark: Darker primary color hex.
        property_id: GA4 property ID.
        current_month: Current month string (YYYY-MM).
        analytics_start: Start date for all-time data (YYYY-MM-DD).
        output_dir: Output directory for the generated site, as a str or Path.
        custom_events: List of dicts with "event_name" and "label" keys.
            Example: [{"event_name": "chat_submitted", "label": "Chat Submissions"}]
        historic_data_path: Path to historic UA data JSON file (optional).
        title_resolver: Optional callable that accepts the data dict and enriches
            detail records with resolved entity titles (e.g., dataset/project names).
        exclude_pages: Optional list of page paths to exclude from pageview data.
        base_dimension_filter: Optional GA4 dimension filter dict applied to all queries
            (e.g., an audience filter to exclude bot/tutorial traffic).
        search_path: Optional search page path to extract search queries from (e.g., "/search").
        exclude_dates: Optional list of dates (YYYY-MM-DD) to exclude from all queries,
            e.g. days with known synthetic/bot traffic. Applies to GA4 queries only,
            not to data merged from historic_data_path.
    """
    if custom_events is None:
        custom_events = []
    output_dir = Path(output_dir)

    print("=" * 50)
    print(f"Generating analytics site: {config['site_title']}")
    print("=" * 50)
    print()

    write_page(config, output_dir)

    data = fetch_data(
        ga_authentication=ga_authentication,
        property_id=property_id,
        current_month=current_month,
        analytics_start=analytics_start,
        custom_events=custom_events,
        event_charts=event_charts,
        historic_data_path=historic_data_path,
        access_request_urls=access_request_urls,
        exclude_pages=exclude_pages,
        base_dimension_filter=base_dimension_filter,
        search_path=search_path,
        exclude_dates=exclude_dates,
    )

    if title_resolver:
        print("Resolving entity titles...")
        title_resolver(data)

    data_dir = output_dir / "data"
    export_data(
        data=data,
        config=config,
        current_month=current_month,
        analytics_start=analytics_start,
        custom_events=custom_events,
        output_dir=data_dir,
        event_charts=event_charts,
    )

    print("\n" + "=" * 50)
    print("Static site generation complete!")
    print(f"Files written to: {output_dir.resolve()}")
    print("\nTo view the site locally, run:")
    print(f"  cd {output_dir} && python -m http.server 8080")
    print("Then open http://localhost:8080 in your browser.")


def render_page(config):
    """Render index.html with the config's branding built in, for first paint.

    Args:
        config: Site config dict, as passed to generate_site.

    Returns:
        The rendered index.html as a str.
    """
    logo_width = config.get("logo_width")
    logo_height = config.get("logo_height")
    if (logo_width is None) != (logo_height is None):
        raise ValueError("Set both logo_width and logo_height, or neither")
    logo_size = ""
    if logo_height is not None:
        logo_size = f' width="{logo_width}" height="{logo_height}"'
    root_vars = {
        "--fui-header-logo-height": logo_height and f"{logo_height}px",
        "--fui-primary": config.get("primary_color"),
        "--fui-primary-dark": config.get("primary_color_dark"),
    }
    declarations = " ".join(f"{k}: {v};" for k, v in root_vars.items() if v)
    head_css = [f":root {{ {declarations} }}"] if declarations else []
    if config.get("extra_css"):
        head_css.append(config["extra_css"])
    replacements = {
        "favicon_url": html.escape(config.get("favicon_url") or ""),
        "head_css": "\n".join(head_css),
        "logo_link": html.escape(config.get("logo_link") or "#"),
        "logo_size": logo_size,
        "logo_url": html.escape(config.get("logo_url") or ""),
        "site_title": html.escape(config.get("site_title") or "Analytics"),
    }
    page = (TEMPLATE_DIR / "index.html").read_text(encoding="utf-8")
    unknown = set(re.findall(r"\{\{(\w+)\}\}", page)) - replacements.keys()
    if unknown:
        raise ValueError(f"Unknown template tokens: {sorted(unknown)}")
    return re.sub(r"\{\{(\w+)\}\}", lambda match: replacements[match[1]], page)


def write_page(config, output_dir):
    """Write the rendered index.html and its stylesheet to output_dir.

    Args:
        config: Site config dict, as passed to generate_site.
        output_dir: Output directory for the site, as a str or Path.
    """
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    output_html = output_dir / "index.html"
    output_html.write_text(render_page(config), encoding="utf-8")
    shutil.copy2(TEMPLATE_DIR / STYLESHEET, output_dir / STYLESHEET)
    print(f"Wrote {output_html} and {STYLESHEET}")
