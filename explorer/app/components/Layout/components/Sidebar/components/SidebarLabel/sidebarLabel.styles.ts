import styled from "@emotion/styled";
import { BREAKPOINT } from "../../../../../../hooks/useBreakpointHelper";

export const SidebarLabel = styled.div`
  padding: 0 24px;

  ${({ theme }) => theme.breakpoints.up(BREAKPOINT.DESKTOP)} {
    margin: 8px 0;
    padding: 8px 16px;
  }
`;
