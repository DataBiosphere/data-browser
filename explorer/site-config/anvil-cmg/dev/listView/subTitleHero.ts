import {
  ComponentConfig,
  ComponentsConfig,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "../../../../app/components";

export const subTitleHero: ComponentsConfig = [
  {
    component: C.NIHAccountExpiryWarning,
  } as ComponentConfig<typeof C.NIHAccountExpiryWarning>,
  {
    component: C.TerraSetUpForm,
  } as ComponentConfig<typeof C.TerraSetUpForm>,
];
