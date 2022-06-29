// Core dependencies
import { Typography } from "@mui/material";
import React, { ReactNode } from "react";

// App dependencies
import { useConfig } from "app/hooks/useConfig";
import { Stack } from "../../../common/Stack/Stack";
import { ANCHOR_TARGET, Link } from "../../../Links/components/Link/link";
import { SectionDetailsEmpty } from "../Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { Section } from "../Section/section";

// Styles
import { CitationLink } from "./citation.styles";

interface Props {
  projectPath?: string;
}

export const Citation = ({ projectPath }: Props): JSX.Element => {
  const { browserURL, redirectRootToPath: path } = useConfig();
  const citationLink = `${browserURL}${path}${projectPath}`;
  const showCitation = browserURL && path && projectPath;
  return (
    <Section collapsable title="Citation">
      {showCitation ? (
        <Stack gap={1}>
          <Typography>
            To reference this project, please use the following link:
          </Typography>
          <CitationLink>
            <Link
              copyable
              label={buildCitationLinkLabel(browserURL, path, projectPath)}
              target={ANCHOR_TARGET.BLANK}
              url={citationLink}
            />
          </CitationLink>
        </Stack>
      ) : (
        <SectionDetailsEmpty />
      )}
    </Section>
  );
};

/**
 * Builds citation label for display as citation link.
 * @param origin - Url origin.
 * @param path - Pathname.
 * @param projectPath - Project pathname.
 */
function buildCitationLinkLabel(
  origin: string,
  path: string,
  projectPath: string
): ReactNode {
  return (
    <>
      {origin}/
      <wbr />
      {removeLeadingSlash(path)}/
      <wbr />
      {removeLeadingSlash(projectPath)}
    </>
  );
}

/**
 * Removes leading slash "/" from path.
 * @param pathName
 * @returns pathName without leading slash.
 */
function removeLeadingSlash(pathName: string): string {
  return pathName.replace(/^\//, "");
}
