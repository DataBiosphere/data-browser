import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { ProjectsResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../../app/components";
import * as MDX from "../../../../../app/content/hca-dcp";
import * as V from "../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

export const sideColumn: ComponentConfig[] = [
  {
    children: [
      {
        component: C.ExportEntityCurrentQuery,
        viewBuilder: V.buildExportEntityCurrentQuery,
      } as ComponentConfig<typeof C.ExportEntityCurrentQuery, ProjectsResponse>,
    ],
    component: C.Sections,
  } as ComponentConfig<typeof C.Sections>,
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
];
