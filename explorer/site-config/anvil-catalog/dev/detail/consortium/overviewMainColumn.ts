import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "../../../../../app/components/index";
import * as MDX from "../../../../../app/content/anvil-catalog";
import * as V from "../../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";

export const mainColumn = [
  {
    children: [
      {
        children: [
          {
            component: MDX.RenderComponent,
            viewBuilder: V.buildConsortiumOverview,
          } as ComponentConfig<typeof MDX.RenderComponent>,
        ],
        component: MDX.Section,
      } as ComponentConfig<typeof MDX.Section>,
    ],
    component: C.FluidPaper,
  } as ComponentConfig<typeof C.FluidPaper>,
];
