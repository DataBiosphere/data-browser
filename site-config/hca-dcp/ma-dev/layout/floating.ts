import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "app/components";
import * as V from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import { SiteConfig } from "../../../common/entities";

/**
 * Returns the floating configuration for the HCA DCP MA-DEV environment.
 * @returns Floating configuration.
 */
export function getFloating(): SiteConfig["layout"]["floating"] {
  return {
    components: [
      {
        component: C.CookieBanner,
        viewBuilder: V.buildCookieBanner,
      } as ComponentConfig<typeof C.CookieBanner>,
    ],
  };
}
