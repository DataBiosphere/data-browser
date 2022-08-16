import { ButtonPrimary } from "app/components/common/Button/button.styles";
import { RoundedPaper } from "app/components/common/Paper/paper.styles";
import { SectionTitle } from "app/components/Project/components/Section/components/SectionTitle/sectionTitle";
import {
  Content as SectionText,
  Section,
} from "app/components/Project/components/Section/section.styles";
import Link from "next/link";
import React from "react";
import { BatchNormalizationWarning } from "../../../BatchNormalizationWarning/batchNormalizationWarning";
import {
  Actions as SectionActions,
  SectionContent,
} from "./exportToTerraReady.styles";

interface Props {
  terraUrl: string;
}

export const ExportToTerraReady = ({ terraUrl }: Props): JSX.Element => {
  return (
    <RoundedPaper>
      <Section>
        <SectionContent gap={2}>
          <SectionTitle title="Your Terra Workspace Link is Ready" />
          <SectionText component="div" variant="text-body-400-2lines">
            <p>
              Your Terra Workspace has been opened in a new browser tab. The
              workspace URL is referenced below.
            </p>
            <BatchNormalizationWarning />
          </SectionText>
        </SectionContent>
        <SectionActions>
          <Link href={terraUrl} passHref>
            <ButtonPrimary href="passHref" rel="noopener" target="_blank">
              Open Terra
            </ButtonPrimary>
          </Link>
        </SectionActions>
      </Section>
    </RoundedPaper>
  );
};
