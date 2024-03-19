import { EntityConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { mainColumn as hcaMetadataMainColumn } from "../../../hca-dcp/dev/detail/project/metadataMainColumn";
import { mainColumn as hcaOverviewMainColumn } from "../../../hca-dcp/dev/detail/project/overviewMainColumn";
import { sideColumn as hcaOverviewSideColumn } from "../../../hca-dcp/dev/detail/project/overviewSideColumn";
import { mainColumn as hcaProjectFilesMainColumn } from "../../../hca-dcp/dev/detail/project/projectFilesMainColumn";
import { projectsEntityConfig as hcaProjectsEntity } from "../../../hca-dcp/dev/index/projectsEntityConfig";
import { mainColumn as exportMainColumn } from "../detail/project/exportMainColumn";
import { sideColumn as exportSideColumn } from "../detail/project/exportSideColumn";
import { mainColumn as matricesMainColumn } from "../detail/project/matricesMainColumn";
import { sideColumn as metadataSideColumn } from "../detail/project/metadataSideColumn";
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
        mainColumn: hcaOverviewMainColumn,
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
        mainColumn: hcaProjectFilesMainColumn,
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
