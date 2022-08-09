import * as ViewBuilder from "../../../../app/viewModelBuilders/anvil-catalog/common/viewModelBuilders";
import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/common/entities";
import { AnvilSourceItem } from "../../../../app/apis/anvil/common/entities";
import { SOURCE_FIELD_KEY, SOURCE_FIELD_TYPE } from "../../tsv-config";

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
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildConsortia,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Consortium",
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildStudyName,
        } as ComponentConfig<typeof Components.Text>,
        header: "Terra Workspace Name",
        width: { max: "1fr", min: "360px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildIndication,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Disease (indication)",
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildDataType,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Data type",
        width: { max: "2fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildStudyDesign,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Study Design",
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildParticipantCount,
        } as ComponentConfig<typeof Components.Cell>,
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
