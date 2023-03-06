import {
  SectionActions as DXSectionActions,
  sectionMargin,
  sectionMarginSm,
} from "@clevercanary/data-explorer-ui/lib/components/common/Section/section.styles";
import { TABLET } from "@clevercanary/data-explorer-ui/lib/theme/common/breakpoints";
import styled from "@emotion/styled";
import {
  textBody4002Lines,
  textBodyLarge500,
} from "../../../../../utils/typographyToCSS";

export const Section = styled("div")`
  ${sectionMargin}
  ${({ theme }) => theme.breakpoints.up(TABLET)} {
    ${sectionMarginSm}
  }

  h3 {
    ${textBodyLarge500};
    margin: 0 0 8px;

    &:nth-of-type(n + 2) {
      margin-top: 20px;
    }
  }

  p {
    ${textBody4002Lines};
    margin: 0 0 8px;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`;

export const SectionActions = styled(DXSectionActions)`
  margin: 16px 0;
`;
