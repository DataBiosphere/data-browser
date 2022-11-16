import { ComponentConfig, ComponentsConfig } from "app/config/common/entities";
import { NCPICatalogStudy } from "../../../../../app/apis/catalog/ncpi-catalog/common/entities";
import * as C from "../../../../../app/components";
import * as T from "../../../../../app/viewModelBuilders/catalog/ncpi-catalog/common/viewModelBuilders";

export const top: ComponentsConfig = [
  {
    component: C.BackPageHero,
    viewBuilder: T.buildStudyHero,
  } as ComponentConfig<typeof C.BackPageHero, NCPICatalogStudy>,
];
