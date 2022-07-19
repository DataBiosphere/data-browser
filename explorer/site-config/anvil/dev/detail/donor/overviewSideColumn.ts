import * as C from "../../../../../app/components";
import { ComponentConfig } from "../../../../../app/config/model";
import * as T from "../../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";

export const sideColumn = [
  {
    component: C.Details,
    transformer: T.buildDatasetDetails,
  } as ComponentConfig<typeof C.Details>,
];
