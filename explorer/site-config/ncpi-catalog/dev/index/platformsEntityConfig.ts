import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import { NCPICatalogPlatform } from "../../../../app/apis/catalog/ncpi-catalog/common/entities";
import {
  getPlatformId,
  NCPIPlatformInputMapper,
} from "../../../../app/apis/catalog/ncpi-catalog/common/utils";
import * as Components from "../../../../app/components";
import * as ViewBuilder from "../../../../app/viewModelBuilders/catalog/ncpi-catalog/common/viewModelBuilders";
import {
  NCPI_CATALOG_CATEGORY_KEY,
  NCPI_CATALOG_CATEGORY_LABEL,
} from "../../category";

/**
 * Entity config object responsible for config related to the /explore/platforms route.
 */
export const platformsEntityConfig: EntityConfig<NCPICatalogPlatform> = {
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
        header: NCPI_CATALOG_CATEGORY_LABEL.PLATFORM,
        id: NCPI_CATALOG_CATEGORY_KEY.PLATFORM, // platform - a singular platform.
        width: { max: "1fr", min: "100px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildStudyNames,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: NCPI_CATALOG_CATEGORY_LABEL.TITLE,
        id: NCPI_CATALOG_CATEGORY_KEY.TITLE, // studyNames - a list of study names.
        width: { max: "2fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDbGapIds,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: NCPI_CATALOG_CATEGORY_LABEL.DB_GAP_ID,
        id: NCPI_CATALOG_CATEGORY_KEY.DB_GAP_ID, // dbGapIds - a list of study identifiers.
        width: { max: "1.24fr", min: "124px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildFocusDiseases,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: NCPI_CATALOG_CATEGORY_LABEL.FOCUS,
        id: NCPI_CATALOG_CATEGORY_KEY.FOCUS, // focusDiseases - a list of focuses / diseases.
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
  } as ListConfig<NCPICatalogPlatform>,
  listView: {
    disablePagination: true,
  },
  route: "platforms",
  staticEntityImportMapper: NCPIPlatformInputMapper,
  staticLoad: true,
  staticLoadFile: "files/ncpi-catalog/out/ncpi-platforms.json",
};
