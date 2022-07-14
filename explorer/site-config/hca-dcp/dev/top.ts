// App dependencies
import * as C from "../../../app/components";
import { ComponentConfig, ComponentsConfig } from "app/config/model";
import { ProjectsResponse } from "app/models/responses";
import * as T from "./projectViewModelBuilder";

export const top: ComponentsConfig = [
  {
    component: C.ProjectHero,
    transformer: T.buildHero,
  } as ComponentConfig<typeof C.ProjectHero, ProjectsResponse>,
];
