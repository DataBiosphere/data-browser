import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { DatasetsResponse } from "../../../../../app/apis/azul/anvil-cmg/common/responses";
import * as C from "../../../../../app/components";
import * as T from "../../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

export const sideColumn = [
  {
    component: C.Details,
    viewBuilder: T.buildDatasetDetails,
  } as ComponentConfig<typeof C.Details, DatasetsResponse>,
];
