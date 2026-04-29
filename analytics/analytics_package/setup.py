from setuptools import setup

setup(
	name="analytics",
	version="4.3.0",
	packages=["analytics", "analytics.static_site"],
	package_data={"analytics.static_site": ["template/*.html"]},
	install_requires=["matplotlib", "pandas", "numpy", "google-auth-oauthlib", "google-api-python-client", "gspread", "gspread-formatting"],
)