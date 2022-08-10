// Core dependencies
import { Typography } from "@mui/material";
import React, { ReactNode } from "react";

// App dependencies
import { SearchOffIcon } from "../common/CustomIcon/components/SearchOffIcon/searchOffIcon";
import { PRIORITY, StatusIcon } from "../common/StatusIcon/statusIcon";
import { SectionTitle } from "../Project/components/Section/components/SectionTitle/sectionTitle";

// Styles
import { SectionActions } from "app/components/Project/components/Section/section.styles";
import { RoundedPaper } from "../common/Paper/paper.styles";
import { Section, SectionContent } from "./noResults.styles";

interface Props {
  actions?: ReactNode;
  description?: string;
  title: string;
}

export const NoResults = ({
  actions,
  description,
  title,
}: Props): JSX.Element => {
  return (
    <RoundedPaper>
      <Section>
        <StatusIcon priority={PRIORITY.LOW} StatusIcon={SearchOffIcon} />
        <SectionContent alignItems="center" gap={2}>
          <SectionTitle title={title} />
          {description && (
            <Typography color="ink.light" variant="text-body-400-2lines">
              {description}
            </Typography>
          )}
        </SectionContent>
        {actions && <SectionActions>{actions}</SectionActions>}
      </Section>
    </RoundedPaper>
  );
};
