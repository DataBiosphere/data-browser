import { BUTTON_PROPS } from "@databiosphere/findable-ui/lib/components/common/Button/constants";
import { AlertIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/AlertIcon/alertIcon";
import { SectionActions } from "@databiosphere/findable-ui/lib/components/common/Section/section.styles";
import {
  PRIORITY,
  StatusIcon,
} from "@databiosphere/findable-ui/lib/components/common/StatusIcon/statusIcon";
import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { Override } from "@databiosphere/findable-ui/lib/config/entities";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { Button, Link as MLink, Typography } from "@mui/material";
import Link from "next/link";
import { JSX } from "react";
import { Notice, Section, SectionContent } from "../../entityGuard.styles";

interface EntityWithdrawnProps {
  override: Override;
}

export const EntityWithdrawn = ({
  override,
}: EntityWithdrawnProps): JSX.Element => {
  const { redirectUrl } = override || {};
  return (
    <Notice>
      <Section>
        <StatusIcon priority={PRIORITY.MEDIUM} StatusIcon={AlertIcon} />
        <SectionContent>
          <Typography
            component="h2"
            variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_XLARGE}
          >
            Project Withdrawn
          </Typography>
          <Typography
            component="div"
            variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_400}
          >
            <p>
              The project you are requesting has been withdrawn from the HCA
              Data Portal due to a GDPR request.
            </p>
            {redirectUrl && (
              <>
                <p>
                  The project can now be accessed at:{" "}
                  <MLink
                    href={redirectUrl}
                    rel="noreferrer"
                    target={ANCHOR_TARGET.BLANK}
                  >
                    {redirectUrl}
                  </MLink>
                </p>
              </>
            )}
          </Typography>
        </SectionContent>
        <SectionActions>
          <Link href="/" legacyBehavior passHref>
            <Button {...BUTTON_PROPS.PRIMARY_CONTAINED} href="passHref">
              To Homepage
            </Button>
          </Link>
        </SectionActions>
      </Section>
    </Notice>
  );
};
