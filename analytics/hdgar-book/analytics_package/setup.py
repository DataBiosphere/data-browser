from setuptools import setup

setup(
	name="analytics",
	version="1.5.2",
	packages=["analytics"],
	install_requires=["matplotlib", "pandas", "numpy", "google-auth-oauthlib", "google-api-python-client"],
)