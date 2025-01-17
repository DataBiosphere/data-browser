import {
  textBodyLarge500,
  textHeadingLarge,
  textHeadingSmall,
} from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";

/**
 * H1 styled component. Matches H1 in the Portal.
 */
export const H1 = styled.h1`
  ${textHeadingLarge};
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
  ${textHeadingSmall}
  margin: 40px 0 16px; /* Matching margin-bottom of H3 in docs */
`;

/*
 * H4 styled component.
 */
export const H4 = styled.h4`
  ${textBodyLarge500}
  margin: 16px 0; /* Matching margin-bottom of H4 in docs */
`;

/**
 * P styled component.
 */
export const P = styled.p`
  margin: 0 0 16px; /* Matching margin-bottom of P in docs */
`;
