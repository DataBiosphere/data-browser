import { DatasetsResponse } from "../../../../app/apis/azul/anvil/common/responses";
import { getDatasetEntryId } from "../../../../app/apis/azul/anvil/common/transformers";
import * as Components from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "../../../../app/config/common/entities";
import * as ViewBuilder from "../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";
import { ANVIL_CATEGORY_KEY, ANVIL_CATEGORY_LABEL } from "../category";
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
          component: Components.Link,
          viewBuilder: ViewBuilder.buildDatasetName,
        } as ComponentConfig<typeof Components.Link>,
        header: ANVIL_CATEGORY_LABEL.DATASET_NAME,
        id: ANVIL_CATEGORY_KEY.DATASET_NAME,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildOrganismTypes,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: ANVIL_CATEGORY_LABEL.ORGANISM_TYPE,
        id: ANVIL_CATEGORY_KEY.ORGANISM_TYPE,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildPhenotypicSexes,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: ANVIL_CATEGORY_LABEL.PHENOTYPIC_SEX,
        id: ANVIL_CATEGORY_KEY.PHENOTYPIC_SEX,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildReportedEthnicities,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: ANVIL_CATEGORY_LABEL.REPORTED_ETHNICITY,
        id: ANVIL_CATEGORY_KEY.REPORTED_ETHNICITY,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildPrepMaterialNames,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: ANVIL_CATEGORY_LABEL.LIBRARY_PREPARATION,
        id: ANVIL_CATEGORY_KEY.LIBRARY_PREPARATION,
        width: { max: "1fr", min: "200px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: Components.NTagCell,
          viewBuilder: ViewBuilder.buildDataModality,
        } as ComponentConfig<typeof Components.NTagCell>,
        header: ANVIL_CATEGORY_LABEL.DATA_MODALITY,
        id: ANVIL_CATEGORY_KEY.DATA_MODALITY,
        width: { max: "1fr", min: "148px" },
      },
    ],
    defaultSort: {
      desc: SORT_DIRECTION.ASCENDING,
      id: ANVIL_CATEGORY_KEY.DATASET_NAME,
    },
  } as ListConfig<DatasetsResponse>,
  route: "datasets",
  staticLoad: false,
};
