import { Alert as DXAlert } from "@clevercanary/data-explorer-ui/lib/components/common/Alert/alert";
import { SectionTitle as DXSectionTitle } from "@clevercanary/data-explorer-ui/lib/components/common/Section/components/SectionTitle/sectionTitle";
import {
  sectionMargin,
  sectionMarginSm,
} from "@clevercanary/data-explorer-ui/lib/components/common/Section/section.styles";
import { TABLET } from "@clevercanary/data-explorer-ui/lib/theme/common/breakpoints";
import styled from "@emotion/styled";

export const SectionTitle = styled(DXSectionTitle)`
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
