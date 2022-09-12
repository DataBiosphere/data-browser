import { ButtonPrimary } from "app/components/common/Button/button.styles";
import { FluidPaper } from "app/components/common/Paper/paper.styles";
import {
  Section,
  SectionActions,
  SectionContent,
} from "app/components/Detail/components/Section/section.styles";
import React from "react";
import { SectionTitle } from "../../../../../Detail/components/Section/components/SectionTitle/sectionTitle";
import { BatchNormalizationWarning } from "../../../BatchNormalizationWarning/batchNormalizationWarning";

export type RunFn = () => void;

interface Props {
  run: RunFn;
}

export const ExportToTerraNotStarted = ({ run }: Props): JSX.Element => {
  return (
    <FluidPaper>
      <Section>
        <SectionContent>
          <SectionTitle title="Export To Terra" />
          <BatchNormalizationWarning />
        </SectionContent>
        <SectionActions>
          <ButtonPrimary onClick={run}>Request link</ButtonPrimary>
        </SectionActions>
      </Section>
    </FluidPaper>
  );
};
