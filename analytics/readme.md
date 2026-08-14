## Installing the environment

- Use Python 3.12.4.
- Run `python -m venv ./venv` to create a new environment under `./venv`.
- Run `source ./venv/bin/activate` to activate the environment.
- Run `pip install -r ./requirements.txt` to install requirements.

## Deactivating/reactivating

- To deactivate the environment, run `deactivate`.
- To activate the environment again, run `source ./venv/bin/activate`.

## Generating reports for the static site

Each app-specific analytics subfolder (e.g. `anvil-explorer`, `hca-explorer`, `lungmap`) contains a script that can be run to generate a report for the static site. To run these scripts:

- Navigate to the desired subfolder.
- Ensure that Google Analytics API credentials are available via either:
  - Preferred: The default credentials file defined in the folder's `generate_static_site.py`, which will be one of the following files relative to the repository root:
    - `.credentials/anvil_ga4_credentials.json`, for AnVIL Explorer and AnVIL Catalog.
    - `.credentials/hca_ga4_credentials.json`, for HCA Data Explorer and LungMAP.
  - Alternatively: A path set in the environment variable specified by the `SECRET_NAME` variable in the folder's `constants.py`.
- Update the `CURRENT_MONTH` variable in the folder's `constants.py` to the month you wish to generate the report for.
- From within the folder, run `python generate_static_site.py`.

A browser window will open for Google OAuth. After authenticating, the script fetches data from GA4 and writes the site to the configured folder. With the exception of `anvil-catalog` (which is a retired app and writes to `anvil-catalog/site`), this will be a subfolder of `gh-pages` under the repository root.

To view the full static site locally after generating a report:

```
cd ../../gh-pages && python -m http.server 8080
```

Then open http://localhost:8080.
