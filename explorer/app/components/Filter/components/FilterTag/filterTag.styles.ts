import styled from "@emotion/styled";
import { Chip } from "@mui/material";

export const SupersededTag = styled(Chip)`
  background-color: ${({ theme }) =>
    theme.palette
      .smokeDark}; // TODO update palette reference with issue #99 https://github.com/clevercanary/data-browser/issues/99
`;
