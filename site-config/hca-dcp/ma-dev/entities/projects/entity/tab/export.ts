import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { ProjectsResponse } from "../../../../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../../../../app/components";
import * as V from "../../../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import { PROJECT_ACCESS_WARNING } from "./accessWarning";
import { mainColumn } from "./exportMainColumn";
import { sideColumn } from "./exportSideColumn";

export const EXPORT: ComponentConfig[] = [
  ...PROJECT_ACCESS_WARNING,
  {
    children: [
      {
        children: mainColumn,
        component: C.BackPageContentMainColumn,
      } as ComponentConfig<typeof C.BackPageContentMainColumn>,
      {
        children: sideColumn,
        component: C.BackPageContentSideColumn,
      } as ComponentConfig<typeof C.BackPageContentSideColumn>,
    ],
    component: C.ConditionalComponent,
    viewBuilder: V.renderExportEntity,
  } as ComponentConfig<typeof C.ConditionalComponent, ProjectsResponse>,
];
