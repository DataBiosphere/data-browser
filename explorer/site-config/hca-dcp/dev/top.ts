// App dependencies
import * as C from "../../../app/components";
import { ComponentConfig } from "app/config/model";
import { ProjectResponse } from "app/models/responses";
import * as T from "./projectTransformer";

export const top = [
  {
    component: C.Stack,
    props: {
      gap: 1,
    },
    children: [
      // Insert breadcrumbs
      {
        component: C.ProjectTitle,
        transformer: T.projectsToProjTitle,
      } as ComponentConfig<typeof C.ProjectTitle, ProjectResponse>,
    ],
  } as ComponentConfig<typeof C.Stack, ProjectResponse>,
  {
    component: C.Stack,
    props: {
      direction: "row",
      gap: 4,
    },
    children: [
      // Insert select project
      {
        component: C.StatusBadge,
        transformer: T.projectsToProjStatus,
      } as ComponentConfig<typeof C.StatusBadge, ProjectResponse>,
    ],
  } as ComponentConfig<typeof C.Stack, ProjectResponse>,
];
