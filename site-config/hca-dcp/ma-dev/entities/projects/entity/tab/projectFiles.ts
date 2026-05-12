import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { ProjectsResponse } from "../../../../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../../../../app/components";
import * as V from "../../../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import { EXPORT_ACCESS_WARNING } from "./accessWarning";
import { mainColumn } from "./projectFilesMainColumn";
import { sideColumn } from "./projectFilesSideColumn";

export const PROJECT_FILES: ComponentConfig[] = [
  /* Project is not accessible; render warning */
  ...EXPORT_ACCESS_WARNING,
  /* Project is accessible; render export entity */
  {
    children: [
      /* mainColumn */
      {
        children: mainColumn,
        component: C.BackPageContentMainColumn,
      } as ComponentConfig<typeof C.BackPageContentMainColumn>,
      /* sideColumn */
      {
        children: sideColumn,
        component: C.BackPageContentSideColumn,
      } as ComponentConfig<typeof C.BackPageContentSideColumn>,
    ],
    component: C.ConditionalComponent,
    viewBuilder: V.renderExportEntity,
  } as ComponentConfig<typeof C.ConditionalComponent, ProjectsResponse>,
];
