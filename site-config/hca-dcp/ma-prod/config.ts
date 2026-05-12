import { GIT_HUB_REPO_URL } from "../../common/constants";
import { makeConfig } from "../ma-dev/config";
import { getAuthentication } from "./authentication/authentication";

// Template constants
const BROWSER_URL = "https://explore.data.humancellatlas.org";
const CATALOG = "dcp59";
export const DATA_URL = "https://service.azul.data.humancellatlas.org";
export const PORTAL_URL = "https://data.humancellatlas.org";

const config = makeConfig(
  BROWSER_URL,
  PORTAL_URL,
  DATA_URL,
  GIT_HUB_REPO_URL,
  CATALOG,
  getAuthentication()
);

// Configure analytics for the prod environment.
config.analytics = {
  gtmAuth: "xm3qglWPEFim7Lb4AxXnsA",
  gtmId: "GTM-M2J5NTJ",
  gtmPreview: "env-2",
};

export default config;
