import { SiteConfig as DXSiteConfig } from "@databiosphere/findable-ui/lib/config/entities";

export interface SiteConfig extends DXSiteConfig {
  portalURL?: string;
}
