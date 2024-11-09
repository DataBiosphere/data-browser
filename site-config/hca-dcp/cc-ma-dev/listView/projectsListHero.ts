import {
  ComponentConfig,
  ComponentsConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import { ProjectsResponse } from "../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

export const listHero: ComponentsConfig = [
  {
    children: [
      {
        component: C.FluidAlert,
        viewBuilder: V.buildProjectListViewListHeroWarning,
      } as ComponentConfig<typeof C.FluidAlert>,
    ],
    component: C.ConditionalComponent,
    viewBuilder: V.renderWhenUnAuthorized,
  } as ComponentConfig<typeof C.ConditionalComponent, ProjectsResponse>,
];
