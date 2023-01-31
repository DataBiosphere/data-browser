import { NCPICatalogStudy } from "../../../../app/apis/catalog/ncpi-catalog/common/entities";
import {
  getStudyId,
  NCPIStudyInputMapper,
} from "../../../../app/apis/catalog/ncpi-catalog/common/utils";
import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "../../../../app/config/common/entities";
import * as ViewBuilder from "../../../../app/viewModelBuilders/catalog/ncpi-catalog/common/viewModelBuilders";
import {
  NCPI_CATALOG_CATEGORY_KEY,
  NCPI_CATALOG_CATEGORY_LABEL,
} from "../../category";
import { mainColumn } from "../detail/study/overviewMainColumn";
import { sideColumn } from "../detail/study/overviewSideColumn";
import { top } from "../detail/study/top";

/**
 * Entity config object responsible for config related to the /explore/studies route.
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
  getId: getStudyId,
  label: "Studies",
  list: {
    columns: [
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildPlatforms,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: NCPI_CATALOG_CATEGORY_LABEL.PLATFORM,
        id: NCPI_CATALOG_CATEGORY_KEY.PLATFORM,
        width: { max: "1fr", min: "100px" },
      },
      {
        componentConfig: {
          component: Components.Link,
          viewBuilder: ViewBuilder.buildStudyTitle,
        } as ComponentConfig<typeof Components.Link>,
        header: NCPI_CATALOG_CATEGORY_LABEL.TITLE,
        id: NCPI_CATALOG_CATEGORY_KEY.TITLE,
        width: { max: "2fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildDbGapId,
        } as ComponentConfig<typeof Components.Cell>,
        header: NCPI_CATALOG_CATEGORY_LABEL.DB_GAP_ID,
        id: NCPI_CATALOG_CATEGORY_KEY.DB_GAP_ID,
        width: { max: "1.24fr", min: "124px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildFocus,
        } as ComponentConfig<typeof Components.Cell>,
        header: NCPI_CATALOG_CATEGORY_LABEL.FOCUS,
        id: NCPI_CATALOG_CATEGORY_KEY.FOCUS,
        width: { max: "1.6fr", min: "160px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDataTypes,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: NCPI_CATALOG_CATEGORY_LABEL.DATA_TYPE,
        id: NCPI_CATALOG_CATEGORY_KEY.DATA_TYPE,
        width: { max: "1.6fr", min: "160px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildStudyDesigns,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: NCPI_CATALOG_CATEGORY_LABEL.STUDY_DESIGN,
        id: NCPI_CATALOG_CATEGORY_KEY.STUDY_DESIGN,
        width: { max: "1.6fr", min: "160px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildConsentCodes,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: NCPI_CATALOG_CATEGORY_LABEL.CONSENT_CODE,
        id: NCPI_CATALOG_CATEGORY_KEY.CONSENT_CODE,
        width: { max: "1.6fr", min: "160px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildParticipantCount,
        } as ComponentConfig<typeof Components.Cell>,
        header: NCPI_CATALOG_CATEGORY_LABEL.PARTICIPANT_COUNT,
        id: NCPI_CATALOG_CATEGORY_KEY.PARTICIPANT_COUNT,
        width: { max: "1.16fr", min: "116px" },
      },
    ],
    defaultSort: {
      desc: SORT_DIRECTION.ASCENDING,
      id: NCPI_CATALOG_CATEGORY_KEY.PLATFORM,
    },
  } as ListConfig<NCPICatalogStudy>,
  listView: {
    disablePagination: true,
  },
  route: "studies",
  staticEntityImportMapper: NCPIStudyInputMapper,
  staticLoad: true,
  staticLoadFile: "files/ncpi-catalog/out/ncpi-platform-studies.json",
};
