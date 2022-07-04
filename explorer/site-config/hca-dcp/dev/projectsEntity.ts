// App dependencies
import * as C from "../../../app/components";
import { ComponentConfig, ListConfig } from "../../../app/config/model";
import { ProjectsResponse } from "app/models/responses";
import { getProjectId } from "app/transformers/hca";
import { mainColumn } from "./mainColumn";
import * as T from "./projectsViewModelBuilder";
// TODO refactor all methods to projectsViewModelBuilder with https://github.com/clevercanary/data-browser/issues/128
import * as B from "./projectViewModelBuilder";
import { sideColumn } from "./sideColumn";
import { top } from "./top";

/**
 * Entity config object responsible to config anything related to the /explore/projects route.
 */
export const projectEntity = {
  apiPath: "index/projects",
  detail: {
    mainColumn: mainColumn,
    sideColumn: sideColumn,
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
