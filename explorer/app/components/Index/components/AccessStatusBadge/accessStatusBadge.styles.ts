import styled from "@emotion/styled";
import { Chip } from "@mui/material";

interface AccessStatusBadgeProps {
  accessible: boolean;
}

export const AccessStatusBadge = styled(Chip)<AccessStatusBadgeProps>`
  background-color: ${({ accessible, theme }) =>
    accessible ? theme.palette.success.light : theme.palette.warning.light};
  color: ${({ accessible, theme }) =>
    accessible ? theme.palette.success.main : theme.palette.warning.main};
`;
