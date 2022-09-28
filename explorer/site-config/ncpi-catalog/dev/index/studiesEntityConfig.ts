import { NPCICatalogSourceItem } from "../../../../app/apis/ncpi-catalog/common/entities";
import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/common/entities";
import * as ViewBuilder from "../../../../app/viewModelBuilders/ncpi-catalog/common/viewModelBuilders";
import { SOURCE_FIELD_KEY, SOURCE_FIELD_TYPE } from "../../tsv-config";

/**
 * Entity config object responsible for config related to the /explore/studies route.
 * Platform    Study    dbGap Id    Study Accession
 * Focus / Disease    Data Type    Study Design    Consent Code
 * Participants
 * */

export const studiesEntityConfig: EntityConfig<NPCICatalogSourceItem> = {
  detail: {
    staticLoad: true,
    tabs: [],
    top: [],
  },
  label: "Studies",
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
          sortKey: "Platform",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildStudy,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Study",
        sort: {
          sortKey: "Study",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildDbGapId,
        } as ComponentConfig<typeof Components.Cell>,
        header: "dbGap Id",
        sort: {
          sortKey: "dbGap Id",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildFocusDisease,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Focus/Disease",
        sort: {
          sortKey: "Focus / Disease",
        },
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDataType,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Data Type",
        sort: {
          sortKey: "Data Type",
        },
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildStudyDesign,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Study Design",
        sort: {
          sortKey: "Study Design",
        },
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildConsentCode,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Consent Code",
        sort: {
          sortKey: "Consent Code",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildParticipants,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Participants",
        sort: {
          sortKey: "Participants",
        },
        width: { max: "2fr", min: "240px" },
      },
    ],
  } as ListConfig<NPCICatalogSourceItem>,
  route: "studies",
  tsv: {
    path: "ncpi-dataset-catalog-results.tsv",
    sourceFieldKey: SOURCE_FIELD_KEY,
    sourceFieldType: SOURCE_FIELD_TYPE,
  },
};
