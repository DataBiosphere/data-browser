import * as ViewBuilder from "./workspaceTransformer";
import * as Components from "../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../app/config/common/entities";
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
          component: Components.Text,
          viewBuilder: ViewBuilder.workspaceToConsortiaColumn,
        } as ComponentConfig<typeof Components.Text>,
        header: "Consortium",
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: ViewBuilder.workspaceToStudyNameColumn,
        } as ComponentConfig<typeof Components.Text>,
        header: "Terra Workspace Name",
        width: { max: "1fr", min: "360px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: ViewBuilder.workspaceToIndicationColumn,
        } as ComponentConfig<typeof Components.Text>,
        header: "Disease (indication)",
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: ViewBuilder.workspaceToDataTypeColumn,
        } as ComponentConfig<typeof Components.Text>,
        header: "Data type",
        width: { max: "2fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: ViewBuilder.workspaceToStudyDesignColumn,
        } as ComponentConfig<typeof Components.Text>,
        header: "Study Design",
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: Components.Text,
          viewBuilder: ViewBuilder.workspaceToParticipantsColumn,
        } as ComponentConfig<typeof Components.Text>,
        header: "Participants",
        width: { max: "2fr", min: "120px" },
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
