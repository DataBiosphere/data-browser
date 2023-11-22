import { ButtonPrimary } from "@clevercanary/data-explorer-ui/lib/components/common/Button/components/ButtonPrimary/buttonPrimary";
import { AlertIcon } from "@clevercanary/data-explorer-ui/lib/components/common/CustomIcon/components/AlertIcon/alertIcon";
import { SectionActions } from "@clevercanary/data-explorer-ui/lib/components/common/Section/section.styles";
import {
  PRIORITY,
  StatusIcon,
} from "@clevercanary/data-explorer-ui/lib/components/common/StatusIcon/statusIcon";
import { Override } from "@clevercanary/data-explorer-ui/lib/config/entities";
import {
  TEXT_BODY_LARGE_400,
  TEXT_HEADING_XLARGE,
} from "@clevercanary/data-explorer-ui/lib/theme/common/typography";
import { Link as MLink, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Notice, Section, SectionContent } from "../../entityGuard.styles";

interface EntityDeprecatedProps {
  override: Override;
}

export const EntityDeprecated = ({
  override,
}: EntityDeprecatedProps): JSX.Element => {
  const router = useRouter();
  const { supersededBy } = override || {};
  const title = supersededBy
    ? "Project Relocated"
    : "Project Permanently Removed";
  return (
    <Notice>
      <Section>
        <StatusIcon priority={PRIORITY.MEDIUM} StatusIcon={AlertIcon} />
        <SectionContent>
          <Typography component="h2" variant={TEXT_HEADING_XLARGE}>
            {title}
          </Typography>
          <Typography variant={TEXT_BODY_LARGE_400}>
            {supersededBy ? (
              <>
                The project you are requesting has been permanently moved and
                may be accessed{" "}
                <MLink
                  onClick={(): void => {
                    router.push({
                      pathname: router.pathname,
                      query: { ...router.query, params: [supersededBy] },
                    });
                  }}
                >
                  here
                </MLink>
                .
              </>
            ) : (
              <>The project you are requesting has been permanently removed.</>
            )}
          </Typography>
        </SectionContent>
        <SectionActions>
          <Link href="/" passHref>
            <ButtonPrimary href="passHref">To Homepage</ButtonPrimary>
          </Link>
        </SectionActions>
      </Section>
    </Notice>
  );
};
