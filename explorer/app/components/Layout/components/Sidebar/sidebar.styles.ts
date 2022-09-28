import styled from "@emotion/styled";
import { HEADER_HEIGHT } from "../Header/header";

export const Sidebar = styled.div`
  align-self: stretch;
  border-right: 1px solid ${({ theme }) => theme.palette.smoke.main};
  box-sizing: content-box;
  width: 264px;
`;

export const SidebarPositioner = styled.div`
  height: calc(100vh - ${HEADER_HEIGHT}px);
  overflow-y: scroll;
  position: sticky;
  top: ${HEADER_HEIGHT}px;
`;
