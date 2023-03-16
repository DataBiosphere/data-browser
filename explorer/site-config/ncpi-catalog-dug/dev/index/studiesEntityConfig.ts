import { EntityConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { DugCatalogStudy } from "../../../../app/apis/catalog/ncpi-catalog-dug/common/entities";
import { DugStudyInputMapper } from "../../../../app/apis/catalog/ncpi-catalog-dug/common/utils";
import { NCPI_CATALOG_CATEGORY_KEY } from "../../../ncpi-catalog/category";
import { top } from "../../../ncpi-catalog/dev/detail/study/top";
import { studiesEntityConfig as ncpiStudiesEntityConfig } from "../../../ncpi-catalog/dev/index/studiesEntityConfig";
import { relatedStudiesMainColumn } from "../detail/study/relatedStudiesMainColumn";
import { fetchRelatedStudies } from "./common/utils";

/**
 * Entity config object responsible for config related to the /explore/studies route.
 */
export const studiesEntityConfig: EntityConfig<DugCatalogStudy> = {
  ...ncpiStudiesEntityConfig,
  detail: {
    ...ncpiStudiesEntityConfig.detail,
    tabs: [
      ...ncpiStudiesEntityConfig.detail.tabs,
      {
        label: "Related Studies",
        mainColumn: relatedStudiesMainColumn,
        route: "related-studies",
      },
    ],
    top: top,
  },
  listView: {
    disablePagination: true,
    relatedView: {
      relatedSearchFn: fetchRelatedStudies,
      resultKey: NCPI_CATALOG_CATEGORY_KEY.DB_GAP_ID,
      searchKey: NCPI_CATALOG_CATEGORY_KEY.FOCUS,
    },
  },
  staticEntityImportMapper: DugStudyInputMapper,
  staticLoadFile: "files/ncpi-catalog-dug/out/ncpi-dug-studies.json",
};
