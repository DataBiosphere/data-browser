import { EntityConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { PROJECT_ENTITY_ROUTE } from "./routes";
import { EXPORT } from "./tab/export";
import { mainColumn as matricesMainColumn } from "./tab/matricesMainColumn";
import { METADATA } from "./tab/metadata";
import { mainColumn as overviewMainColumn } from "./tab/overviewMainColumn";
import { sideColumn as overviewSideColumn } from "./tab/overviewSideColumn";
import { PROJECT_FILES } from "./tab/projectFiles";
import { top } from "./tab/top";

export const DETAIL: EntityConfig["detail"] = {
  detailOverviews: ["Overview"],
  staticLoad: true,
  tabs: [
    {
      label: "Overview",
      mainColumn: overviewMainColumn,
      route: PROJECT_ENTITY_ROUTE.OVERVIEW,
      sideColumn: overviewSideColumn,
    },
    {
      label: "Metadata",
      mainColumn: METADATA,
      route: PROJECT_ENTITY_ROUTE.PROJECT_METADATA,
    },
    {
      label: "Matrices",
      mainColumn: matricesMainColumn,
      route: PROJECT_ENTITY_ROUTE.PROJECT_MATRICES,
    },
    {
      label: "Download",
      mainColumn: PROJECT_FILES,
      route: PROJECT_ENTITY_ROUTE.GET_CURL_COMMAND,
    },
    {
      label: "Export",
      mainColumn: EXPORT,
      route: PROJECT_ENTITY_ROUTE.EXPORT_TO_TERRA,
    },
  ],
  top: top,
};
