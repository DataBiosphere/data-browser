import {
  ComponentConfig,
  ComponentsConfig,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import { DatasetsResponse } from "../../../../../app/apis/azul/anvil/common/responses";
import * as C from "../../../../../app/components";
import * as T from "../../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";

export const top: ComponentsConfig = [
  {
    component: C.BackPageHero,
    viewBuilder: T.buildDatasetHero,
  } as ComponentConfig<typeof C.BackPageHero, DatasetsResponse>,
];
