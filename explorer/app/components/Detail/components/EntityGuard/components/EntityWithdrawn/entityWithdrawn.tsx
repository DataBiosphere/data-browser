import { ButtonPrimary } from "@clevercanary/data-explorer-ui/lib/components/common/Button/components/ButtonPrimary/buttonPrimary";
import { AlertIcon } from "@clevercanary/data-explorer-ui/lib/components/common/CustomIcon/components/AlertIcon/alertIcon";
import { SectionActions } from "@clevercanary/data-explorer-ui/lib/components/common/Section/section.styles";
import {
  PRIORITY,
  StatusIcon,
} from "@clevercanary/data-explorer-ui/lib/components/common/StatusIcon/statusIcon";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { Override } from "@clevercanary/data-explorer-ui/lib/config/entities";
import {
  TEXT_BODY_LARGE_400,
  TEXT_HEADING_XLARGE,
} from "@clevercanary/data-explorer-ui/lib/theme/common/typography";
import { Link as MLink, Typography } from "@mui/material";
import Link from "next/link";
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
          <Typography component="h2" variant={TEXT_HEADING_XLARGE}>
            Project Withdrawn
          </Typography>
          <Typography component="div" variant={TEXT_BODY_LARGE_400}>
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
            <ButtonPrimary href="passHref">To Homepage</ButtonPrimary>
          </Link>
        </SectionActions>
      </Section>
    </Notice>
  );
};
