## Installing the environment

- Use Python 3.12.4
- Run `python -m venv ./venv` to create a new environment under `./venv`
- Run `source ./venv/bin/activate` to activate the environment
- Run `pip install -r ./requirements.txt` to install requirements

## Deactivating/reactivating

- To deactivate the environment, run `deactivate`
- To activate the environment again, run `source ./venv/bin/activate`

## Generating reports for the static site

Each site-specific analytics subfolder contains a script that can be run to generate a report for the static site. To run these scripts:

- Navigate to the desired subfolder.
- Ensure that Google Analytics API credentials are available via either:
  - A path set in the environment variable specified by the `SECRET_NAME` variable in the folder's `constants.py`.
  - The default credentials file defined in the folder's `generate_static_site.py`.
- Update the `CURRENT_MONTH` variable in the folder's `constants.py` to the month you wish to generate the report for.
- From within the folder, run `python generate_static_site.py`.
