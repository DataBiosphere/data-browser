import styled from "@emotion/styled";
import { Menu } from "@mui/material";

export const CheckboxMenu = styled(Menu)`
  .MuiPaper-menu {
    margin: 8px 0;
  }

  .MuiMenuItem-root.Mui-disabled {
    opacity: 1;
  }
`;
