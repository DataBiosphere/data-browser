import { LinkProps as DXLinkProps } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import { useConfig } from "@clevercanary/data-explorer-ui/lib/hooks/useConfig";
import { getURL } from "../../../../../../mdx-components";
import { SiteConfig } from "../../../../../../site-config/common/entities";
import { Link as ContentLink } from "./link.styles";

export const Link = ({ url, ...props }: DXLinkProps): JSX.Element => {
  const { config } = useConfig();
  const { browserURL, portalURL } = config as SiteConfig;
  return <ContentLink url={getURL(url, browserURL, portalURL)} {...props} />;
};
