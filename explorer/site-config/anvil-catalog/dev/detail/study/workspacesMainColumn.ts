import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "app/components";
import { AnVILCatalogStudy } from "../../../../../app/apis/catalog/anvil-catalog/common/entities";
import * as V from "../../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";

export const workspacesMainColumn = [
  {
    children: [
      {
        component: C.DetailViewTable,
        viewBuilder: V.buildStudyDetailViewWorkspacesTable,
      } as ComponentConfig<typeof C.DetailViewTable, AnVILCatalogStudy>,
    ],
    component: C.BackPageContentSingleColumn,
  } as ComponentConfig<typeof C.BackPageContentSingleColumn>,
];
