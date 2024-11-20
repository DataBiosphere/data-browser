import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { DatasetsResponse } from "../../../../../app/apis/azul/anvil-cmg/common/responses";
import * as C from "../../../../../app/components";
import * as V from "../../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

export const sideColumn = [
  {
    component: C.Details,
    viewBuilder: V.buildDatasetDetails,
  } as ComponentConfig<typeof C.Details, DatasetsResponse>,
];
