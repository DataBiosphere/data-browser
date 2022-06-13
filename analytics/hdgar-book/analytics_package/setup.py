from setuptools import setup

setup(
	name="analytics",
	version="1.0",
	py_modules=["charts", "api"],
	install_requires=["matplotlib", "pandas", "numpy", "google-auth-oauthlib", "google-api-python-client"],
)