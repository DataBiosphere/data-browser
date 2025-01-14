import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode";
import { NCPICatalogPlatform } from "../../../../app/apis/catalog/ncpi-catalog/common/entities";
import {
  getPlatformId,
  NCPIPlatformInputMapper,
} from "../../../../app/apis/catalog/ncpi-catalog/common/utils";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/catalog/ncpi-catalog/common/viewModelBuilders";
import {
  NCPI_CATALOG_CATEGORY_KEY,
  NCPI_CATALOG_CATEGORY_LABEL,
} from "../../category";

/**
 * Entity config object responsible for config related to the /platforms route.
 */
export const platformsEntityConfig: EntityConfig<NCPICatalogPlatform> = {
  detail: {
    detailOverviews: [],
    staticLoad: true,
    tabs: [],
    top: [],
  },
  entityMapper: NCPIPlatformInputMapper,
  exploreMode: EXPLORE_MODE.CS_FETCH_CS_FILTERING,
  getId: getPlatformId,
  label: "Platforms",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildPlatform,
        } as ComponentConfig<typeof C.BasicCell>,
        header: NCPI_CATALOG_CATEGORY_LABEL.PLATFORM,
        id: NCPI_CATALOG_CATEGORY_KEY.PLATFORM, // platform - a singular platform.
        width: { max: "1fr", min: "100px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildStudyNames,
        } as ComponentConfig<typeof C.NTagCell>,
        header: NCPI_CATALOG_CATEGORY_LABEL.TITLE,
        id: NCPI_CATALOG_CATEGORY_KEY.TITLE, // studyNames - a list of study names.
        width: { max: "2fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildDbGapIds,
        } as ComponentConfig<typeof C.NTagCell>,
        header: NCPI_CATALOG_CATEGORY_LABEL.DB_GAP_ID,
        id: NCPI_CATALOG_CATEGORY_KEY.DB_GAP_ID, // dbGapIds - a list of study identifiers.
        width: { max: "1.24fr", min: "124px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildFocusDiseases,
        } as ComponentConfig<typeof C.NTagCell>,
        header: NCPI_CATALOG_CATEGORY_LABEL.FOCUS,
        id: NCPI_CATALOG_CATEGORY_KEY.FOCUS, // focusDiseases - a list of focuses / diseases.
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
  } as ListConfig<NCPICatalogPlatform>,
  listView: {
    disablePagination: true,
    enableDownload: true,
  },
  route: "platforms",
  staticLoadFile: "files/ncpi-catalog/out/ncpi-platforms.json",
};
