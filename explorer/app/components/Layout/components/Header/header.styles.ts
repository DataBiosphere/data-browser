import styled from "@emotion/styled";
import { AppBar } from "@mui/material";

export const Header = styled(AppBar)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.smoke.main};
`;
