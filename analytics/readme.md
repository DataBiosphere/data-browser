## Installing the environment
- Use Python 3.12.4
- Run `python -m venv ./venv` to create a new environment under `./venv`
- Run `source ./venv/bin/activate` to activate the environment
- Run `pip install -r ./requirements.txt` to install requirements
- To make the environment available as an option for notebooks, run `ipython kernel install --user --name=hca-analytics`

## Deactivating/reactivating
- To deactivate the environment, run `deactivate`
- To activate the environment again, run `source ./venv/bin/activate`