import { EntityConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { HCA_DCP_CATEGORY_KEY } from "site-config/hca-dcp/category";
import { mainColumn as hcaMetadataMainColumn } from "../../../hca-dcp/dev/detail/project/metadataMainColumn";
import { projectsEntityConfig as hcaProjectsEntity } from "../../../hca-dcp/dev/index/projectsEntityConfig";
import { mainColumn as exportMainColumn } from "../detail/project/exportMainColumn";
import { sideColumn as exportSideColumn } from "../detail/project/exportSideColumn";
import { getOverviewMainColumn } from "../detail/project/mainColumn";
import { mainColumn as matricesMainColumn } from "../detail/project/matricesMainColumn";
import { sideColumn as metadataSideColumn } from "../detail/project/metadataSideColumn";
import { sideColumn as overviewSideColumn } from "../detail/project/overviewSideColumn";
import { mainColumn as projectFilesMainColumn } from "../detail/project/projectFilesMainColumn";
import { sideColumn as projectFilesSideColumn } from "../detail/project/projectFilesSideColumn";

/**
 * Columns from the HCA proejctsEntityConfig that should be excluded
 */
const EXCLUDE_COLUMNS = [HCA_DCP_CATEGORY_KEY.BIONETWORK_NAME] as string[];

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
        sideColumn: overviewSideColumn,
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
  list: {
    ...hcaProjectsEntity.list,
    columns: hcaProjectsEntity.list.columns.filter(
      (column) => !EXCLUDE_COLUMNS.includes(column.id)
    ),
  },
};
