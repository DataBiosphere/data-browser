import {
  CallToActionButton,
  CallToActionButtonProps,
} from "@databiosphere/findable-ui/lib/components/common/Button/components/CallToActionButton/callToActionButton";
import {
  Link,
  LinkProps,
} from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { useConfig } from "@databiosphere/findable-ui/lib/hooks/useConfig";
import { SiteConfig } from "../../../../../../../../../site-config/common/entities";
import { StyledBackPageHeroActions } from "./backPageHeroActions.styles";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";

export interface BackPageHeroActionsProps {
  callToActionProps: CallToActionButtonProps;
  linkProps?: Omit<LinkProps, "url"> & { getURL: (origin?: string) => string };
}

export const BackPageHeroActions = ({
  callToActionProps,
  linkProps,
}: BackPageHeroActionsProps): JSX.Element => {
  const { config } = useConfig() as { config: SiteConfig };
  const { getURL, label, ...otherProps } = linkProps || {};
  const linkUrl = getURL?.(config.portalURL);
  return (
    <StyledBackPageHeroActions>
      {linkUrl && (
        <Link
          TypographyProps={{ variant: TYPOGRAPHY_PROPS.VARIANT.BODY_500 }}
          {...otherProps}
          label={label}
          url={linkUrl}
        />
      )}
      <CallToActionButton {...callToActionProps} />
    </StyledBackPageHeroActions>
  );
};
