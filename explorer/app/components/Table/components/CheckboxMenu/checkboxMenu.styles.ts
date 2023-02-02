import styled from "@emotion/styled";
import { ListItemButton, Menu } from "@mui/material";

// Template constants
const textBody500 = "text-body-500";

export const CheckboxMenu = styled(Menu)`
  .MuiPaper-menu {
    margin: 8px 0;
  }

  // List item button
  .MuiListItemButton-root {
    gap: 8px;
  }

  .MuiListItemButton-root.Mui-disabled {
    opacity: 1;
  }
`;

export const ResetButton = styled(ListItemButton)`
  &:hover {
    background-color: transparent;
  }

  // List item text
  .MuiListItemText-root {
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: ${({ theme }) => theme.typography[textBody500].fontWeight};

    &:hover {
      text-decoration: underline;
    }
  }
`;
