import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const Cell = styled(Typography)`
  align-items: center;
  display: grid;
  gap: 8px;
  grid-auto-flow: column;
  justify-content: flex-start;

  img {
    margin: 0;
  }
` as typeof Typography;
