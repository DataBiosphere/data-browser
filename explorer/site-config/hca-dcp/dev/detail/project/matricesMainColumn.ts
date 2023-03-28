import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { ProjectsResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../../app/components";
import * as MDX from "../../../../../app/content/hca-dcp";
import * as V from "../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

export const mainColumn: ComponentConfig[] = [
  {
    component: C.Alert,
    viewBuilder: V.buildBatchCorrectionWarning,
  } as ComponentConfig<typeof C.Alert>,
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
        viewBuilder: V.buildDCPGeneratedMatricesTable,
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
        viewBuilder: V.buildContributorGeneratedMatricesTable,
      } as ComponentConfig<typeof C.GeneratedMatricesTables, ProjectsResponse>,
    ],
    component: C.FluidPaper,
  } as ComponentConfig<typeof C.FluidPaper>,
  {
    children: [
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
    ],
    component: C.Grid,
    viewBuilder: V.buildTripleColumnGrid,
  } as ComponentConfig<typeof C.Grid>,
];
