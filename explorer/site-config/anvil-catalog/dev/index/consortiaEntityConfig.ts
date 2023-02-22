import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
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
import { studiesMainColumn } from "../detail/consortium/studiesMainColumn";
import { top } from "../detail/consortium/top";
import { workspacesMainColumn } from "../detail/consortium/workspacesMainColumn";

/**
 * Entity config object responsible to config anything related to the /explore/consortia route.
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
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildConsentCodes,
        } as ComponentConfig<typeof Components.NTagCell>,
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
    ],
    defaultSort: {
      desc: SORT_DIRECTION.ASCENDING,
      id: ANVIL_CATALOG_CATEGORY_KEY.CONSORTIUM,
    },
  } as ListConfig<AnVILCatalogConsortium>,
  listView: {
    disablePagination: true,
  },
  route: "consortia",
  staticEntityImportMapper: anvilCatalogConsortiumInputMapper,
  staticLoad: true,
  staticLoadFile: "files/anvil-catalog/out/anvil-consortia.json",
};
