import { ComponentConfig, ComponentsConfig } from "app/config/common/entities";
import { ProjectsResponse } from "app/models/responses";
import * as C from "../../../../../app/components";
import * as T from "../../projectViewModelBuilder";

export const top: ComponentsConfig = [
  {
    component: C.ProjectHero,
    viewBuilder: T.buildHero,
  } as ComponentConfig<typeof C.ProjectHero, ProjectsResponse>,
];
