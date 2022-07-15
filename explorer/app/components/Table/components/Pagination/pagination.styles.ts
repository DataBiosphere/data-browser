import styled from "@emotion/styled";
import { BREAKPOINT } from "../../../../hooks/useBreakpointHelper";

export const Pagination = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.common.white};
  display: flex;
  gap: 16px;
  justify-content: space-between;
  padding: 20px;

  ${({ theme }) => theme.breakpoints.up(BREAKPOINT.TABLET)} {
    justify-content: flex-start;
  }
`;
