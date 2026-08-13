import requests

ANVIL_DATASETS_API_URL = "https://service.explore.anvilproject.org/index/datasets"

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
    params = None
  return title_map
