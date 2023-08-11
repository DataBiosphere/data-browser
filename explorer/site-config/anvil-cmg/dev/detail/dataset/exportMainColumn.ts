import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { DatasetsResponse } from "../../../../../app/apis/azul/anvil-cmg/common/responses";
import * as C from "../../../../../app/components";
import * as MDX from "../../../../../app/content/anvil-cmg";
import * as V from "../../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

export const mainColumn: ComponentConfig[] = [
  {
    /* Dataset is not accessible; render warning */
    children: [
      {
        children: [
          {
            component: C.FluidAlert,
            viewBuilder: V.buildExportEntityWarning,
          } as ComponentConfig<typeof C.FluidAlert, DatasetsResponse>,
        ],
        component: C.BackPageContentSingleColumn,
      } as ComponentConfig<typeof C.BackPageContentSingleColumn>,
    ],
    component: C.ConditionalComponent,
    viewBuilder: V.renderExportEntityWarning,
  } as ComponentConfig<typeof C.ConditionalComponent, DatasetsResponse>,
  {
    /* Dataset is accessible; render export entity */
    children: [
      /* mainColumn */
      {
        children: [
          {
            component: C.ExportToTerra,
            viewBuilder: V.buildExportEntityToTerra,
          } as ComponentConfig<typeof C.ExportToTerra, DatasetsResponse>,
        ],
        component: C.BackPageContentMainColumn,
      } as ComponentConfig<typeof C.BackPageContentMainColumn>,
      /* sideColumn */
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
    ],
    component: C.ConditionalComponent,
    viewBuilder: V.renderExportEntity,
  } as ComponentConfig<typeof C.ConditionalComponent, DatasetsResponse>,
];
