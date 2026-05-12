import {
  ComponentConfig,
  EntityUIConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../../../../app/components";

export const SLOTS: EntityUIConfig["slots"] = {
  entityViewSlot: [
    {
      component: C.TerraSetUpForm,
    } as ComponentConfig<typeof C.TerraSetUpForm>,
  ],
};
