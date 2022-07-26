// App dependencies
import * as C from "../../../../../app/components";
import { ComponentConfig, ComponentsConfig } from "app/config/model";
import * as T from "../../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";
import { DatasetsResponse } from "../../../../../app/apis/azul/anvil/common/responses";

export const top: ComponentsConfig = [
  {
    component: C.ProjectHero,
    transformer: T.buildDatasetHero,
  } as ComponentConfig<typeof C.ProjectHero, DatasetsResponse>,
];
