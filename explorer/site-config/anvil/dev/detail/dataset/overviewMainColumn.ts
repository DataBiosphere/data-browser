import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "app/components";
import { DatasetsResponse } from "../../../../../app/apis/azul/anvil/common/responses";
import * as V from "../../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";

export const mainColumn = [
  {
    component: C.Description,
    viewBuilder: V.buildDatasetDescription,
  } as ComponentConfig<typeof C.Description, DatasetsResponse>,
];
