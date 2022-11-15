import { NCPICatalogPlatform } from "../../../../app/apis/catalog/ncpi-catalog/common/entities";
import {
  getPlatformId,
  NCPIPlatformInputMapper,
} from "../../../../app/apis/catalog/ncpi-catalog/common/utils";
import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/common/entities";
import * as ViewBuilder from "../../../../app/viewModelBuilders/ncpi-catalog/common/viewModelBuilders";
import { NCPI_CATALOG_FILTER_CATEGORY_KEYS } from "../../filter-category-keys";

/**
 * Entity config object responsible for config related to the /explore/platforms route.
 */
export const platformsEntity: EntityConfig<NCPICatalogPlatform> = {
  detail: {
    detailOverviews: [],
    staticLoad: true,
    tabs: [],
    top: [],
  },
  getId: getPlatformId,
  label: "Platforms",
  list: {
    columns: [
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildPlatform,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Platform",
        sort: {
          default: true,
          sortKey: NCPI_CATALOG_FILTER_CATEGORY_KEYS.PLATFORM, // platform - a singular platform.
        },
        width: { max: "1fr", min: "100px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildStudyNames,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Study",
        sort: {
          sortKey: NCPI_CATALOG_FILTER_CATEGORY_KEYS.TITLE, // studyNames - a list of study names.
        },
        width: { max: "2fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDbGapIds,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "dbGap Ids",
        sort: {
          sortKey: NCPI_CATALOG_FILTER_CATEGORY_KEYS.DB_GAP_ID, // dbGapIds - a list of study identifiers.
        },
        width: { max: "1.24fr", min: "124px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildFocusDiseases,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Focus / Disease",
        sort: {
          sortKey: NCPI_CATALOG_FILTER_CATEGORY_KEYS.FOCUS, // focusDiseases - a list of focuses / diseases.
        },
        width: { max: "1.6fr", min: "160px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDataTypes,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Data Type",
        sort: {
          sortKey: NCPI_CATALOG_FILTER_CATEGORY_KEYS.DATA_TYPE,
        },
        width: { max: "1.6fr", min: "160px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildStudyDesigns,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Study Design",
        sort: {
          sortKey: NCPI_CATALOG_FILTER_CATEGORY_KEYS.STUDY_DESIGN,
        },
        width: { max: "1.6fr", min: "160px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildConsentCodes,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Consent Code",
        sort: {
          sortKey: NCPI_CATALOG_FILTER_CATEGORY_KEYS.CONSENT_CODE,
        },
        width: { max: "1.6fr", min: "160px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildParticipantCount,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Participants",
        sort: {
          sortKey: NCPI_CATALOG_FILTER_CATEGORY_KEYS.PARTICIPANT_COUNT,
        },
        width: { max: "1.16fr", min: "116px" },
      },
    ],
  } as ListConfig<NCPICatalogPlatform>,
  route: "platforms",
  staticEntityImportMapper: NCPIPlatformInputMapper,
  staticLoad: true,
  staticLoadFile: "files/ncpi-catalog/out/ncpi-platforms.json",
};
