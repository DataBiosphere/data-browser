import { getProjectId } from "app/transformers/hca";
import * as T from "./projectTransformer";
import * as C from "../../../app/components";
import { sideColumn } from "./sideColumn";
import { mainColumn } from "./mainColumn";
import { ComponentConfig, ListConfig } from "../../../app/config/model";
import { ProjectResponse } from "app/models/responses";

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
    sideColumn: sideColumn,
    mainColumn: mainColumn,
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
