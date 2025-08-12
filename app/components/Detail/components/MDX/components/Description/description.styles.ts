import styled from "@emotion/styled";
import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";
import { typographyToCSS } from "../../../../../../styles/mixins/typography";

/**
 * H1 styled component. Matches H1 in the Portal.
 */
export const H1 = styled.h1`
  font: ${FONT.HEADING_LARGE};
  font-size: 30px;
  letter-spacing: -0.8px;
  line-height: 40px;
  margin: 0 0 16px; /* Matching margin-bottom of H1 in docs */
`;

/**
 * H2 styled component. Removed textHeadingLarge mixin to prevent `font-size: 30px`
 * for tablet+ (to match H2's in the Portal).
 */
export const H2 = styled.h2`
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.4px;
  line-height: 32px;
  margin: 32px 0 16px; /* Matching margin-bottom of H2 in docs */
`;

/**
 * H3 styled component.
 */
export const H3 = styled.h3`
  ${typographyToCSS("heading-small")};
  margin: 40px 0 16px; /* Matching margin-bottom of H3 in docs */
`;

/*
 * H4 styled component.
 */
export const H4 = styled.h4`
  font: ${FONT.BODY_LARGE_500};
  margin: 16px 0; /* Matching margin-bottom of H4 in docs */
`;

/*
 * Image styled component.
 */
export const Image = styled.img`
  max-width: 100%;
`;

/**
 * P styled component.
 */
export const P = styled.p`
  margin: 0 0 16px; /* Matching margin-bottom of P in docs */
`;
