import { EntityConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { mainColumn as hcaExportMainColumn } from "../../../hca-dcp/dev/detail/project/exportMainColumn";
import { mainColumn as hcaMatricesMainColumn } from "../../../hca-dcp/dev/detail/project/matricesMainColumn";
import { mainColumn as hcaMetadataMainColumn } from "../../../hca-dcp/dev/detail/project/metadataMainColumn";
import { mainColumn as hcaOverviewMainColumn } from "../../../hca-dcp/dev/detail/project/overviewMainColumn";
import { sideColumn as hcaOverviewSideColumn } from "../../../hca-dcp/dev/detail/project/overviewSideColumn";
import { mainColumn as hcaProjectFilesMainColumn } from "../../../hca-dcp/dev/detail/project/projectFilesMainColumn";
import { projectsEntity as hcaProjectsEntity } from "../../../hca-dcp/dev/projectsEntity";
import { sideColumn as exportSideColumn } from "../detail/project/exportSideColumn";
import { sideColumn as matricesSideColumn } from "../detail/project/matricesSideColumn";
import { sideColumn as metadataSideColumn } from "../detail/project/metadataSideColumn";
import { sideColumn as projectFilesSideColumn } from "../detail/project/projectFilesSideColumn";

/**
 * Entity config object responsible to config anything related to the /explore/projects route.
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
        mainColumn: hcaMatricesMainColumn,
        route: "project-matrices",
        sideColumn: matricesSideColumn,
      },
      {
        label: "Project Files",
        mainColumn: hcaProjectFilesMainColumn,
        route: "get-curl-command",
        sideColumn: projectFilesSideColumn,
      },
      {
        label: "Export",
        mainColumn: hcaExportMainColumn,
        route: "export-to-terra",
        sideColumn: exportSideColumn,
      },
    ],
  },
};
