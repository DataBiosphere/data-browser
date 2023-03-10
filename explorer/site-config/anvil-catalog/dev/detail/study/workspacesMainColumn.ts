import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "app/components";
import { AnVILCatalogStudy } from "../../../../../app/apis/catalog/anvil-catalog/common/entities";
import * as T from "../../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";

export const workspacesMainColumn = [
  {
    component: C.DetailViewTable,
    viewBuilder: T.buildStudyDetailViewWorkspacesTable,
  } as ComponentConfig<typeof C.DetailViewTable, AnVILCatalogStudy>,
];
