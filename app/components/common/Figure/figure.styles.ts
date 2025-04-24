import { textBody400 } from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";

export const Figure = styled.figure`
  margin: 32px 0;

  img {
    border: 1px solid ${PALETTE.SMOKE_MAIN};
    border-radius: 6px;
    margin: 0 auto;
    max-width: 100%;
  }

  figcaption {
    ${textBody400};
    margin-top: 8px;
    text-align: center;
  }
`;
