import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import { EXPLORE_MODE } from "@clevercanary/data-explorer-ui/lib/hooks/useExploreMode";
import { AnVILCatalogConsortium } from "../../../../app/apis/catalog/anvil-catalog/common/entities";
import {
  anvilCatalogConsortiumInputMapper,
  getConsortiumId,
} from "../../../../app/apis/catalog/anvil-catalog/common/utils";
import * as Components from "../../../../app/components";
import * as ViewBuilder from "../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";
import {
  ANVIL_CATALOG_CATEGORY_KEY,
  ANVIL_CATALOG_CATEGORY_LABEL,
} from "../../category";
import { mainColumn } from "../detail/consortium/overviewMainColumn";
import { sideColumn } from "../detail/consortium/overviewSideColumn";
import { studiesMainColumn } from "../detail/consortium/studiesMainColumn";
import { top } from "../detail/consortium/top";
import { workspacesMainColumn } from "../detail/consortium/workspacesMainColumn";

/**
 * Entity config object responsible to config anything related to the /consortia route.
 */
export const consortiaEntityConfig: EntityConfig<AnVILCatalogConsortium> = {
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
      {
        label: "Studies",
        mainColumn: studiesMainColumn,
        route: "studies",
      },
      {
        label: "Workspaces",
        mainColumn: workspacesMainColumn,
        route: "workspaces",
      },
    ],
    top: top,
  },
  entityMapper: anvilCatalogConsortiumInputMapper,
  exploreMode: EXPLORE_MODE.CS_FETCH_CS_FILTERING,
  getId: getConsortiumId,
  label: "Consortia",
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
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDbGapIds,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.DB_GAP_ID,
        id: ANVIL_CATALOG_CATEGORY_KEY.DB_GAP_ID,
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.ConsentCodesCell,
          viewBuilder: ViewBuilder.buildConsentCodes,
        } as ComponentConfig<typeof Components.ConsentCodesCell>,
        header: "Consent Codes", // TODO revisit header
        id: ANVIL_CATALOG_CATEGORY_KEY.CONSENT_CODE,
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDiseases,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.DISEASE,
        id: ANVIL_CATALOG_CATEGORY_KEY.DISEASE,
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDataTypes,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.DATA_TYPE,
        id: ANVIL_CATALOG_CATEGORY_KEY.DATA_TYPE,
        width: { max: "1fr", min: "120px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildStudyNames,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.STUDY_NAME,
        id: ANVIL_CATALOG_CATEGORY_KEY.STUDY_NAME,
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildStudyDesigns,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.STUDY_DESIGN,
        id: ANVIL_CATALOG_CATEGORY_KEY.STUDY_DESIGN,
        width: { max: "1fr", min: "120px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildTerraWorkspaceNames,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Workspaces",
        id: ANVIL_CATALOG_CATEGORY_KEY.WORKSPACE_NAME,
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildParticipantCount,
        } as ComponentConfig<typeof Components.Cell>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.PARTICIPANT_COUNT,
        id: ANVIL_CATALOG_CATEGORY_KEY.PARTICIPANT_COUNT,
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildBucketSize,
        } as ComponentConfig<typeof Components.Cell>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.BUCKET_SIZE,
        id: ANVIL_CATALOG_CATEGORY_KEY.BUCKET_SIZE,
        width: "max-content",
      },
    ],
    defaultSort: {
      desc: SORT_DIRECTION.ASCENDING,
      id: ANVIL_CATALOG_CATEGORY_KEY.CONSORTIUM,
    },
  } as ListConfig<AnVILCatalogConsortium>,
  listView: {
    disablePagination: true,
    enableDownload: true,
  },
  route: "consortia",
  staticLoadFile: "files/anvil-catalog/out/anvil-consortia.json",
};
