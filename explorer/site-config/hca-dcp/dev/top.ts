// App dependencies
import * as C from "../../../app/components";
import { ComponentConfig } from "app/config/model";
import { ProjectsResponse } from "app/models/responses";
import * as T from "./projectViewModelBuilder";

export const top = [
  {
    children: [
      {
        children: [
          // Insert breadcrumbs
          {
            component: C.ProjectTitle,
            transformer: T.projectsToProjTitle,
          } as ComponentConfig<typeof C.ProjectTitle, ProjectsResponse>,
        ],
        component: C.Stack,
        props: {
          gap: 1,
        },
      } as ComponentConfig<typeof C.Stack, ProjectsResponse>,
      {
        children: [
          // Insert select project
          {
            component: C.StatusBadge,
            transformer: T.projectsToProjStatus,
          } as ComponentConfig<typeof C.StatusBadge, ProjectsResponse>,
        ],
        component: C.Stack,
        props: {
          direction: "row",
          gap: 4,
        },
      } as ComponentConfig<typeof C.Stack, ProjectsResponse>,
    ],
    component: C.ProjectHeader,
  } as ComponentConfig<typeof C.ProjectHeader, ProjectsResponse>,
];
