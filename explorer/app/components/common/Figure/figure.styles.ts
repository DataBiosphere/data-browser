import { textBody400 } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";

export const Figure = styled.figure`
  margin: 32px 0;

  img {
    margin: 0 auto;
    max-width: 100%;
  }

  figcaption {
    ${textBody400};
    margin-top: 8px;
    text-align: center;
  }
`;
