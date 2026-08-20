## Installing the environment

Dependencies are managed with [uv](https://docs.astral.sh/uv/), and pinned in `uv.lock`.

- Install uv, e.g. with `brew install uv` or `curl -LsSf https://astral.sh/uv/install.sh | sh`.
- From this folder, run `uv sync`. This creates `./.venv`, provisions the Python version given in
  `.python-version`, and installs the `analytics_package` in editable mode along with its dependencies.

There's no need to activate the environment: prefixing a command with `uv run` runs it in the
environment, re-syncing first if the lockfile has changed. If you'd rather activate it anyway, run
`source ../.venv/bin/activate` from an app subfolder (or `source ./.venv/bin/activate` from here), and
`deactivate` to exit.

To change the package's dependencies, edit `analytics_package/pyproject.toml` and run `uv lock` to
update `uv.lock`.

## Linting and formatting

Linting and formatting are handled by [ruff](https://docs.astral.sh/ruff/), configured in
`pyproject.toml` and enforced by the `analytics` job in `run-checks.yml`. From this folder:

- `uv run ruff check .` to lint, or `uv run ruff check --fix .` to apply the automatic fixes.
- `uv run ruff format .` to format, or `uv run ruff format --check .` to check without writing.

The NPM scripts `lint:python`, `format:python`, and `check-format:python` can also be used as shortcuts.

## Generating reports for the static site

Each app-specific analytics subfolder (e.g. `anvil-explorer`, `hca-explorer`, `lungmap`) contains a script that can be run to generate a report for the static site. To run these scripts:

- Navigate to the desired subfolder.
- Ensure that Google Analytics API credentials are available via either:
  - Preferred: The default credentials file defined in the folder's `generate_static_site.py`, which will be one of the following files relative to the repository root:
    - `.credentials/anvil_ga4_credentials.json`, for AnVIL Explorer and AnVIL Catalog.
    - `.credentials/hca_ga4_credentials.json`, for HCA Data Explorer and LungMAP.
  - Alternatively: A path set in the environment variable specified by the `SECRET_NAME` variable in the folder's `constants.py`.
- Update the `CURRENT_MONTH` variable in the folder's `constants.py` to the month you wish to generate the report for.
- From within the folder, run `uv run python generate_static_site.py`.

A browser window will open for Google OAuth. After authenticating, the script fetches data from GA4 and writes the site to the configured folder. With the exception of `anvil-catalog` (which is a retired app and writes to `anvil-catalog/site`), this will be a subfolder of `gh-pages` under the repository root.

To view the full static site locally after generating a report:

```
cd ../../gh-pages && python -m http.server 8080
```

Then open http://localhost:8080.
