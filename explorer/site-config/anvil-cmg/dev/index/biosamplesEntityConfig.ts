import { BioSamplesResponse } from "../../../../app/apis/azul/anvil-cmg/common/responses";
import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/common/entities";
import * as ViewBuilders from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

/**
 * Entity config object responsible for config related to the /explore/biosamples route.
 */
export const biosamplesEntityConfig: EntityConfig<BioSamplesResponse> = {
  apiPath: "index/biosamples",
  detail: {
    detailOverviews: [],
    staticLoad: false,
    tabs: [],
    top: [],
  },
  label: "BioSamples",
  list: {
    columns: [
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilders.buildBioSampleId,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Biosample Id",
        sort: {
          default: true,
          sortKey: "biosamples.biosample_id",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilders.buildBioSampleType,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Biosample Type",
        sort: {
          sortKey: "biosamples.biosample_type",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilders.buildOrganismTypes,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Organism Type",
        sort: {
          sortKey: "donors.organism_type",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilders.buildPhenotypicSexes,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Phenotypic Sex",
        sort: {
          sortKey: "donors.phenotypic_sex",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.Cell,
          viewBuilder: ViewBuilders.buildAnatomicalSite,
        } as ComponentConfig<typeof Components.Cell>,
        header: "Anatomical Site",
        sort: {
          sortKey: "biosamples.anatomical_site",
        },
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilders.buildDatasetTitles,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: "Dataset",
        sort: {
          sortKey: "datasets.title",
        },
        width: { max: "1fr", min: "200px" },
      },
    ],
  } as ListConfig<BioSamplesResponse>,
  route: "biosamples",
  staticLoad: false,
};