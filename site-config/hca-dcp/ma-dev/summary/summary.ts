import { SiteConfig } from "../../../common/entities";
import { buildSummaries } from "./viewModelBuilder";

export const SUMMARY: SiteConfig["summaryConfig"] = {
  apiPath: "index/summary",
  mapResponse: buildSummaries,
};
