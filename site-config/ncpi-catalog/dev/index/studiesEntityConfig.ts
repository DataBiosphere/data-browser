import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode";
import { NCPICatalogStudy } from "../../../../app/apis/catalog/ncpi-catalog/common/entities";
import {
  getStudyId,
  getTitle,
  NCPIStudyInputMapper,
} from "../../../../app/apis/catalog/ncpi-catalog/common/utils";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/catalog/ncpi-catalog/common/viewModelBuilders";
import {
  NCPI_CATALOG_CATEGORY_KEY,
  NCPI_CATALOG_CATEGORY_LABEL,
} from "../../category";
import { mainColumn } from "../detail/study/overviewMainColumn";
import { sideColumn } from "../detail/study/overviewSideColumn";
import { top } from "../detail/study/top";

/**
 * Entity config object responsible for config related to the /studies route.
 */
export const studiesEntityConfig: EntityConfig<NCPICatalogStudy> = {
  detail: {
    detailOverviews: ["Overview"],
    staticLoad: true,
    tabs: [
      {
        label: "Overview",
        mainColumn: mainColumn,
        route: "",
        sideColumn: sideColumn,
      },
    ],
    top: top,
  },
  entityMapper: NCPIStudyInputMapper,
  exploreMode: EXPLORE_MODE.CS_FETCH_CS_FILTERING,
  getId: getStudyId,
  getTitle: getTitle,
  label: "Studies",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildPlatforms,
        } as ComponentConfig<typeof C.NTagCell>,
        header: NCPI_CATALOG_CATEGORY_LABEL.PLATFORM,
        id: NCPI_CATALOG_CATEGORY_KEY.PLATFORM,
        width: { max: "1fr", min: "100px" },
      },
      {
        columnPinned: true,
        componentConfig: {
          component: C.Link,
          viewBuilder: V.buildStudyTitle,
        } as ComponentConfig<typeof C.Link>,
        header: NCPI_CATALOG_CATEGORY_LABEL.TITLE,
        id: NCPI_CATALOG_CATEGORY_KEY.TITLE,
        width: { max: "2fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildDbGapId,
        } as ComponentConfig<typeof C.BasicCell>,
        header: NCPI_CATALOG_CATEGORY_LABEL.DB_GAP_ID,
        id: NCPI_CATALOG_CATEGORY_KEY.DB_GAP_ID,
        width: { max: "1.24fr", min: "124px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildFocus,
        } as ComponentConfig<typeof C.BasicCell>,
        header: NCPI_CATALOG_CATEGORY_LABEL.FOCUS,
        id: NCPI_CATALOG_CATEGORY_KEY.FOCUS,
        width: { max: "1.6fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildDataTypes,
        } as ComponentConfig<typeof C.NTagCell>,
        header: NCPI_CATALOG_CATEGORY_LABEL.DATA_TYPE,
        id: NCPI_CATALOG_CATEGORY_KEY.DATA_TYPE,
        width: { max: "1.6fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildStudyDesigns,
        } as ComponentConfig<typeof C.NTagCell>,
        header: NCPI_CATALOG_CATEGORY_LABEL.STUDY_DESIGN,
        id: NCPI_CATALOG_CATEGORY_KEY.STUDY_DESIGN,
        width: { max: "1.6fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.ConsentCodesCell,
          viewBuilder: V.buildConsentCodes,
        } as ComponentConfig<typeof C.ConsentCodesCell>,
        header: NCPI_CATALOG_CATEGORY_LABEL.CONSENT_CODE,
        id: NCPI_CATALOG_CATEGORY_KEY.CONSENT_CODE,
        width: { max: "1.6fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildParticipantCount,
        } as ComponentConfig<typeof C.BasicCell>,
        header: NCPI_CATALOG_CATEGORY_LABEL.PARTICIPANT_COUNT,
        id: NCPI_CATALOG_CATEGORY_KEY.PARTICIPANT_COUNT,
        width: { max: "1.16fr", min: "116px" },
      },
    ],
    tableOptions: {
      initialState: {
        sorting: [
          {
            desc: SORT_DIRECTION.ASCENDING,
            id: NCPI_CATALOG_CATEGORY_KEY.PLATFORM,
          },
        ],
      },
    },
  } as ListConfig<NCPICatalogStudy>,
  listView: {
    disablePagination: true,
    enableDownload: true,
  },
  route: "studies",
  staticLoadFile: "files/ncpi-catalog/out/ncpi-platform-studies.json",
};
