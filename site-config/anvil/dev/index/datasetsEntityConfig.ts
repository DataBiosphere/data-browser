import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
import { DatasetsResponse } from "../../../../app/apis/azul/anvil/common/responses";
import { getDatasetEntryId } from "../../../../app/apis/azul/anvil/common/transformers";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";
import { ANVIL_CATEGORY_KEY, ANVIL_CATEGORY_LABEL } from "../category";
import { mainColumn } from "../detail/dataset/overviewMainColumn";
import { sideColumn } from "../detail/dataset/overviewSideColumn";
import { top } from "../detail/dataset/top";

/**
 * Entity config object responsible for config related to the /datasets route.
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
  exploreMode: EXPLORE_MODE.SS_FETCH_SS_FILTERING,
  getId: getDatasetEntryId,
  label: "Datasets",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.Link,
          viewBuilder: V.buildDatasetName,
        } as ComponentConfig<typeof C.Link>,
        header: ANVIL_CATEGORY_LABEL.DATASET_NAME,
        id: ANVIL_CATEGORY_KEY.DATASET_NAME,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildOrganismTypes,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CATEGORY_LABEL.ORGANISM_TYPE,
        id: ANVIL_CATEGORY_KEY.ORGANISM_TYPE,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildPhenotypicSexes,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CATEGORY_LABEL.PHENOTYPIC_SEX,
        id: ANVIL_CATEGORY_KEY.PHENOTYPIC_SEX,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildReportedEthnicities,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CATEGORY_LABEL.REPORTED_ETHNICITY,
        id: ANVIL_CATEGORY_KEY.REPORTED_ETHNICITY,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildPrepMaterialNames,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CATEGORY_LABEL.LIBRARY_PREPARATION,
        id: ANVIL_CATEGORY_KEY.LIBRARY_PREPARATION,
        width: { max: "1fr", min: "200px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildDataModality,
        } as ComponentConfig<typeof C.NTagCell>,
        header: ANVIL_CATEGORY_LABEL.DATA_MODALITY,
        id: ANVIL_CATEGORY_KEY.DATA_MODALITY,
        width: { max: "1fr", min: "148px" },
      },
    ],
    tableOptions: {
      initialState: {
        sorting: [
          {
            desc: SORT_DIRECTION.ASCENDING,
            id: ANVIL_CATEGORY_KEY.DATASET_NAME,
          },
        ],
      },
    },
  } as ListConfig<DatasetsResponse>,
  route: "datasets",
};
