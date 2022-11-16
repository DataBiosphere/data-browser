import * as C from "../../../../../app/components";
import { ComponentConfig } from "../../../../../app/config/common/entities";
import * as T from "../../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";

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
];
