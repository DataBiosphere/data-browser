import styled from "@emotion/styled";

export const SupplementaryList = styled.div`
  display: grid;
  gap: 0 4px;
  grid-template-columns: auto 1fr;
`;

export const Marker = styled.span`
  color: ${({ theme }) => theme.palette.primary.main};
  text-align: right;
`;

export const SupplementaryLink = styled.span`
  align-items: center;
  display: flex;
  gap: 8px;
  min-width: 0; /* required to ellipsis any flex child */
`;
