import { AnvilSourceItem } from "../../../../app/apis/anvil/common/entities";
import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/common/entities";
import * as ViewBuilder from "../../../../app/viewModelBuilders/anvil-catalog/common/viewModelBuilders";
import { SOURCE_FIELD_KEY, SOURCE_FIELD_TYPE } from "../../tsv-config";

/**
 * Entity config object responsible to config anything related to the /explore/workspaces route.
 name    status    consortium    phsId    library:dataUseRestriction    library:indication
 library:studyDesign    library:datatype    subjectCount    bucketName    sampleCount
 participantCount    familyCount    discoveryCount    bucketSize    requestorPays
 NRES    GRU    HMB    IRB    PUB    COL    NPU    MDS    GSO    DS    diseaseText
 consentLongName    consentTitle
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
        sort: {
          default: true,
          sortKey: "consortium",
        },
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildStudyName,
        } as ComponentConfig<typeof Components.Text>,
        header: "Terra Workspace Name",
        sort: {
          sortKey: "name",
        },
        width: { max: "1fr", min: "360px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildIndication,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Disease (indication)",
        sort: {
          sortKey: "library:indication",
        },
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildDataType,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Data type",
        sort: {
          sortKey: "library:datatype",
        },
        width: { max: "2fr", min: "120px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildStudyDesign,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Study Design",
        sort: {
          sortKey: "library:studyDesign",
        },
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildParticipantCount,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Participants",
        sort: {
          sortKey: "participantCount",
        },
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
