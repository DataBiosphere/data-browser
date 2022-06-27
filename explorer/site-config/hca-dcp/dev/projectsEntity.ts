// App dependencies
import * as C from "../../../app/components";
import { ComponentConfig, ListConfig } from "../../../app/config/model";
import { ProjectResponse } from "app/models/responses";
import { getProjectId } from "app/transformers/hca";
import { mainColumn } from "./mainColumn";
import * as T from "./projectViewModelBuilder";
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
          transformer: T.projectsToProjectTitleColumn,
        } as ComponentConfig<typeof C.Links>,
        header: "Project Title",
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.projectsToSpeciesColumn,
        },
        header: "Species",
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.projectsToLibConstApproachColumn,
        },
        header: "Library Construction Approach",
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.projectsToAnatomicalEntityColumn,
        },
        header: "Anatomical Entity",
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.projectsToDiseaseDonorColumn,
        },
        header: "Disease (Donor)",
      },
      {
        componentConfig: {
          children: [
            {
              component: C.Text,
              transformer: T.projectsToCellCountColumn,
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
  } as ListConfig<ProjectResponse>,
  route: "projects",
  staticLoad: true,
};
