from setuptools import setup

setup(
	name="analytics",
	version="1.7.1",
	packages=["analytics"],
	install_requires=["matplotlib", "pandas", "numpy", "google-auth-oauthlib", "google-api-python-client"],
)