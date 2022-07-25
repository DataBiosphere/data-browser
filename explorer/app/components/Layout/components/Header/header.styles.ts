import styled from "@emotion/styled";
import { AppBar } from "@mui/material";

export const Header = styled(AppBar)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.smoke};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
`;
