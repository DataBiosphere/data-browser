// App dependencies
import * as C from "../../../app/components";
import {
  ComponentConfig,
  ComponentsConfig,
  SiteConfig,
} from "app/config/model";
import { ProjectsResponse } from "app/models/responses";
import * as T from "./projectViewModelBuilder";

export const top: ComponentsConfig = (config: SiteConfig) => [
  {
    component: C.Hero,
    transformer: T.buildHero(config),
  } as ComponentConfig<typeof C.Hero, ProjectsResponse>,
];
