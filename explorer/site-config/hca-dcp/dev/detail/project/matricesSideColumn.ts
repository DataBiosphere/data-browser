import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "../../../../../app/components";
import * as MDX from "../../../../../app/content/hca-dcp";

export const sideColumn: ComponentConfig[] = [
  {
    children: [
      {
        children: [
          {
            component: MDX.MatrixQuestionnaire,
          } as ComponentConfig<typeof MDX.MatrixQuestionnaire>,
        ],
        component: MDX.Section,
      } as ComponentConfig<typeof MDX.Section>,
    ],
    component: C.FluidPaper,
  } as ComponentConfig<typeof C.FluidPaper>,
  {
    children: [
      {
        children: [
          {
            component: MDX.DataReleasePolicy,
          } as ComponentConfig<typeof MDX.DataReleasePolicy>,
        ],
        component: MDX.Section,
      } as ComponentConfig<typeof MDX.Section>,
    ],
    component: C.FluidPaper,
  } as ComponentConfig<typeof C.FluidPaper>,
];
