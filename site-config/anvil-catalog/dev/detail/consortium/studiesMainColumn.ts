import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "app/components";
import { AnVILCatalogConsortium } from "../../../../../app/apis/catalog/anvil-catalog/common/entities";
import * as V from "../../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";

export const studiesMainColumn = [
  {
    children: [
      {
        component: C.DetailViewTable,
        viewBuilder: V.buildConsortiumDetailViewStudiesTable,
      } as ComponentConfig<typeof C.DetailViewTable, AnVILCatalogConsortium>,
    ],
    component: C.BackPageContentSingleColumn,
  } as ComponentConfig<typeof C.BackPageContentSingleColumn>,
];
