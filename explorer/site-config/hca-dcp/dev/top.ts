// App dependencies
import * as C from "../../../app/components";
import { ComponentConfig } from "app/config/model";
import { ProjectsResponse } from "app/models/responses";
import * as T from "./projectViewModelBuilder";

export const top = [
  {
    component: C.Hero,
    transformer: T.buildHero,
  } as ComponentConfig<typeof C.Hero, ProjectsResponse>,
];
