import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "app/components";
import { DugCatalogStudy } from "../../../../../app/apis/catalog/ncpi-catalog-dug/common/entities";
import * as T from "../../../../../app/viewModelBuilders/catalog/ncpi-catalog-dug/common/viewModelBuilders";

export const relatedStudiesMainColumn = [
  {
    component: C.DetailViewTable,
    viewBuilder: T.buildDetailViewRelatedStudiesTable,
  } as ComponentConfig<typeof C.DetailViewTable, DugCatalogStudy>,
];
