from setuptools import setup

setup(
	name="analytics",
	version="1.4",
	packages=["analytics"],
	install_requires=["matplotlib", "pandas", "numpy", "google-auth-oauthlib", "google-api-python-client"],
)