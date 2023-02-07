import styled from "@emotion/styled";
import { Menu } from "@mui/material";

export const NavLinkMenu = styled(Menu)`
  .MuiPaper-menu {
    margin: 4px 0;
    min-width: 144px;
    border-color: ${({ theme }) => theme.palette.smoke.main};
  }

  && .MuiListItemIcon-root {
    min-width: 24px;
  }
`;
