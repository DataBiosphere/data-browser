import styled from "@emotion/styled";

export const IconContainer = styled.div`
  display: flex;
  margin-right: ${({ theme }) => theme.spacing(2)};
`;

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;

  &:not(:first-of-type) {
    margin-top: ${({ theme }) => theme.spacing(4)};
  }
`;
