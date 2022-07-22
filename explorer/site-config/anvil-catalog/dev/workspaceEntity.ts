import * as T from "./workspaceTransformer";
import * as C from "../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../app/config/model";
import { AnvilSourceItem } from "./../../../app/models/responses";
import { SOURCE_FIELD_KEY, SOURCE_FIELD_TYPE } from "../tsv-config";

/**
 * Entity config object responsible to config anything related to the /explore/workspaces route.
 */
export const workspaceEntity: EntityConfig<AnvilSourceItem> = {
  detail: {
    tabs: [],
    top: [],
  },
  label: "Workspaces",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.Text,
          transformer: T.workspaceToStudyNameColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Study name",
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.workspaceToConsortiaColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Consortia",
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.workspaceToDiseaseColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Disease",
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.workspaceToDataTypeColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Data type",
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: C.Text,
          transformer: T.workspaceToIndicationColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Disease (indication)",
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
          transformer: T.workspaceToParticipantsColumn,
        } as ComponentConfig<typeof C.Text>,
        header: "Participants",
        width: { max: "2fr", min: "240px" },
      },
    ],
  } as ListConfig<AnvilSourceItem>,
  route: "workspaces",
  tsv: {
    path: "dashboard-source-anvil.tsv",
    sourceFieldKey: SOURCE_FIELD_KEY,
    sourceFieldType: SOURCE_FIELD_TYPE,
  },
};
