import styled from "@emotion/styled";

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing(4)};
`;
