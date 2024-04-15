import {
  HelpIconButton as DXHelpIconButton,
  HelpIconButtonProps as DXHelpIconButtonProps,
} from "@clevercanary/data-explorer-ui/lib/components/common/Button/components/HelpIconButton/helpIconButton";
import { useConfig } from "@clevercanary/data-explorer-ui/lib/hooks/useConfig";
import { getURL } from "../../../../../../mdx-components";
import { SiteConfig } from "../../../../../../site-config/common/entities";

export const HelpIconButton = ({
  url,
  ...props
}: DXHelpIconButtonProps): JSX.Element => {
  const { config } = useConfig();
  const { browserURL, portalURL } = config as SiteConfig;
  return (
    <DXHelpIconButton url={getURL(url, browserURL, portalURL)} {...props} />
  );
};
