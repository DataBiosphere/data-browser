import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { ProjectsResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../../app/components";
import * as V from "../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

export const sideColumn = [
  {
    children: [
      {
        component: C.IconList,
        viewBuilder: V.buildAnalysisPortals,
      } as ComponentConfig<typeof C.IconList, ProjectsResponse>,
    ],
    component: C.CollapsableSection,
    props: {
      title: "Analysis Portals",
    },
  } as ComponentConfig<typeof C.CollapsableSection>,
  {
    component: C.Details,
    viewBuilder: V.buildDetails,
  } as ComponentConfig<typeof C.Details>,
];
