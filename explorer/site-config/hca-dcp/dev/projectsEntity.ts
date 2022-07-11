// App dependencies
import * as C from "../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../app/config/model";
import { ProjectsResponse } from "app/models/responses";
import { getProjectId } from "app/transformers/hca";
import { mainColumn as overviewMainColumn } from "./overviewMainColumn";
import { mainColumn as metadataMainColumn } from "./metadataMainColumn";
import { mainColumn as matricesMainColumn } from "./matricesMainColumn";
import { mainColumn as projectFilesMainColumn } from "./projectFilesMainColumn";
import { mainColumn as exportMainColumn } from "./exportMainColumn";
import * as T from "./projectsViewModelBuilder";
// TODO refactor all methods to projectsViewModelBuilder with https://github.com/clevercanary/data-browser/issues/128
import * as B from "./projectViewModelBuilder";
import { sideColumn as overviewSideColumn } from "./overviewSideColumn";
import { sideColumn as metadataSideColumn } from "./metadataSideColumn";
import { sideColumn as matricesSideColumn } from "./matricesSideColumn";
import { sideColumn as projectFilesSideColumn } from "./projectFilesSideColumn";
import { sideColumn as exportSideColumn } from "./exportSideColumn";
import { top } from "./top";

/**
 * Entity config object responsible to config anything related to the /explore/projects route.
 */
export const projectEntity: EntityConfig = {
  apiPath: "index/projects",
  detail: {
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
  label: "Projects",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.Links,
          transformer: B.projectsToProjectTitleColumn,
        } as ComponentConfig<typeof C.Links>,
        header: "Project Title",
      },
      {
        componentConfig: {
          component: C.NTagCell,
          transformer: T.buildSpecies,
        },
        header: "Species",
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: B.projectsToLibConstApproachColumn,
        },
        header: "Library Construction Approach",
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: B.projectsToAnatomicalEntityColumn,
        },
        header: "Anatomical Entity",
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: B.projectsToDiseaseDonorColumn,
        },
        header: "Disease (Donor)",
      },
      {
        componentConfig: {
          children: [
            {
              component: C.Text,
              transformer: B.projectsToCellCountColumn,
            } as ComponentConfig<typeof C.Text>,
          ],
          component: C.Tooltip,
          props: {
            title: "Cell Count Estimate",
          },
        } as ComponentConfig<typeof C.Tooltip>,
        header: "Cell Count Estimate",
      },
    ],
  } as ListConfig<ProjectsResponse>,
  route: "projects",
  staticLoad: true,
};
