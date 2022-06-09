import styled from "@emotion/styled";

export const ItemContainer = styled.div`
  &:not(:first-of-type) {
    margin-top: ${({ theme }) => theme.spacing(2)};
  }
`;
