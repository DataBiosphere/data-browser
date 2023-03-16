import {
  ComponentConfig,
  ComponentsConfig,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import { AnVILCatalogConsortium } from "../../../../../app/apis/catalog/anvil-catalog/common/entities";
import * as C from "../../../../../app/components";
import * as T from "../../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";

export const top: ComponentsConfig = [
  {
    component: C.BackPageHero,
    viewBuilder: T.buildConsortiumHero,
  } as ComponentConfig<typeof C.BackPageHero, AnVILCatalogConsortium>,
];
