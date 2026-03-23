import {
  ComponentConfig,
  ComponentsConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import * as MDX from "../../../../app/components/common/MDXContent/anvil-cmg";
import * as V from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

export const entityListSlot: ComponentsConfig = [
  {
    component: MDX.AlertEntityListWarning,
    viewBuilder: V.buildAlertEntityListWarning,
  } as ComponentConfig<typeof MDX.AlertEntityListWarning>,
];
