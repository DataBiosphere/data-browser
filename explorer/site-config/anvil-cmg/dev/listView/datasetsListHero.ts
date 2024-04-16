import {
  ComponentConfig,
  ComponentsConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import { DatasetsResponse } from "../../../../app/apis/azul/anvil-cmg/common/responses";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

export const listHero: ComponentsConfig = [
  {
    children: [
      {
        component: C.FluidAlert,
        viewBuilder: V.buildDatasetListViewListHeroWarning,
      } as ComponentConfig<typeof C.FluidAlert>,
    ],
    component: C.ConditionalComponent,
    viewBuilder: V.renderWhenUnAuthorized,
  } as ComponentConfig<typeof C.ConditionalComponent, DatasetsResponse>,
];
