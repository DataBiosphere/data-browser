import { Alert as DXAlert } from "@databiosphere/findable-ui/lib/components/common/Alert/alert";
import {
  sectionMargin,
  sectionMarginSm,
} from "@databiosphere/findable-ui/lib/components/common/Section/section.styles";
import { textBody500 } from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import { TABLET } from "@databiosphere/findable-ui/lib/theme/common/breakpoints";
import styled from "@emotion/styled";

export const SectionTitle = styled("h4")`
  ${textBody500}
  ${sectionMargin}
  ${({ theme }) => theme.breakpoints.up(TABLET)} {
    ${sectionMarginSm}
  }
`;

export const Alert = styled(DXAlert)`
  ${sectionMargin}
  ${({ theme }) => theme.breakpoints.up(TABLET)} {
    ${sectionMarginSm}
  }
`;
