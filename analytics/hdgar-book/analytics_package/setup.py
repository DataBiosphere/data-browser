from setuptools import setup

setup(
	name="analytics",
	version="1.0",
	package_dir={"analytics": ""},
	py_modules=["analytics.charts", "analytics.api"],
	install_requires=["matplotlib", "pandas", "numpy", "google-auth-oauthlib", "google-api-python-client"],
)