import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import { ProjectsResponse } from "app/models/responses";
import { getProjectId } from "app/transformers/hca";
import * as Components from "../../../app/components";
import {
  projectsBuildAnatomicalEntityColumn,
  projectsBuildCellCountColumn,
  projectsBuildDevelopmentStage,
  projectsBuildDiseaseDonorColumn,
  projectsBuildLibraryConstructionApproachColumn,
  projectsBuildProjectTitleColumn,
  projectsBuildSpecies,
} from "../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import { HCA_DCP_CATEGORY_KEY, HCA_DCP_CATEGORY_LABEL } from "../category";
import { PROJECTS_LABEL } from "./constants";
import { mainColumn as exportMainColumn } from "./detail/project/exportMainColumn";
import { sideColumn as exportSideColumn } from "./detail/project/exportSideColumn";
import { mainColumn as matricesMainColumn } from "./detail/project/matricesMainColumn";
import { mainColumn as metadataMainColumn } from "./detail/project/metadataMainColumn";
import { sideColumn as metadataSideColumn } from "./detail/project/metadataSideColumn";
import { mainColumn as overviewMainColumn } from "./detail/project/overviewMainColumn";
import { sideColumn as overviewSideColumn } from "./detail/project/overviewSideColumn";
import { mainColumn as projectFilesMainColumn } from "./detail/project/projectFilesMainColumn";
import { sideColumn as projectFilesSideColumn } from "./detail/project/projectFilesSideColumn";
import { top } from "./detail/project/top";

/**
 * Entity config object responsible to config anything related to the /explore/projects route.
 */
export const projectsEntity: EntityConfig = {
  apiPath: "index/projects",
  detail: {
    detailOverviews: ["Overview"],
    staticLoad: true,
    tabs: [
      {
        label: "Overview",
        mainColumn: overviewMainColumn,
        route: "",
        sideColumn: overviewSideColumn,
      },
      {
        label: "Metadata",
        mainColumn: metadataMainColumn,
        route: "project-metadata",
        sideColumn: metadataSideColumn,
      },
      {
        label: "Matrices",
        mainColumn: matricesMainColumn,
        route: "project-matrices",
      },
      {
        label: "Project Files",
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
    top: top,
  },
  getId: getProjectId,
  label: PROJECTS_LABEL,
  list: {
    columns: [
      {
        componentConfig: {
          component: Components.Link,
          viewBuilder: projectsBuildProjectTitleColumn,
        } as ComponentConfig<typeof Components.Link>,
        header: HCA_DCP_CATEGORY_LABEL.PROJECT_TITLE,
        id: HCA_DCP_CATEGORY_KEY.PROJECT_TITLE,
        width: { max: "2fr", min: "374px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: projectsBuildSpecies,
        },
        header: "Species", // TODO confirm header
        id: HCA_DCP_CATEGORY_KEY.GENUS_SPECIES,
        width: { max: "1fr", min: "136px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: projectsBuildLibraryConstructionApproachColumn,
        },
        header: HCA_DCP_CATEGORY_LABEL.LIBRARY_CONSTRUCTION_METHOD,
        id: HCA_DCP_CATEGORY_KEY.LIBRARY_CONSTRUCTION_METHOD,
        width: { max: "1fr", min: "126px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: projectsBuildAnatomicalEntityColumn,
        },
        header: HCA_DCP_CATEGORY_LABEL.ANATOMICAL_ENTITY,
        id: HCA_DCP_CATEGORY_KEY.ANATOMICAL_ENTITY,
        width: { max: "1fr", min: "146px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: projectsBuildDiseaseDonorColumn,
        },
        header: "Disease (Donor)", // TODO confirm header
        id: HCA_DCP_CATEGORY_KEY.DONOR_DISEASE,
        width: { max: "1fr", min: "128px" },
      },
      {
        componentConfig: {
          children: [
            {
              component: Components.Cell,
              viewBuilder: projectsBuildCellCountColumn,
            } as ComponentConfig<typeof Components.Cell>,
          ],
          component: Components.Tooltip,
          props: {
            title: "Cell Count Estimate",
          },
        } as ComponentConfig<typeof Components.Tooltip>,
        header: HCA_DCP_CATEGORY_LABEL.EFFECTIVE_CELL_COUNT,
        id: HCA_DCP_CATEGORY_KEY.EFFECTIVE_CELL_COUNT,
        width: { max: "1fr", min: "96px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: projectsBuildDevelopmentStage,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: HCA_DCP_CATEGORY_LABEL.DEVELOPMENT_STAGE,
        id: HCA_DCP_CATEGORY_KEY.DEVELOPMENT_STAGE,
        width: { max: "1fr", min: "148px" },
      },
    ],
    defaultSort: {
      desc: SORT_DIRECTION.ASCENDING,
      id: HCA_DCP_CATEGORY_KEY.PROJECT_TITLE,
    },
  } as ListConfig<ProjectsResponse>,
  route: "projects",
  staticLoad: false,
};
