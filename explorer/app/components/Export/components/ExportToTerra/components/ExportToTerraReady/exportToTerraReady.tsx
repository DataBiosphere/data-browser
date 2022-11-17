import { ButtonPrimary } from "app/components/common/Button/button.styles";
import { FluidPaper } from "app/components/common/Paper/paper.styles";
import { SectionTitle } from "app/components/Detail/components/Section/components/SectionTitle/sectionTitle";
import {
  Section,
  SectionActions,
  SectionContent,
  SectionText,
} from "app/components/Detail/components/Section/section.styles";
import Link from "next/link";
import React from "react";
import { ANCHOR_TARGET } from "../../../../../Links/common/entities";
import { BatchNormalizationWarning } from "../../../BatchNormalizationWarning/batchNormalizationWarning";

interface Props {
  terraUrl: string;
}

export const ExportToTerraReady = ({ terraUrl }: Props): JSX.Element => {
  return (
    <FluidPaper>
      <Section>
        <SectionContent>
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
            <ButtonPrimary
              href="passHref"
              rel="noopener"
              target={ANCHOR_TARGET.BLANK}
            >
              Open Terra
            </ButtonPrimary>
          </Link>
        </SectionActions>
      </Section>
    </FluidPaper>
  );
};
