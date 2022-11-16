import { ComponentConfig, ComponentsConfig } from "app/config/common/entities";
import { AnVILCatalogStudy } from "../../../../../app/apis/catalog/anvil-catalog/common/entities";
import * as C from "../../../../../app/components";
import * as T from "../../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";

export const top: ComponentsConfig = [
  {
    component: C.BackPageHero,
    viewBuilder: T.buildStudyHero,
  } as ComponentConfig<typeof C.BackPageHero, AnVILCatalogStudy>,
];
