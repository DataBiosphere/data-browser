import { Typography } from "@mui/material";
import { FluidPaper } from "app/components/common/Paper/paper.styles";
import {
  Section,
  SectionActions,
  SectionContent,
} from "app/components/Detail/components/Section/section.styles";
import Link from "next/link";
import React from "react";
import { SectionTitle } from "../../../Detail/components/Section/components/SectionTitle/sectionTitle";
import { ExportButton } from "./exportMethod.styles";

interface Props {
  buttonLabel: string;
  description: string;
  disabled: boolean;
  route: string;
  title: string;
}

export const ExportMethod = ({
  buttonLabel,
  description,
  disabled,
  route,
  title,
}: Props): JSX.Element => {
  return (
    <FluidPaper>
      <Section>
        <SectionContent>
          <SectionTitle title={title} />
          <Typography variant="text-body-400-2lines">{description}</Typography>
        </SectionContent>
        <SectionActions>
          <Link href={route} passHref>
            <ExportButton disabled={disabled}>{buttonLabel}</ExportButton>
          </Link>
        </SectionActions>
      </Section>
    </FluidPaper>
  );
};
