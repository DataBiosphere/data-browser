import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { BREAKPOINT } from "../../../../hooks/useBreakpointHelper";

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px 0;
  padding: 20px 16px;

  ${({ theme }) => theme.breakpoints.up(BREAKPOINT.TABLET)} {
    padding: 20px;
  }
`;

// Basic section with white background - typically used as a direct descendant of GridPaper component.
export const GridPaperSection = styled(Section)`
  background-color: ${({ theme }) => theme.palette.common.white};
`;

export const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px 0;
`;

export const SectionText = styled(Typography)`
  > p {
    margin: 0 0 8px;
  }

  > *:last-child {
    margin-bottom: 0;
  }
` as typeof Typography;

export const SectionContentListItem = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`;

export const SectionActions = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
`;
