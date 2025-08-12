import {
  sectionMargin,
  sectionMarginSm,
} from "@databiosphere/findable-ui/lib/components/common/Section/section.styles";
import { bpUpSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";

export const Section = styled("div")`
  ${sectionMargin};

  ${bpUpSm} {
    ${sectionMarginSm};
  }

  h3,
  h4 {
    margin: 0 0 8px;
  }

  h3 {
    font: ${FONT.BODY_LARGE_500};
  }

  h4 {
    font: ${FONT.BODY_500};
    margin-top: 20px;
  }

  p {
    font: ${FONT.BODY_400_2_LINES};
    margin: 0 0 8px;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`;
