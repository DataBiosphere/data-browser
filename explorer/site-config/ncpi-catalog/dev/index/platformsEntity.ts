import { NCPICatalogPlatform } from "../../../../app/apis/catalog/ncpi-catalog/common/entities";
import { buildNCPICatalogPlatforms } from "../../../../app/apis/catalog/ncpi-catalog/common/utils";
import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/common/entities";
import * as ViewBuilder from "../../../../app/viewModelBuilders/ncpi-catalog/common/viewModelBuilders";
import { SOURCE_FIELD_KEY, SOURCE_FIELD_TYPE } from "../../tsv-config";

/**
 * Entity config object responsible for config related to the /explore/platforms route.
 */
export const platformsEntity: EntityConfig<NCPICatalogPlatform> = {
  detail: {
    staticLoad: true,
    tabs: [],
    top: [],
  },
  label: "Platforms",
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
          sortKey: "platforms", // platform - a singular platform.
        },
        width: { max: "1fr", min: "100px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildStudyNames,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Study",
        sort: {
          sortKey: "studyName", // studyNames - a list of study names.
        },
        width: { max: "2fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildDbGapIds,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "dbGap Id",
        sort: {
          sortKey: "dbGapId", // dbGapIds - a list of study identifiers.
        },
        width: { max: "1.24fr", min: "124px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildFocusDiseases,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Focus / Disease",
        sort: {
          sortKey: "focusDisease", // focusDiseases - a list of focuses / diseases.
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
          sortKey: "dataTypes",
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
          sortKey: "studyDesigns",
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
          sortKey: "consentCodes",
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
          sortKey: "participantCount",
        },
        width: { max: "1.16fr", min: "116px" },
      },
    ],
  } as ListConfig<NCPICatalogPlatform>,
  route: "platforms",
  tsv: {
    builderFn: buildNCPICatalogPlatforms,
    path: "ncpi-dataset-catalog-results.tsv",
    sourceFieldKey: SOURCE_FIELD_KEY,
    sourceFieldType: SOURCE_FIELD_TYPE,
  },
};
