// Core dependencies
import { Typography } from "@mui/material";
import React from "react";

// App dependencies
import { useConfig } from "app/hooks/useConfig";
import { Stack } from "../../../common/Stack/Stack";
import { ANCHOR_TARGET, Link } from "../../../Links/components/Link/link";
import { Section } from "../Section/section";

// Styles
import { CitationLink } from "./citation.styles";

interface Props {
  citationPath: string;
}

export const Citation = ({ citationPath }: Props): JSX.Element => {
  const { datasources } = useConfig();
  const { url } = datasources;
  const citationLink = `${url}${citationPath}`;
  const [root, projectId] = citationPath.split(/\/(?!.*\/)/);
  const CitationLinkLabel = (
    <>
      {url}
      <wbr />
      {root}
      <wbr />
      {projectId}
    </>
  );
  return (
    <Section collapsable title="Citation">
      <Stack gap={1}>
        <Typography>
          To reference this project, please use the following link:
        </Typography>
        <CitationLink>
          <Link
            copyable
            label={CitationLinkLabel}
            target={ANCHOR_TARGET.BLANK}
            url={citationLink}
          />
        </CitationLink>
      </Stack>
    </Section>
  );
};
