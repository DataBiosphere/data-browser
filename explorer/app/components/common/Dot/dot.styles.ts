import styled from "@emotion/styled";

export const Dot = styled.span`
  align-self: center;
  background-color: ${({ theme }) => theme.palette.ink.light};
  border-radius: 50%;
  display: block;
  flex: none;
  height: 4px;
  width: 4px;
`;
