import { ComponentConfig } from "app/config/common/entities";
import { ProjectsResponse } from "app/models/responses";
import * as C from "../../../../../app/components";
import * as T from "../../projectViewModelBuilder";

export const sideColumn = [
  {
    children: [
      {
        component: C.IconList,
        viewBuilder: T.projectsToAnalysisPortals,
      } as ComponentConfig<typeof C.IconList, ProjectsResponse>,
    ],
    component: C.CollapsableSection,
    props: {
      title: "Analysis Portals",
    },
  } as ComponentConfig<typeof C.CollapsableSection>,
  {
    component: C.Details,
    viewBuilder: T.buildDetails,
  } as ComponentConfig<typeof C.Details>,
  // TODO removing for 7/19 demo
  // {
  //   children: [
  //     {
  //       component: C.FileCounts,
  //       transformer: T.projectsToFileCounts,
  //     } as ComponentConfig<typeof C.FileCounts, ProjectsResponse>,
  //   ],
  //   component: C.Section,
  //   props: {
  //     title: "File Counts",
  //   },
  // } as ComponentConfig<typeof C.Section>,
];
