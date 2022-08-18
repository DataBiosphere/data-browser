import { ButtonPrimary } from "app/components/common/Button/button.styles";
import { FluidPaper } from "app/components/common/Paper/paper.styles";
import {
  Content as SectionText,
  Section,
} from "app/components/Project/components/Section/section.styles";
import React from "react";
import { SectionTitle } from "../../../../../Project/components/Section/components/SectionTitle/sectionTitle";
import { BatchNormalizationWarning } from "../../../BatchNormalizationWarning/batchNormalizationWarning";
import {
  Actions as SectionActions,
  SectionContent,
} from "./exportToTerraNotStarted.styles";

export type RunFn = () => void;

interface Props {
  run: RunFn;
}

export const ExportToTerraNotStarted = ({ run }: Props): JSX.Element => {
  return (
    <FluidPaper>
      <Section>
        <SectionContent gap={2}>
          <SectionTitle title="Export To Terra" />
          <SectionText component="div" variant="text-body-400-2lines">
            <BatchNormalizationWarning />
          </SectionText>
        </SectionContent>
        <SectionActions>
          <ButtonPrimary onClick={run}>Request link</ButtonPrimary>
        </SectionActions>
      </Section>
    </FluidPaper>
  );
};
