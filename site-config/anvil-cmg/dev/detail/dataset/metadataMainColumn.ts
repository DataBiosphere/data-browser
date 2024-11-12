import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { DatasetsResponse } from "../../../../../app/apis/azul/anvil-cmg/common/responses";
import * as C from "../../../../../app/components";
import * as MDX from "../../../../../app/components/common/MDXContent/anvil-cmg";
import * as V from "../../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import { sideColumn } from "../../export/exportSideColumn";

export const mainColumn: ComponentConfig[] = [
  {
    /* Dataset is not accessible; render warning */
    children: [
      {
        children: [
          {
            component: MDX.Alert,
            viewBuilder: V.buildAlertManifestDownloadEntityWarning,
          } as ComponentConfig<typeof MDX.Alert, DatasetsResponse>,
        ],
        component: C.BackPageContentSingleColumn,
      } as ComponentConfig<typeof C.BackPageContentSingleColumn>,
    ],
    component: C.ConditionalComponent,
    viewBuilder: V.renderManifestDownloadEntityWarning,
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
    viewBuilder: V.renderManifestDownloadEntity,
  } as ComponentConfig<typeof C.ConditionalComponent, DatasetsResponse>,
];
