import styled from "@emotion/styled";

export const CitationLink = styled.div`
  white-space: nowrap;

  // Copy icon button
  & button {
    bottom: 2px; /* Center aligns icon with link text without affecting overall rendered citation link height */
    margin-left: 8px;
    position: relative;
  }
`;
