import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "../../../../../app/components";
import * as MDX from "../../../../../app/content/index";

export const mainColumn: ComponentConfig[] = [
  {
    children: [
      {
        children: [
          {
            component: MDX.DCPGeneratedMatrices,
          } as ComponentConfig<typeof MDX.DCPGeneratedMatrices>,
        ],
        component: MDX.Section,
      } as ComponentConfig<typeof MDX.Section>,
    ],
    component: C.FluidPaper,
  } as ComponentConfig<typeof C.FluidPaper>,
];
