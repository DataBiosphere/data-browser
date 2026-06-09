import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { ProjectsResponse } from "../../../../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../../../../app/components";
import * as V from "../../../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import { PROJECT_ACCESS_WARNING } from "./accessWarning";
import { mainColumn } from "./matricesMainColumn";

export const MATRICES: ComponentConfig[] = [
  ...PROJECT_ACCESS_WARNING,
  {
    children: mainColumn,
    component: C.ConditionalComponent,
    viewBuilder: V.renderExportEntity,
  } as ComponentConfig<typeof C.ConditionalComponent, ProjectsResponse>,
];
