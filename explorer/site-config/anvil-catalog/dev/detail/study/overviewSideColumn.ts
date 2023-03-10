import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { AnVILCatalogStudy } from "../../../../../app/apis/catalog/anvil-catalog/common/entities";
import * as C from "../../../../../app/components";
import * as T from "../../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";

export const sideColumn = [
  {
    children: [
      {
        component: C.KeyValuePairs,
        viewBuilder: T.buildStudyDetails,
      } as ComponentConfig<typeof C.KeyValuePairs, AnVILCatalogStudy>,
    ],
    component: C.GridPaperSection,
  } as ComponentConfig<typeof C.GridPaperSection>,
  {
    component: C.Details,
    viewBuilder: T.buildStudySummary,
  } as ComponentConfig<typeof C.Details, AnVILCatalogStudy>,
];
