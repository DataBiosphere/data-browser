import * as C from "../../../../../app/components";
import { ComponentConfig } from "../../../../../app/config/common/entities";
import * as T from "../../../../../app/viewModelBuilders/anvil-catalog/common/viewModelBuilders";

export const sideColumn = [
  {
    component: C.Details,
    viewBuilder: T.buildStudyDetails,
  } as ComponentConfig<typeof C.Details>,
];
