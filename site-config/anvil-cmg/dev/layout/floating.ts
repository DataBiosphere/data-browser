import { ViewSupport } from "@databiosphere/findable-ui/lib/components/Support/components/ViewSupport/viewSupport";
import {
  ComponentConfig,
  FloatingConfig,
} from "@databiosphere/findable-ui/lib/config/entities";

export function makeFloatingConfig(portalUrl: string): FloatingConfig {
  return {
    components: [
      {
        component: ViewSupport,
        props: {
          url: `${portalUrl}/help`,
        },
      } as ComponentConfig<typeof ViewSupport>,
    ],
  };
}
