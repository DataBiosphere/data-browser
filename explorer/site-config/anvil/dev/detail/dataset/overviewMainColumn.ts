// App dependencies
import { DatasetsResponse } from "../../../../../app/apis/azul/anvil/common/entities";
import * as C from "app/components";
import { ComponentConfig } from "app/config/model";
import * as T from "../../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";

export const mainColumn = [
  {
    component: C.Description,
    transformer: T.buildDatasetDescription,
  } as ComponentConfig<typeof C.Description, DatasetsResponse>,
];
