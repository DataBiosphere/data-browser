import * as T from "./sampleTransformer";
import * as C from "../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../app/config/model";
import { SampleResponse } from "app/models/responses";

/**
 * Entity config object responsible to config anything related to the /explore/samples route.
 */
export const samplesEntity: EntityConfig<SampleResponse> = {
  label: "Samples",
  apiPath: "index/samples",
  route: "samples",
  list: {
    columns: [
      {
        header: "Sample ID",
        componentConfig: {
          component: C.Links,
          transformer: T.samplesToSampleIDColumn,
        } as ComponentConfig<typeof C.Links>,
      },
      {
        header: "Project Title",
        componentConfig: {
          component: C.Text,
          transformer: T.samplesToProjTitleColumn,
        } as ComponentConfig<typeof C.Text>,
      },
      {
        header: "Species",
        componentConfig: {
          component: C.Text,
          transformer: T.samplesToSpeciesColumn,
        } as ComponentConfig<typeof C.Text>,
      },
      {
        header: "Sample Type",
        componentConfig: {
          component: C.Text,
          transformer: T.samplesToSampleTypeColumn,
        } as ComponentConfig<typeof C.Text>,
      },
      {
        header: "Library Construction Approach",
        componentConfig: {
          component: C.Text,
          transformer: T.samplesToLibConsApproachColumn,
        } as ComponentConfig<typeof C.Text>,
      },
      {
        header: "Anatomical Entity",
        componentConfig: {
          component: C.Text,
          transformer: T.samplesToAnatomicalEntityColumn,
        } as ComponentConfig<typeof C.Text>,
      },
      {
        header: "Disease (Donor)",
        componentConfig: {
          component: C.Text,
          transformer: T.samplesToDiseaseDonorColumn,
        } as ComponentConfig<typeof C.Text>,
      },
      {
        header: "Cell Count Estimate",
        componentConfig: {
          component: C.Text,
          transformer: T.samplesToCellCountColumn,
        } as ComponentConfig<typeof C.Text>,
      },
    ],
  } as ListConfig<SampleResponse>,
};
