import { AnVILCatalogConsortium } from "../../../../app/apis/catalog/anvil-catalog/common/entities";
import {
  anvilCatalogConsortiumInputMapper,
  getConsortiumId,
} from "../../../../app/apis/catalog/anvil-catalog/common/utils";
import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/common/entities";
import * as ViewBuilder from "../../../../app/viewModelBuilders/anvil-catalog/common/viewModelBuilders";
import { ANVIL_CATALOG_FILTER_CATEGORY_KEYS } from "../../filter-category-keys";

/**
 * Entity config object responsible to config anything related to the /explore/consortia route.
 */
export const consortiaEntityConfig: EntityConfig<AnVILCatalogConsortium> = {
  detail: {
    detailOverviews: [],
    staticLoad: false,
    tabs: [],
    top: [],
  },
  getId: getConsortiumId,
  label: "Consortia",
  list: {
    columns: [
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildConsortium,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Consortium",
        sort: {
          sortKey: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.CONSORTIUM,
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDbGapIds,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "dbGap Id",
        sort: {
          default: true,
          sortKey: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.DB_GAP_ID,
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildConsentCodes,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Consent Codes",
        sort: {
          default: true,
          sortKey: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.CONSENT_CODE,
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDiseases,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Disease (indication)",
        sort: {
          sortKey: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.DISEASE,
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDataTypes,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Data Type",
        sort: {
          sortKey: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.DATA_TYPE,
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildStudyNames,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Study",
        sort: {
          sortKey: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.STUDY_NAME,
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildStudyDesigns,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Study Design",
        sort: {
          sortKey: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.STUDY_DESIGN,
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildTerraWorkspaceNames,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Workspaces",
        sort: {
          sortKey: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.WORKSPACE_NAME,
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildParticipantCount,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Participants",
        sort: {
          sortKey: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.PARTICIPANT_COUNT,
        },
        width: { max: "1fr", min: "120px" },
      },
    ],
  } as ListConfig<AnVILCatalogConsortium>,
  route: "consortia",
  staticEntityImportMapper: anvilCatalogConsortiumInputMapper,
  staticLoad: true,
  staticLoadFile: "files/anvil-catalog/out/anvil-consortia.json",
};
