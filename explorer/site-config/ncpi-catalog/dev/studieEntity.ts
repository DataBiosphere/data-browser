import * as T from "./studiesTransformer";
import * as C from "../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../app/config/common/entities";
import { NPCICatalogSourceItem } from "./../../../app/models/responses";
import { SOURCE_FIELD_KEY, SOURCE_FIELD_TYPE } from "../tsv-config";

/**
 * Entity config object responsible to config anything related to the /explore/workspaces route.
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
          component: C.Text,
          transformer: T.workspaceToPlatformColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Platform",
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.workspaceToStudyColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Study",
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.workspaceToDbGapColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "dbGap Id",
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.workspaceToFocusDiseaseColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Focus/Disease",
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.workspaceToDataTypeColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Data Type",
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.workspaceToStudyDesignColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Study Design",
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.workspaceToConsentCodeColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Consent Code",
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.workspaceToParticipantsColumn,
        } as ComponentConfig<typeof C.Text>,
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
