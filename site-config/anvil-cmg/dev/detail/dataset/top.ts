import {
  ComponentConfig,
  ComponentsConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import { DatasetsResponse } from "../../../../../app/apis/azul/anvil-cmg/common/responses";
import * as C from "../../../../../app/components";
import * as V from "../../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

export const top: ComponentsConfig = [
  {
    children: [
      {
        component: C.AccessibilityBadge,
        viewBuilder: V.buildDatasetAccessibilityBadge,
      } as ComponentConfig<typeof C.AccessibilityBadge>,
    ],
    component: C.BackPageHero,
    viewBuilder: V.buildDatasetHero,
  } as ComponentConfig<typeof C.BackPageHero, DatasetsResponse>,
];
