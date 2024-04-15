import { Link as DXLink } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import { useConfig } from "@clevercanary/data-explorer-ui/lib/hooks/useConfig";
import { ReactNode } from "react";
import { getURL } from "../../../../../../mdx-components";
import { SiteConfig } from "../../../../../../site-config/common/entities";

interface LinkProps {
  children?: ReactNode;
  href?: string;
}

export const Link = ({ children, href = "" }: LinkProps): JSX.Element => {
  const { config } = useConfig();
  const { browserURL, portalURL } = config as SiteConfig;
  return <DXLink label={children} url={getURL(href, browserURL, portalURL)} />;
};
