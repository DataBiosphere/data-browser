import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import { AnVILCatalogStudy } from "../../../../app/apis/catalog/anvil-catalog/common/entities";
import {
  anvilCatalogStudyInputMapper,
  getStudyId,
} from "../../../../app/apis/catalog/anvil-catalog/common/utils";
import * as Components from "../../../../app/components";
import * as ViewBuilder from "../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";
import {
  ANVIL_CATALOG_CATEGORY_KEY,
  ANVIL_CATALOG_CATEGORY_LABEL,
} from "../../category";
import { mainColumn } from "../detail/study/overviewMainColumn";
import { sideColumn } from "../detail/study/overviewSideColumn";
import { top } from "../detail/study/top";
import { workspacesMainColumn } from "../detail/study/workspacesMainColumn";

/**
 * Entity config object responsible to config anything related to the /explore/studies route.
 */
export const studiesEntityConfig: EntityConfig<AnVILCatalogStudy> = {
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
        label: "Workspaces",
        mainColumn: workspacesMainColumn,
        route: "workspaces",
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
          component: Components.Link,
          viewBuilder: ViewBuilder.buildStudyName,
        } as ComponentConfig<typeof Components.Link>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.STUDY_NAME,
        id: ANVIL_CATALOG_CATEGORY_KEY.STUDY_NAME,
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildDbGapId,
        } as ComponentConfig<typeof Components.Cell>,
        header: ANVIL_CATALOG_CATEGORY_LABEL.DB_GAP_ID,
        id: ANVIL_CATALOG_CATEGORY_KEY.DB_GAP_ID,
        width: { max: "1fr", min: "120px" },
      },
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
        id: ANVIL_CATALOG_CATEGORY_KEY.WORKSPACE_NAME, // workspaceNames - a list of workspace names.
        width: { max: "1fr", min: "120px" },
      },
      // {
      //   componentConfig: {
      //     component: Components.Cell,
      //     viewBuilder: ViewBuilder.buildTerraWorkspaceCount,
      //   } as ComponentConfig<typeof Components.Cell>,
      //   header: "Workspaces",
      //   id: "workspaceCount",
      //   width: { max: "1fr", min: "120px" },
      // },
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
      id: ANVIL_CATALOG_CATEGORY_KEY.STUDY_NAME,
    },
  } as ListConfig<AnVILCatalogStudy>,
  listView: {
    disablePagination: true,
  },
  route: "studies",
  staticEntityImportMapper: anvilCatalogStudyInputMapper,
  staticLoad: true,
  staticLoadFile: "files/anvil-catalog/out/anvil-studies.json",
};
