import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { BREAKPOINT } from "../../../../hooks/useBreakpointHelper";
import { Sections } from "../../../Detail/components/Sections/sections";

export const BackPageView = styled.div`
  display: grid;
  flex: 1;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
  margin: 0 16px;
  padding: 24px 0;

  ${({ theme }) => theme.breakpoints.up(BREAKPOINT.TABLET)} {
    grid-template-columns: repeat(12, 1fr);
    margin: 0 auto;
    max-width: min(calc(100% - 32px), 1232px);
  }
`;

export const BackPageHero = styled.div`
  display: contents;

  > * {
    grid-column: 1 / -1;
  }
`;

export const BackPageTabs = styled.div`
  grid-column: 1 / -1;

  ${({ theme }) => theme.breakpoints.down(BREAKPOINT.TABLET)} {
    margin-left: -16px;
    margin-right: -16px;
  }
`;

// Back page content (main and side column wrapper).
export const BackPageContent = styled.div`
  align-items: flex-start;
  display: grid;
  gap: 16px 0;
  grid-column: 1 / -1;
  grid-template-columns: 1fr;
  margin-left: -16px;
  margin-right: -16px;

  ${({ theme }) => theme.breakpoints.up(BREAKPOINT.TABLET)} {
    display: grid;
    gap: 0 16px;
    grid-template-columns: inherit;
    margin: 0;
  }
`;

// Detail back page "overview" content (main and side column wrapper).
// Typically used by back page "project" or "datasets" tab.
// Used with DetailPageOverviewContentMainColumn and DetailPageOverviewContentSideColumn, the "sections"
// appear to be contained within a combination of "fluid" and "gridded" paper elements.
// These styles render:
// - mobile - a gridded, flat paper environment, each section stacked with a 1px gap, and
// - tablet - a main and side column arrangement, and within each column, a gridded, rounded paper environment, each section stacked with a 1px gap.
export const DetailPageOverviewContent = styled(BackPageContent)`
  background-color: ${({ theme }) => theme.palette.smoke.main};
  gap: 1px;
  padding: 1px 0;

  ${({ theme }) => theme.breakpoints.up(BREAKPOINT.TABLET)} {
    background-color: transparent;
    padding: 0;
  }
`;

// Back page content column.
const BackPageContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px 0;
`;

const mainColumn = css`
  grid-column: 1 / 9;
`;

const sideColumn = css`
  grid-column: 9 / -1;
`;

// Main column.
export const BackPageContentMainColumn = styled(BackPageContentColumn)`
  ${({ theme }) => theme.breakpoints.up(BREAKPOINT.TABLET)} {
    ${mainColumn};
  }
`;

// Side column.
export const BackPageContentSideColumn = styled(BackPageContentColumn)`
  ${({ theme }) => theme.breakpoints.up(BREAKPOINT.TABLET)} {
    ${sideColumn};
  }
`;

// Detail back page "overview" main column.
// Typically used by back page "project" or "datasets" tab.
export const DetailPageOverviewContentMainColumn = styled(Sections)`
  display: contents;

  && > * {
    display: contents; // required to override nested GridPaper.
  }

  ${({ theme }) => theme.breakpoints.up(BREAKPOINT.TABLET)} {
    align-self: flex-start;
    display: grid;
    ${mainColumn};

    && > * {
      display: grid; // required to restore nested GridPaper display property.
    }
  }
`;

// Detail back page "overview" side column.
// Typically used by back page "project" or "datasets" tab.
export const DetailPageOverviewContentSideColumn = styled(Sections)`
  display: contents;

  && > * {
    display: contents; // required to override nested GridPaper.
  }

  ${({ theme }) => theme.breakpoints.up(BREAKPOINT.TABLET)} {
    align-self: flex-start;
    display: grid;
    ${sideColumn};

    && > * {
      display: grid; // required to restore nested GridPaper display property.
    }
  }
`;
