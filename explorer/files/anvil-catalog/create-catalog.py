import sys
from datetime import datetime
import requests
import pandas as pd

"""
Usage: `python create-catalog.py "$(gcloud auth print-access-token --scopes='openid')"
"""

def create_catalog(access_token):
  # TODO: is there a better way of identifying anvil datasets?
  rows = [create_catalog_row(dataset) for dataset in get_duos_datasets(access_token) if dataset["name"][:6].lower() == "anvil_"]
  catalog_df = pd.DataFrame(rows)
  catalog_df.set_index("name", inplace=True)
  file_name = "./files/dashboard-source-anvil.tsv"
  catalog_df.to_csv(file_name, sep="\t")

def create_catalog_row(dataset):
  study = dataset["study"]
  # TODO: make use of dataUse
  return {
    "name": dataset["name"],
    "status": None,
    "consortium": ", ".join(get_study_property(study, "collaboratingSites")), #TODO: how should the array be handled?
    "phsId": get_study_property(study, "dbGaPPhsID"),
    "library:dataUseRestriction": None,
    "library:indication": get_study_property(study, "phenotypeIndication"),
    "library:studyDesign": None,
    "library:datatype": ", ".join(study["dataTypes"]),
    "subjectCount": None,
    "bucketName": None,
    "sampleCount": None,
    "participantCount": get_dataset_property(dataset, "numberOfParticipants"),
    "familyCount": None,
    "discoveryCount": None,
    "bucketSize": None,
    "requestorPays": None,
    "NRES": None,
    "GRU": None,
    "HMB": None,
    "IRB": None,
    "PUB": None,
    "COL": None,
    "NPU": None,
    "MDS": None,
    "GSO": None,
    "DS": None,
    "diseaseText": None,
    "consentLongName": None,
    "consentTitle": None,
  }

def get_dataset_property(dataset, key):
  p = next((p for p in dataset["properties"] if p["schemaProperty"] == key), None)
  return p["propertyValue"] if p else None

def get_study_property(study, key):
  p = next((p for p in study["properties"] if p["key"] == key), None)
  return p["value"] if p else None

def get_duos_datasets(access_token):
  r = requests.get("https://consent.dsde-prod.broadinstitute.org/api/dataset/v2", headers={"Authorization": "Bearer " + access_token})
  return r.json()

create_catalog(sys.argv[-1])
