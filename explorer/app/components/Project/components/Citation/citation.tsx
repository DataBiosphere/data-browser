import { Typography } from "@mui/material";
import { useConfig } from "app/hooks/useConfig";
import React, { ReactNode } from "react";
import { Stack } from "../../../common/Stack/Stack";
import { CollapsableSection } from "../../../Detail/components/Section/components/CollapsableSection/collapsableSection";
import { SectionDetailsEmpty } from "../../../Detail/components/Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { ANCHOR_TARGET } from "../../../Links/common/entities";
import { Link } from "../../../Links/components/Link/link";
import { ProjectPath } from "../../common/entities";
import { CitationLink } from "./citation.styles";

interface Props {
  projectPath?: ProjectPath;
}

export const Citation = ({ projectPath }: Props): JSX.Element => {
  const { browserURL, redirectRootToPath: path } = useConfig();
  const citationLink = `${browserURL}${path}${projectPath}`;
  const showCitation = browserURL && path && projectPath;
  return (
    <CollapsableSection collapsable title="Citation">
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
    </CollapsableSection>
  );
};

/**
 * Builds citation label for display as citation link.
 * @param origin - UURLrl origin.
 * @param path - Citation path.
 * @param projectPath - Project path.
 * @returns Element to display as citation text.
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
 * @param pathName - Path possibly containing leading /.
 * @returns pathName without leading slash.
 */
function removeLeadingSlash(pathName: string): string {
  return pathName.replace(/^\//, "");
}
