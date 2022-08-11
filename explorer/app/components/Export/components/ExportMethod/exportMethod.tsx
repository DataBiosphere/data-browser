import { RoundedPaper } from "app/components/common/Paper/paper.styles";
import {
  Content as SectionContent,
  Section,
  SectionCallout,
  SectionTitle,
} from "app/components/Project/components/Section/section.styles";
import Link from "next/link";
import React from "react";
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
    <RoundedPaper>
      <Section>
        <SectionTitle title={title} />
        <SectionContent component="div" variant="text-body-400-2lines">
          {description}
        </SectionContent>
        <SectionCallout>
          <Link href={route} passHref>
            <ExportButton disabled={disabled}>{buttonLabel}</ExportButton>
          </Link>
        </SectionCallout>
      </Section>
    </RoundedPaper>
  );
};
