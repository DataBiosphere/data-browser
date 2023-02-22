import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "../../../../../app/components";
import * as T from "../../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";

export const sideColumn = [
  {
    component: C.Details,
    viewBuilder: T.buildDatasetDetails,
  } as ComponentConfig<typeof C.Details>,
];
