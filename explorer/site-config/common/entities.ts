import { NavLinkItem as DXNavLinkItem } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/navigation";
import { HeaderProps as DXHeader } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/header";
import { SiteConfig as DXSiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";

export type DXLayout = DXSiteConfig["layout"];

export interface Header extends Omit<DXHeader, "navLinks"> {
  navLinks: NavLinkItem[];
}

export interface Layout extends Omit<DXLayout, "header"> {
  header: Header;
}

export interface NavLinkItem extends DXNavLinkItem {
  featureFlag?: boolean;
}

export interface SiteConfig extends Omit<DXSiteConfig, "layout"> {
  layout: Layout;
}
