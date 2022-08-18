import styled from "@emotion/styled";
import { BREAKPOINT } from "../../../hooks/useBreakpointHelper";
import { Paper } from "./paper";

/**
 * Flat paper - typically used when in full stretch or full "bleed" across a container.
 * e.g. the entire width of mobile viewports.
 */
export const FlatPaper = styled(Paper)`
  align-self: stretch;
  border-left: none;
  border-radius: 0;
  border-right: none;
  box-shadow: none;
`;

/**
 * Rounded paper - typically used when contained within a parent container.
 * To use RoundedPaper, wrap the styled paper around a single child element e.g. "Section" or "Sections" component. TODO
 */
export const RoundedPaper = styled(Paper)`
  align-self: stretch;
  border-radius: 8px;
`;

/* eslint-disable valid-jsdoc -- disable require param */
/**
 * Fluid paper - typically used to transition between flat paper (mobile) and rounded paper (tablet or desktop).
 * To use FluidPaper, wrap the styled paper around a single child element e.g. "Section" or "Sections" component. TODO
 */
/* eslint-enable valid-jsdoc -- disable require param */
export const FluidPaper = styled(RoundedPaper)`
  ${({ theme }) => theme.breakpoints.down(BREAKPOINT.TABLET)} {
    border-left: none;
    border-radius: 0;
    border-right: none;
    box-shadow: none;
  }
`;

/* eslint-disable valid-jsdoc -- disable require param */
/**
 * Grid paper - typically used as a parent (grid) container.
 * The background color with the grid cap property create the grid "lines" between each grid item.
 */
/* eslint-enable valid-jsdoc -- disable require param */
export const GridPaper = styled.div`
  background-color: ${({ theme }) => theme.palette.smoke.main};
  border-radius: inherit; // Inherit parent container border radius.
  display: grid;
  gap: 1px;

  // First child inherits top left and right border radius.
  > *:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  // Last child inherits bottom left and right border radius.
  > *:last-child {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }
`;
