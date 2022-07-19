import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { SectionContent as Content } from "../Section/section.styles";

export const SectionContent = styled(Content)`
  gap: 0;

  > p {
    margin: 0 0 8px;
  }

  > *:last-child {
    margin-bottom: 0;
  }
` as typeof Typography;
