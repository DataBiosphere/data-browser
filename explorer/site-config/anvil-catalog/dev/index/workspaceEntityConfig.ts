import { AnVILCatalogWorkspace } from "../../../../app/apis/catalog/anvil-catalog/common/entities";
import {
  anvilCatalogWorkspaceInputMapper,
  getWorkspaceId,
} from "../../../../app/apis/catalog/anvil-catalog/common/utils";
import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/common/entities";
import * as ViewBuilder from "../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";
import { ANVIL_CATALOG_FILTER_CATEGORY_KEYS } from "../../filter-category-keys";

/**
 * Entity config object responsible to config anything related to the /explore/workspaces route.
 */
export const workspaceEntityConfig: EntityConfig<AnVILCatalogWorkspace> = {
  detail: {
    detailOverviews: [],
    staticLoad: false,
    tabs: [],
    top: [],
  },
  getId: getWorkspaceId,
  label: "Workspaces",
  list: {
    columns: [
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildConsortium,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Consortium",
        sort: {
          default: true,
          sortKey: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.CONSORTIUM,
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Link,
          viewBuilder: ViewBuilder.buildTerraWorkspaceName,
        } as ComponentConfig<typeof Components.Link>,
        header: "Terra Workspace",
        sort: {
          sortKey: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.WORKSPACE_NAME,
        },
        width: { max: "1fr", min: "360px" },
      },
      {
        componentConfig: {
          component: Components.Link,
          viewBuilder: ViewBuilder.buildStudyName,
        } as ComponentConfig<typeof Components.Link>,
        header: "Study",
        sort: {
          sortKey: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.STUDY_NAME,
        },
        width: { max: "1fr", min: "360px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildDbGapId,
        } as ComponentConfig<typeof Components.Cell>,
        header: "dbGap Id",
        sort: {
          default: true,
          sortKey: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.DB_GAP_ID,
        },
        width: { max: "1.24fr", min: "124px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildConsentCode,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Consent Code",
        sort: {
          default: true,
          sortKey: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.CONSENT_CODE,
        },
        width: { max: "1.6fr", min: "160px" },
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
        width: { max: "1.6fr", min: "160px" },
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
        width: { max: "1.6fr", min: "160px" },
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
        width: { max: "1.6fr", min: "160px" },
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
        width: { max: "1.16fr", min: "116px" },
      },
    ],
  } as ListConfig<AnVILCatalogWorkspace>,
  listView: {
    disablePagination: true,
  },
  route: "workspaces",
  staticEntityImportMapper: anvilCatalogWorkspaceInputMapper,
  staticLoad: true,
  staticLoadFile: "files/anvil-catalog/out/anvil-workspaces.json",
};
