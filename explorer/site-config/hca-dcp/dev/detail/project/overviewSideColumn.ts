import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { ProjectsResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../../app/components";
import * as V from "../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

export const sideColumn = [
  {
    children: [
      {
        children: [
          {
            component: C.SectionTitle,
            props: {
              title: "Analysis Portals",
            },
          } as ComponentConfig<typeof C.SectionTitle>,
          {
            component: C.KeyValuePairs,
            viewBuilder: V.buildAnalysisPortals,
          } as ComponentConfig<typeof C.KeyValuePairs, ProjectsResponse>,
        ],
        component: C.Grid,
        props: {
          gridSx: { gap: 4 },
        },
      } as ComponentConfig<typeof C.Grid>,
    ],
    component: C.GridPaperSection,
  } as ComponentConfig<typeof C.GridPaperSection>,
  {
    component: C.Details,
    viewBuilder: V.buildDetails,
  } as ComponentConfig<typeof C.Details>,
];
