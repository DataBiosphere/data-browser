import * as C from "../../../../../app/components";
import { ComponentConfig } from "../../../../../app/config/common/entities";
import * as T from "../../../../../app/viewModelBuilders/catalog/ncpi-catalog/common/viewModelBuilders";

export const sideColumn = [
  {
    children: [
      {
        component: C.KeyValuePairs,
        viewBuilder: T.buildStudyDetails,
      } as ComponentConfig<typeof C.KeyValuePairs>,
    ],
    component: C.GridPaperSection,
  } as ComponentConfig<typeof C.GridPaperSection>,
  {
    component: C.Details,
    viewBuilder: T.buildStudySummary,
  } as ComponentConfig<typeof C.Details>,
];
