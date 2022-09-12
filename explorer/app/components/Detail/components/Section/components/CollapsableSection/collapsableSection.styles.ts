import styled from "@emotion/styled";
import { ButtonBase, Typography } from "@mui/material";
import { BREAKPOINT } from "../../../../../../hooks/useBreakpointHelper";

export const CollapsableSection = styled.div`
  background-color: ${({ theme }) => theme.palette.common.white};
  display: flex;
  flex-direction: column;
  padding: 4px 0;

  ${({ theme }) => theme.breakpoints.up(BREAKPOINT.TABLET)} {
    gap: 8px;
    padding: 20px;
  }
`;

export const SectionSummary = styled(ButtonBase)`
  display: flex;
  justify-content: space-between;
  padding: 16px;

  ${({ theme }) => theme.breakpoints.up(BREAKPOINT.TABLET)} {
    padding: 0;
  }
`;

export const SectionText = styled(Typography)`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px 16px;

  ${({ theme }) => theme.breakpoints.up(BREAKPOINT.TABLET)} {
    padding: 0;
  }
` as typeof Typography;
