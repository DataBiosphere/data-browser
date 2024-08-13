import {
  HelpIconButton as DXHelpIconButton,
  HelpIconButtonProps as DXHelpIconButtonProps,
} from "@databiosphere/findable-ui/lib/components/common/Button/components/HelpIconButton/helpIconButton";
import { useConfig } from "@databiosphere/findable-ui/lib/hooks/useConfig";
import { SiteConfig } from "../../../../../../../site-config/common/entities";
import { replaceParameters } from "../Link/common/utils";

export const HelpIconButton = ({
  url,
  ...props
}: DXHelpIconButtonProps): JSX.Element => {
  const { config } = useConfig();
  const { browserURL, portalURL = "{portalURL}" } = config as SiteConfig;
  return (
    <DXHelpIconButton
      url={replaceParameters(url, { browserURL, portalURL })}
      {...props}
    />
  );
};
