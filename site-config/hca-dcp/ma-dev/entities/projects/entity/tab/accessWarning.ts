import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { ProjectsResponse } from "../../../../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../../../../app/components";
import * as MDX from "../../../../../../../app/components/common/MDXContent/hca-dcp";
import * as V from "../../../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

export const EXPORT_ACCESS_WARNING: ComponentConfig[] = [
  {
    /* Project is not accessible; render warning */
    children: [
      {
        children: [
          {
            component: MDX.Alert,
            viewBuilder: V.buildAlertExportEntityWarning,
          } as ComponentConfig<typeof MDX.Alert, ProjectsResponse>,
        ],
        component: C.BackPageContentSingleColumn,
      } as ComponentConfig<typeof C.BackPageContentSingleColumn>,
    ],
    component: C.ConditionalComponent,
    viewBuilder: V.renderExportEntityWarning,
  } as ComponentConfig<typeof C.ConditionalComponent, ProjectsResponse>,
];
