import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { DatasetsResponse } from "../../../../../app/apis/azul/anvil-cmg/common/responses";
import * as C from "../../../../../app/components";
import * as V from "../../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import { sideColumn } from "../../export/exportSideColumn";

export const mainColumn: ComponentConfig[] = [
  {
    /* Dataset is not accessible; render warning */
    children: [
      {
        children: [
          {
            component: C.FluidAlert,
            viewBuilder: V.buildManifestDownloadEntityWarning,
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
            component: C.AnVILManifestDownloadEntity,
            viewBuilder: V.buildManifestDownloadEntity,
          } as ComponentConfig<
            typeof C.AnVILManifestDownloadEntity,
            DatasetsResponse
          >,
        ],
        component: C.BackPageContentMainColumn,
      } as ComponentConfig<typeof C.BackPageContentMainColumn>,
      /* sideColumn */
      ...sideColumn,
    ],
    component: C.ConditionalComponent,
    viewBuilder: V.renderExportEntity,
  } as ComponentConfig<typeof C.ConditionalComponent, DatasetsResponse>,
];
