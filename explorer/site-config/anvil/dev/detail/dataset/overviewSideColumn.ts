import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../../../app/components";
import * as V from "../../../../../app/viewModelBuilders/azul/anvil/common/viewModelBuilders";

export const sideColumn = [
  {
    component: C.Details,
    viewBuilder: V.buildDatasetDetails,
  } as ComponentConfig<typeof C.Details>,
];
