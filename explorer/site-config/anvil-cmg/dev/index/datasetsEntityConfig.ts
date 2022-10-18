import { DatasetsResponse } from "../../../../app/apis/azul/anvil-cmg/common/responses";
import { getDatasetEntryId } from "../../../../app/apis/azul/anvil-cmg/common/transformers";
import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/common/entities";
import * as ViewBuilder from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import { mainColumn } from "../detail/dataset/overviewMainColumn";
import { sideColumn } from "../detail/dataset/overviewSideColumn";
import { top } from "../detail/dataset/top";

/**
 * Entity config object responsible for config related to the /explore/datasets route.
 */
export const datasetsEntityConfig: EntityConfig<DatasetsResponse> = {
  apiPath: "index/datasets",
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
    ],
    top: top,
  },
  getId: getDatasetEntryId,
  label: "Datasets",
  list: {
    columns: [
      {
        componentConfig: {
          component: Components.Links,
          viewBuilder: ViewBuilder.buildDatasetTitle,
        } as ComponentConfig<typeof Components.Links>,
        header: "Dataset",
        sort: {
          default: true,
          sortKey: "title",
        },
        width: { max: "2fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildRegisteredIdentifier,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Identifier",
        sort: {
          sortKey: "registered_identifier",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilder.buildConsentGroup,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Consent Group",
        sort: {
          sortKey: "consent_group",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildOrganismTypes,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Organism Type",
        sort: {
          sortKey: "organism_type",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildPhenotypicSexes,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Phenotypic Sex",
        sort: {
          sortKey: "phenotypic_sex",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildReportedEthnicities,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Reported Ethnicity",
        sort: {
          sortKey: "reported_ethnicity",
        },
        width: { max: "1fr", min: "200px" },
      },
      // {
      //   componentConfig: {
      //     component: Components.NTagCell,
      //     viewBuilder: ViewBuilder.buildPrepMaterialNames,
      //   } as ComponentConfig<typeof Components.NTagCell>,
      //   header: "Library Preparation",
      //   sort: {
      //     sortKey: "prep_material_name",
      //   },
      //   width: { max: "1fr", min: "200px" },
      // },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDataModality,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Data Modality",
        hiddenColumn: true,
        sort: {
          sortKey: "data_modality",
        },
        width: { max: "1fr", min: "148px" },
      },
    ],
  } as ListConfig<DatasetsResponse>,
  route: "datasets",
};
