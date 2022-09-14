import { ProjectsResponse } from "app/models/responses";
import { getProjectId } from "app/transformers/hca";
import * as Components from "../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../app/config/common/entities";
import { PROJECTS_LABEL } from "./constants";
import { mainColumn as exportMainColumn } from "./detail/project/exportMainColumn";
import { sideColumn as exportSideColumn } from "./detail/project/exportSideColumn";
import { mainColumn as matricesMainColumn } from "./detail/project/matricesMainColumn";
import { sideColumn as matricesSideColumn } from "./detail/project/matricesSideColumn";
import { mainColumn as metadataMainColumn } from "./detail/project/metadataMainColumn";
import { sideColumn as metadataSideColumn } from "./detail/project/metadataSideColumn";
import { mainColumn as overviewMainColumn } from "./detail/project/overviewMainColumn";
import { sideColumn as overviewSideColumn } from "./detail/project/overviewSideColumn";
import { mainColumn as projectFilesMainColumn } from "./detail/project/projectFilesMainColumn";
import { sideColumn as projectFilesSideColumn } from "./detail/project/projectFilesSideColumn";
import { top } from "./detail/project/top";
import * as ViewBuilder from "./projectsViewModelBuilder";
import * as B from "./projectViewModelBuilder";

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
        sideColumn: matricesSideColumn,
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
          component: Components.Links,
          viewBuilder: B.projectsToProjectTitleColumn,
        } as ComponentConfig<typeof Components.Links>,
        header: "Project Title",
        width: { max: "2fr", min: "374px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildSpecies,
        },
        header: "Species",
        width: { max: "1fr", min: "136px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: B.projectsToLibConstApproachColumn,
        },
        header: "Library Construction Approach",
        width: { max: "1fr", min: "126px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: B.projectsToAnatomicalEntityColumn,
        },
        header: "Anatomical Entity",
        width: { max: "1fr", min: "146px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: B.projectsToDiseaseDonorColumn,
        },
        header: "Disease (Donor)",
        width: { max: "1fr", min: "128px" },
      },
      {
        componentConfig: {
          children: [
            {
              component: Components.Text,
              viewBuilder: B.projectsToCellCountColumn,
            } as ComponentConfig<typeof Components.Text>,
          ],
          component: Components.Tooltip,
          props: {
            title: "Cell Count Estimate",
          },
        } as ComponentConfig<typeof Components.Tooltip>,
        header: "Cell Count Estimate",
        width: { max: "1fr", min: "96px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: B.buildDevStage,
        } as ComponentConfig<typeof Components.Text>,
        header: "Development Stage",
        hiddenColumn: true,
        width: { max: "1fr", min: "148px" },
      },
    ],
  } as ListConfig<ProjectsResponse>,
  route: "projects",
};
