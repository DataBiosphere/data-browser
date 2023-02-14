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
  SORT_DIRECTION,
} from "../../../../app/config/common/entities";
import * as ViewBuilder from "../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";
import {
  ANVIL_CATALOG_CATEGORY_KEY,
  ANVIL_CATALOG_CATEGORY_LABEL,
} from "../../category";

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
          component: Components.Link,
          viewBuilder: ViewBuilder.buildConsortium,
        } as ComponentConfig<typeof Components.Link>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.CONSORTIUM,
        id: ANVIL_CATALOG_CATEGORY_KEY.CONSORTIUM,
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Link,
          viewBuilder: ViewBuilder.buildTerraWorkspaceName,
        } as ComponentConfig<typeof Components.Link>,
        header: "Terra Workspace", // TODO revisit header
        id: ANVIL_CATALOG_CATEGORY_KEY.WORKSPACE_NAME,
        width: { max: "1fr", min: "360px" },
      },
      {
        componentConfig: {
          component: Components.Link,
          viewBuilder: ViewBuilder.buildStudyName,
        } as ComponentConfig<typeof Components.Link>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.STUDY_NAME,
        id: ANVIL_CATALOG_CATEGORY_KEY.STUDY_NAME,
        width: { max: "1fr", min: "360px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildDbGapId,
        } as ComponentConfig<typeof Components.Cell>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.DB_GAP_ID,
        id: ANVIL_CATALOG_CATEGORY_KEY.DB_GAP_ID,
        width: { max: "1.24fr", min: "124px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildConsentCode,
        } as ComponentConfig<typeof Components.Cell>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.CONSENT_CODE,
        id: ANVIL_CATALOG_CATEGORY_KEY.CONSENT_CODE,
        width: { max: "1.6fr", min: "160px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDiseases,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.DISEASE,
        id: ANVIL_CATALOG_CATEGORY_KEY.DISEASE,
        width: { max: "1.6fr", min: "160px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDataTypes,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.DATA_TYPE,
        id: ANVIL_CATALOG_CATEGORY_KEY.DATA_TYPE,
        width: { max: "1.6fr", min: "160px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildStudyDesigns,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.STUDY_DESIGN,
        id: ANVIL_CATALOG_CATEGORY_KEY.STUDY_DESIGN,
        width: { max: "1.6fr", min: "160px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildParticipantCount,
        } as ComponentConfig<typeof Components.Cell>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.PARTICIPANT_COUNT,
        id: ANVIL_CATALOG_CATEGORY_KEY.PARTICIPANT_COUNT,
        width: { max: "1.16fr", min: "116px" },
      },
    ],
    defaultSort: {
      desc: SORT_DIRECTION.ASCENDING,
      id: ANVIL_CATALOG_CATEGORY_KEY.CONSORTIUM,
    },
  } as ListConfig<AnVILCatalogWorkspace>,
  listView: {
    disablePagination: true,
  },
  route: "workspaces",
  staticEntityImportMapper: anvilCatalogWorkspaceInputMapper,
  staticLoad: true,
  staticLoadFile: "files/anvil-catalog/out/anvil-workspaces.json",
};
