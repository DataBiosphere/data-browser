import { SiteConfig as DXSiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";

export interface SiteConfig extends DXSiteConfig {
  portalURL?: string;
}
