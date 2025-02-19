from setuptools import setup

setup(
	name="analytics",
	version="4.0.0",
	packages=["analytics"],
	install_requires=["matplotlib", "pandas", "numpy", "google-auth-oauthlib", "google-api-python-client", "gspread", "gspread-formatting"],
)