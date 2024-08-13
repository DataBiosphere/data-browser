import {
  ComponentConfig,
  ComponentsConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import { AnVILCatalogConsortium } from "../../../../../app/apis/catalog/anvil-catalog/common/entities";
import * as C from "../../../../../app/components";
import * as V from "../../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";

export const top: ComponentsConfig = [
  {
    component: C.BackPageHero,
    viewBuilder: V.buildConsortiumHero,
  } as ComponentConfig<typeof C.BackPageHero, AnVILCatalogConsortium>,
];
