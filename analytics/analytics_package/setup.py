from setuptools import setup

setup(
    name="analytics",
    version="5.0.4",
    packages=["analytics", "analytics.static_site"],
    package_data={"analytics.static_site": ["template/*.html"]},
    install_requires=[
        "pandas>=3,<4",
        "numpy",
        "google-auth-oauthlib",
        "google-api-python-client",
        "requests",
    ],
)
