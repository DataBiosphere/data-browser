import { NCPICatalogDataset } from "../../../../app/apis/ncpi-catalog/common/entities";
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
 */
export const studiesEntityConfig: EntityConfig<NCPICatalogDataset> = {
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
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildPlatforms,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Platform",
        sort: {
          default: true,
          sortKey: SOURCE_FIELD_KEY.PLATFORMS,
        },
        width: { max: "1fr", min: "100px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildStudy,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Study",
        sort: {
          sortKey: SOURCE_FIELD_KEY.STUDY,
        },
        width: { max: "2fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildDbGapId,
        } as ComponentConfig<typeof Components.Cell>,
        header: "dbGap Id",
        sort: {
          sortKey: SOURCE_FIELD_KEY.DB_GAP_ID,
        },
        width: { max: "1.24fr", min: "124px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildFocusDisease,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Focus / Disease",
        sort: {
          sortKey: SOURCE_FIELD_KEY.FOCUS_DISEASE,
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
          sortKey: SOURCE_FIELD_KEY.DATA_TYPES,
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
          sortKey: SOURCE_FIELD_KEY.STUDY_DESIGNS,
        },
        width: { max: "1.6fr", min: "160px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildConsentCodes,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Consent Code",
        sort: {
          sortKey: SOURCE_FIELD_KEY.CONSENT_CODES,
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
          sortKey: SOURCE_FIELD_KEY.PARTICIPANT_COUNT,
        },
        width: { max: "1.16fr", min: "116px" },
      },
    ],
  } as ListConfig<NCPICatalogDataset>,
  route: "studies",
  tsv: {
    path: "ncpi-dataset-catalog-results.tsv",
    sourceFieldKey: SOURCE_FIELD_KEY,
    sourceFieldType: SOURCE_FIELD_TYPE,
  },
};
