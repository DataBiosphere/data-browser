import {
  ComponentConfig,
  ComponentsConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../../app/components";
import * as MDX from "../../../../app/components/common/MDXContent/anvil-cmg";
import * as V from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

export const filesEntityListSlot: ComponentsConfig = [
  {
    component: MDX.AlertEntityListWarning,
    viewBuilder: V.buildAlertEntityListWarning,
  } as ComponentConfig<typeof MDX.AlertEntityListWarning>,
  {
    component: C.AzulFileDownloadVisibilityController,
  } as ComponentConfig<typeof C.AzulFileDownloadVisibilityController>,
];
