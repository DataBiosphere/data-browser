import * as T from "../../../app/viewModelBuilders/ncpi-catalog/common/viewModelBuilders";
import * as C from "../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../app/config/common/entities";
import { SOURCE_FIELD_KEY, SOURCE_FIELD_TYPE } from "../tsv-config";
import { NPCICatalogSourceItem } from "../../../app/apis/ncpi-catalog/common/entities";

/**
 * Entity config object responsible for config related to the /explore/studies route.
 */
export const studiesEntity: EntityConfig<NPCICatalogSourceItem> = {
  detail: {
    tabs: [],
    top: [],
  },
  label: "Studies",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildPlatform,
        } as ComponentConfig<typeof C.Cell>,
        header: "Platform",
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildStudy,
        } as ComponentConfig<typeof C.Cell>,
        header: "Study",
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildDbGapId,
        } as ComponentConfig<typeof C.Cell>,
        header: "dbGap Id",
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildFocusDisease,
        } as ComponentConfig<typeof C.Cell>,
        header: "Focus/Disease",
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildDataType,
        } as ComponentConfig<typeof C.Cell>,
        header: "Data Type",
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildStudyDesign,
        } as ComponentConfig<typeof C.Cell>,
        header: "Study Design",
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildConsentCode,
        } as ComponentConfig<typeof C.Cell>,
        header: "Consent Code",
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Cell,
          transformer: T.buildParticipants,
        } as ComponentConfig<typeof C.Cell>,
        header: "Participants",
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
