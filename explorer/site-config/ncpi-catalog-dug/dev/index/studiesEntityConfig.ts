import { DugCatalogStudy } from "../../../../app/apis/catalog/ncpi-catalog-dug/common/entities";
import { DugStudyInputMapper } from "../../../../app/apis/catalog/ncpi-catalog-dug/common/utils";
import { EntityConfig } from "../../../../app/config/common/entities";
import { top } from "../../../ncpi-catalog/dev/detail/study/top";
import { studiesEntityConfig as ncpiStudiesEntityConfig } from "../../../ncpi-catalog/dev/index/studiesEntityConfig";
import { NCPI_CATALOG_FILTER_CATEGORY_KEYS } from "../../../ncpi-catalog/filter-category-keys";
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
      resultKey: NCPI_CATALOG_FILTER_CATEGORY_KEYS.DB_GAP_ID,
      searchKey: NCPI_CATALOG_FILTER_CATEGORY_KEYS.FOCUS,
    },
  },
  staticEntityImportMapper: DugStudyInputMapper,
  staticLoadFile: "files/ncpi-catalog-dug/out/ncpi-dug-studies.json",
};
