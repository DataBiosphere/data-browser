import {
  ComponentConfig,
  ComponentsConfig,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import { ProjectsResponse } from "app/models/responses";
import * as C from "../../../../../app/components";
import * as T from "../../projectViewModelBuilder";

export const top: ComponentsConfig = [
  {
    component: C.BackPageHero,
    viewBuilder: T.buildHero,
  } as ComponentConfig<typeof C.BackPageHero, ProjectsResponse>,
];
