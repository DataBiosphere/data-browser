import { Typography } from "@mui/material";
import { SectionActions } from "app/components/Project/components/Section/section.styles";
import React, { ReactNode } from "react";
import { SearchOffIcon } from "../common/CustomIcon/components/SearchOffIcon/searchOffIcon";
import { RoundedPaper } from "../common/Paper/paper.styles";
import { PRIORITY, StatusIcon } from "../common/StatusIcon/statusIcon";
import { SectionTitle } from "../Project/components/Section/components/SectionTitle/sectionTitle";
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
