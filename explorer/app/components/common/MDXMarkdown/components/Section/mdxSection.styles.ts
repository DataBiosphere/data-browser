import {
  sectionMargin,
  sectionMarginSm,
} from "@databiosphere/findable-ui/lib/components/common/Section/section.styles";
import {
  textBody4002Lines,
  textBody500,
  textBodyLarge500,
} from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import { TABLET } from "@databiosphere/findable-ui/lib/theme/common/breakpoints";
import styled from "@emotion/styled";

export const Section = styled("div")`
  ${sectionMargin}
  ${({ theme }) => theme.breakpoints.up(TABLET)} {
    ${sectionMarginSm}
  }

  h3,
  h4 {
    margin: 0 0 8px;
  }

  h3 {
    ${textBodyLarge500};
  }

  h4 {
    ${textBody500};
    margin-top: 20px;
  }

  p {
    ${textBody4002Lines};
    margin: 0 0 8px;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`;
