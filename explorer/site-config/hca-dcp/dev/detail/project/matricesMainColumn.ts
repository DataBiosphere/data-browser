import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { ProjectsResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../../app/components";
import * as MDX from "../../../../../app/components/common/MDXContent/hca-dcp";
import * as V from "../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import { getExportDataReleasePolicy } from "../../export/sideColumn";

export const mainColumn: ComponentConfig[] = [
  {
    children: [
      {
        children: [
          {
            component: MDX.BatchCorrectionWarning,
          } as ComponentConfig<typeof MDX.BatchCorrectionWarning>,
        ],
        component: C.FluidAlert,
        viewBuilder: V.buildBatchCorrectionWarning,
      } as ComponentConfig<typeof C.FluidAlert>,
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
          } as ComponentConfig<
            typeof C.GeneratedMatricesTables,
            ProjectsResponse
          >,
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
          } as ComponentConfig<
            typeof C.GeneratedMatricesTables,
            ProjectsResponse
          >,
        ],
        component: C.FluidPaper,
      } as ComponentConfig<typeof C.FluidPaper>,
      {
        children: getExportDataReleasePolicy(),
        component: C.Grid,
        viewBuilder: V.buildTripleColumnGrid,
      } as ComponentConfig<typeof C.Grid>,
    ],
    component: C.BackPageContentSingleColumn,
  } as ComponentConfig<typeof C.BackPageContentSingleColumn>,
];
