import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "../../../../../app/components";
import * as MDX from "../../../../../app/content/index";
import { ProjectsResponse } from "../../../../../app/models/responses";
import * as T from "../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

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
      {
        component: C.GeneratedMatricesTables,
        viewBuilder: T.buildDCPGeneratedMatricesTable,
      } as ComponentConfig<typeof C.GeneratedMatricesTables, ProjectsResponse>,
    ],
    component: C.FluidPaper,
  } as ComponentConfig<typeof C.FluidPaper>,
  {
    children: [
      {
        children: [
          {
            component: MDX.ContributorGeneratedMatrices,
          } as ComponentConfig<typeof MDX.ContributorGeneratedMatrices>,
        ],
        component: MDX.Section,
      } as ComponentConfig<typeof MDX.Section>,
      {
        component: C.GeneratedMatricesTables,
        viewBuilder: T.buildContributorGeneratedMatricesTable,
      } as ComponentConfig<typeof C.GeneratedMatricesTables, ProjectsResponse>,
    ],
    component: C.FluidPaper,
  } as ComponentConfig<typeof C.FluidPaper>,
];
