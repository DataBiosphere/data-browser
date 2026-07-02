import { ViewSupport } from "@databiosphere/findable-ui/lib/components/Support/components/ViewSupport/viewSupport";
import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "app/components";
import * as V from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import { SiteConfig } from "../../../common/entities";

export function getFloating(
  portalUrl: string
): SiteConfig["layout"]["floating"] {
  return {
    components: [
      {
        component: C.CookieBanner,
        viewBuilder: V.buildCookieBanner,
      } as ComponentConfig<typeof C.CookieBanner>,
      {
        component: ViewSupport,
        props: {
          url: `${portalUrl}/help`,
        },
      } as ComponentConfig<typeof ViewSupport>,
    ],
  };
}
