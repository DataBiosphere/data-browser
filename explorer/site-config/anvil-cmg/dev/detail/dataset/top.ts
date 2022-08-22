import { ComponentConfig, ComponentsConfig } from "app/config/common/entities";
import { DatasetsResponse } from "../../../../../app/apis/azul/anvil-cmg/common/responses";
import * as C from "../../../../../app/components";
import * as T from "../../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

export const top: ComponentsConfig = [
  {
    component: C.BackPageHero,
    viewBuilder: T.buildDatasetHero,
  } as ComponentConfig<typeof C.BackPageHero, DatasetsResponse>,
];
