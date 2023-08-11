import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "app/components";
import { AnVILCatalogConsortium } from "../../../../../app/apis/catalog/anvil-catalog/common/entities";
import * as T from "../../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";

export const workspacesMainColumn = [
  {
    children: [
      {
        component: C.DetailViewTable,
        viewBuilder: T.buildConsortiumDetailViewWorkspacesTable,
      } as ComponentConfig<typeof C.DetailViewTable, AnVILCatalogConsortium>,
    ],
    component: C.BackPageContentSingleColumn,
  } as ComponentConfig<typeof C.BackPageContentSingleColumn>,
];
