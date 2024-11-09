import {
  ComponentConfig,
  ComponentsConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import { NCPICatalogStudy } from "../../../../../app/apis/catalog/ncpi-catalog/common/entities";
import * as C from "../../../../../app/components";
import * as V from "../../../../../app/viewModelBuilders/catalog/ncpi-catalog/common/viewModelBuilders";

export const top: ComponentsConfig = [
  {
    component: C.BackPageHero,
    viewBuilder: V.buildStudyHero,
  } as ComponentConfig<typeof C.BackPageHero, NCPICatalogStudy>,
];
