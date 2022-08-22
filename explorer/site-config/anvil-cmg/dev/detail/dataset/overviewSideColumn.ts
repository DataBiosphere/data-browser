import * as C from "../../../../../app/components";
import { ComponentConfig } from "../../../../../app/config/common/entities";
import * as T from "../../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";

export const sideColumn = [
  {
    component: C.Details,
    viewBuilder: T.buildDatasetDetails,
  } as ComponentConfig<typeof C.Details>,
];
