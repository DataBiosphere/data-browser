import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { AnVILCatalogConsortium } from "../../../../../app/apis/catalog/anvil-catalog/common/entities";
import * as C from "../../../../../app/components";
import * as T from "../../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";

export const sideColumn = [
  {
    component: C.Details,
    viewBuilder: T.buildConsortiumSummary,
  } as ComponentConfig<typeof C.Details, AnVILCatalogConsortium>,
];
