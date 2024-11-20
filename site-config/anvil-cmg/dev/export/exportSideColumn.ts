import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../../app/components";
import * as MDX from "../../../../app/components/common/MDXContent/anvil-cmg";
import * as V from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

export const sideColumn = [
  {
    children: [
      {
        children: [
          {
            component: C.ExportCurrentQuery,
            viewBuilder: V.buildExportCurrentQuery,
          } as ComponentConfig<typeof C.ExportCurrentQuery>,
          {
            component: C.ExportSelectedDataSummary,
            viewBuilder: V.buildExportSelectedDataSummary,
          } as ComponentConfig<typeof C.ExportSelectedDataSummary>,
        ],
        component: C.ExportSummary,
      } as ComponentConfig<typeof C.ExportSummary>,
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
    component: C.BackPageContentSideColumn,
  } as ComponentConfig<typeof C.BackPageContentSideColumn>,
];
