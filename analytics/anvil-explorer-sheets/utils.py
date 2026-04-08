import re

import pandas as pd
import requests

from analytics.entities import DIMENSION_PAGE_PATH

ANVIL_DATASETS_API_URL = "https://service.explore.anvilproject.org/index/datasets"
DATASETS_PATH_PATTERN = re.compile(r"^/datasets/([^/]+)")
INSERT_AFTER_COLUMN = DIMENSION_PAGE_PATH["alias"]
PAGE_PATH_COLUMN = DIMENSION_PAGE_PATH["alias"]
DATASET_TITLE_COLUMN = "Dataset Title"


def fetch_dataset_title_map() -> dict[str, str]:
  """Fetch all datasets from the AnVIL API and return a mapping of entryId to title.

  Paginates through the full catalog using the API's ``pagination.next`` URL.
  """
  title_map: dict[str, str] = {}
  url: str | None = ANVIL_DATASETS_API_URL
  params: dict[str, int] | None = {"size": 1000}
  while url is not None:
    response = requests.get(url, params=params)
    response.raise_for_status()
    data = response.json()
    for hit in data["hits"]:
      entry_id = hit.get("entryId")
      datasets = hit.get("datasets", [])
      if entry_id and datasets:
        title = datasets[0].get("title", "")
        if title:
          title_map[entry_id] = title
    url = data.get("pagination", {}).get("next")
    params = None  # subsequent URLs already include query params
  return title_map


def add_dataset_titles(df: pd.DataFrame, title_map: dict[str, str] | None = None) -> pd.DataFrame:
  """Add a 'Dataset Title' column to a pageviews dataframe.

  For rows where the page path matches /datasets/[id], the title is looked up
  from the AnVIL API. All other rows get "N/A".

  Args:
    df: A dataframe containing a "Page Path" column.
    title_map: Optional pre-fetched ID-to-title mapping.

  Returns:
    A copy of the dataframe with a "Dataset Title" column inserted
    after the column specified by the INSERT_AFTER_COLUMN global variable.
  """
  if title_map is None:
    title_map = fetch_dataset_title_map()
  df = df.copy()

  def get_title(path: str) -> str:
    match = DATASETS_PATH_PATTERN.match(path)
    if match:
      entry_id = match.group(1)
      return title_map.get(entry_id, "N/A")
    return "N/A"

  df[DATASET_TITLE_COLUMN] = df[PAGE_PATH_COLUMN].map(get_title)

  # Insert the title column right after the configured column
  after_col_idx = list(df.columns).index(INSERT_AFTER_COLUMN)
  cols = list(df.columns)
  cols.remove(DATASET_TITLE_COLUMN)
  cols.insert(after_col_idx + 1, DATASET_TITLE_COLUMN)
  df = df[cols]

  return df
