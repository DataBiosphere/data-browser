import {
  ComponentConfig,
  ComponentsConfig,
} from "../../../../../../data-explorer/packages/data-explorer-ui/src/config/entities";
import * as C from "../../../../app/components";
import * as T from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

export const listHero: ComponentsConfig = [
  {
    component: C.Alert,
    viewBuilder: T.buildListWarning,
  } as ComponentConfig<typeof C.Alert>,
];
