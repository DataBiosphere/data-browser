// App dependencies
import * as C from "../../../app/components";
import { ComponentConfig, ListConfig } from "../../../app/config/model";
import { ProjectResponse } from "app/models/responses";
import { getProjectId } from "app/transformers/hca";
import { mainColumn } from "./mainColumn";
import * as T from "./projectTransformer";
import { sideColumn } from "./sideColumn";
import { top } from "./top";

/**
 * Entity config object responsible to config anything related to the /explore/projects route.
 */
export const projectEntity = {
  label: "Projects",
  apiPath: "index/projects",
  route: "projects",
  getId: getProjectId,
  staticLoad: true,
  detail: {
    mainColumn: mainColumn,
    sideColumn: sideColumn,
    top: top,
  },
  list: {
    columns: [
      {
        header: "Project Title",
        componentConfig: {
          component: C.Links,
          transformer: T.projectsToProjectTitleColumn,
        } as ComponentConfig<typeof C.Links>,
      },
      {
        header: "Species",
        componentConfig: {
          component: C.Text,
          transformer: T.projectsToSpeciesColumn,
        },
      },
      {
        header: "Cell Count Estimate",
        componentConfig: {
          component: C.Tooltip,
          props: {
            title: "Cell Count Estimate",
          },
          children: [
            {
              component: C.Text,
              transformer: T.projectsToCellCountColumn,
            } as ComponentConfig<typeof C.Text>,
          ],
        } as ComponentConfig<typeof C.Tooltip>,
      },
    ],
  } as ListConfig<ProjectResponse>,
};
