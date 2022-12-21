import { AnVILCatalogStudy } from "../../../../app/apis/catalog/anvil-catalog/common/entities";
import {
  anvilCatalogStudyInputMapper,
  getStudyId,
} from "../../../../app/apis/catalog/anvil-catalog/common/utils";
import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/common/entities";
import * as ViewBuilder from "../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";
import { ANVIL_CATALOG_FILTER_CATEGORY_KEYS } from "../../filter-category-keys";
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
        header: "Study",
        sort: {
          default: true,
          sortKey: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.STUDY_NAME,
        },
        width: { max: "2fr", min: "240px" },
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
        width: { max: "1fr", min: "120px" },
      },
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
          sortKey: "workspaceName", // workspaceNames - a list of workspace names.
        },
        width: { max: "1fr", min: "120px" },
      },
      // {
      //   componentConfig: {
      //     component: Components.Cell,
      //     viewBuilder: ViewBuilder.buildTerraWorkspaceCount,
      //   } as ComponentConfig<typeof Components.Cell>,
      //   header: "Workspaces",
      //   sort: {
      //     sortKey: "workspaceCount",
      //   },
      //   width: { max: "1fr", min: "120px" },
      // },
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
  } as ListConfig<AnVILCatalogStudy>,
  listView: {
    disablePagination: true,
  },
  route: "studies",
  staticEntityImportMapper: anvilCatalogStudyInputMapper,
  staticLoad: true,
  staticLoadFile: "files/anvil-catalog/out/anvil-studies.json",
};
