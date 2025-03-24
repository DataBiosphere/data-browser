import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { AnVILCatalogConsortium } from "../../../../../app/apis/catalog/anvil-catalog/common/entities";
import * as C from "../../../../../app/components";
import * as V from "../../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";

export const sideColumn = [
  {
    component: C.Details,
    viewBuilder: V.buildConsortiumSummary,
  } as ComponentConfig<typeof C.Details, AnVILCatalogConsortium>,
];
