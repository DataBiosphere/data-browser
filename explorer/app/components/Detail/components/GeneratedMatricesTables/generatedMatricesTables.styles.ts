import { Alert as DXAlert } from "@clevercanary/data-explorer-ui/lib/components/common/Alert/alert";
import {
  sectionMargin,
  sectionMarginSm,
} from "@clevercanary/data-explorer-ui/lib/components/common/Section/section.styles";
import { textBody500 } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/fonts";
import { TABLET } from "@clevercanary/data-explorer-ui/lib/theme/common/breakpoints";
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
