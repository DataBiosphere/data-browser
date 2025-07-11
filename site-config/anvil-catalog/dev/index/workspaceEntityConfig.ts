import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
import { AnVILCatalogWorkspace } from "../../../../app/apis/catalog/anvil-catalog/common/entities";
import {
  anvilCatalogWorkspaceInputMapper,
  getWorkspaceId,
} from "../../../../app/apis/catalog/anvil-catalog/common/utils";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";
import {
  ANVIL_CATALOG_CATEGORY_KEY,
  ANVIL_CATALOG_CATEGORY_LABEL,
} from "../../category";

/**
 * Entity config object responsible to config anything related to the /workspaces route.
 */
export const workspaceEntityConfig: EntityConfig<AnVILCatalogWorkspace> = {
  detail: {
    detailOverviews: [],
    staticLoad: false,
    tabs: [],
    top: [],
  },
  entityMapper: anvilCatalogWorkspaceInputMapper,
  exploreMode: EXPLORE_MODE.CS_FETCH_CS_FILTERING,
  getId: getWorkspaceId,
  label: "Workspaces",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.Link,
          viewBuilder: V.buildConsortium,
        } as ComponentConfig<typeof C.Link>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.CONSORTIUM,
        id: ANVIL_CATALOG_CATEGORY_KEY.CONSORTIUM,
        width: { max: "1fr", min: "120px" },
      },
      {
        columnPinned: true,
        componentConfig: {
          component: C.Link,
          viewBuilder: V.buildTerraWorkspaceName,
        } as ComponentConfig<typeof C.Link>,
        header: "Terra Workspace", // TODO revisit header
        id: ANVIL_CATALOG_CATEGORY_KEY.WORKSPACE_NAME,
        width: { max: "1fr", min: "360px" },
      },
      {
        componentConfig: {
          component: C.Link,
          viewBuilder: V.buildStudyName,
        } as ComponentConfig<typeof C.Link>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.STUDY_NAME,
        id: ANVIL_CATALOG_CATEGORY_KEY.STUDY_NAME,
        width: { max: "1fr", min: "360px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildDbGapId,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.DB_GAP_ID,
        id: ANVIL_CATALOG_CATEGORY_KEY.DB_GAP_ID,
        width: { max: "1.24fr", min: "124px" },
      },
      {
        componentConfig: {
          component: C.ConsentCodesCell,
          viewBuilder: V.buildConsentCode,
        } as ComponentConfig<typeof C.ConsentCodesCell>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.CONSENT_CODE,
        id: ANVIL_CATALOG_CATEGORY_KEY.CONSENT_CODE,
        width: { max: "1.6fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildDiseases,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.DISEASE,
        id: ANVIL_CATALOG_CATEGORY_KEY.DISEASE,
        width: { max: "1.6fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildDataTypes,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.DATA_TYPE,
        id: ANVIL_CATALOG_CATEGORY_KEY.DATA_TYPE,
        width: { max: "1.6fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildStudyDesigns,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.STUDY_DESIGN,
        id: ANVIL_CATALOG_CATEGORY_KEY.STUDY_DESIGN,
        width: { max: "1.6fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildParticipantCount,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.PARTICIPANT_COUNT,
        id: ANVIL_CATALOG_CATEGORY_KEY.PARTICIPANT_COUNT,
        width: { max: "1.16fr", min: "116px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildBucketSize,
        } as ComponentConfig<typeof C.BasicCell>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.BUCKET_SIZE,
        id: ANVIL_CATALOG_CATEGORY_KEY.BUCKET_SIZE,
        width: "max-content",
      },
    ],
    tableOptions: {
      initialState: {
        sorting: [
          {
            desc: SORT_DIRECTION.ASCENDING,
            id: ANVIL_CATALOG_CATEGORY_KEY.CONSORTIUM,
          },
        ],
      },
    },
  } as ListConfig<AnVILCatalogWorkspace>,
  listView: {
    disablePagination: true,
    enableDownload: true,
  },
  route: "workspaces",
  staticLoadFile: "files/anvil-catalog/out/anvil-workspaces.json",
  ui: { enableTabs: true },
};
