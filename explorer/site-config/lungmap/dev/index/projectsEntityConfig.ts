import { EntityConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { mainColumn as hcaMetadataMainColumn } from "../../../hca-dcp/dev/detail/project/metadataMainColumn";
import { sideColumn as hcaOverviewSideColumn } from "../../../hca-dcp/dev/detail/project/overviewSideColumn";
import { projectsEntityConfig as hcaProjectsEntity } from "../../../hca-dcp/dev/index/projectsEntityConfig";
import { mainColumn as exportMainColumn } from "../detail/project/exportMainColumn";
import { sideColumn as exportSideColumn } from "../detail/project/exportSideColumn";
import { getOverviewMainColumn } from "../detail/project/mainColumn";
import { mainColumn as matricesMainColumn } from "../detail/project/matricesMainColumn";
import { sideColumn as metadataSideColumn } from "../detail/project/metadataSideColumn";
import { mainColumn as projectFilesMainColumn } from "../detail/project/projectFilesMainColumn";
import { sideColumn as projectFilesSideColumn } from "../detail/project/projectFilesSideColumn";

/**
 * Entity config object responsible to config anything related to the /projects route.
 */
export const projectsEntityConfig: EntityConfig = {
  ...hcaProjectsEntity,
  detail: {
    ...hcaProjectsEntity.detail,
    tabs: [
      {
        label: "Overview",
        mainColumn: getOverviewMainColumn(),
        route: "",
        sideColumn: hcaOverviewSideColumn,
      },
      {
        label: "Metadata",
        mainColumn: hcaMetadataMainColumn,
        route: "project-metadata",
        sideColumn: metadataSideColumn,
      },
      {
        label: "Matrices",
        mainColumn: matricesMainColumn,
        route: "project-matrices",
      },
      {
        label: "Download",
        mainColumn: projectFilesMainColumn,
        route: "get-curl-command",
        sideColumn: projectFilesSideColumn,
      },
      {
        label: "Export",
        mainColumn: exportMainColumn,
        route: "export-to-terra",
        sideColumn: exportSideColumn,
      },
    ],
  },
};
