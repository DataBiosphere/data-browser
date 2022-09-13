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

// See https://github.com/emotion-js/emotion/issues/1105.
// See https://github.com/emotion-js/emotion/releases/tag/%40emotion%2Fcache%4011.10.2.
const ignoreSsrWarning =
  "/* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */";

/**
 * Grid paper - typically used as a parent (grid) container.
 * The background color with the grid cap property create the grid "lines" between each grid item.
 */
export const GridPaper = styled.div(({ theme }) => ({
  backgroundColor: `${theme.palette.smoke.main}`,
  borderRadius: "inherit", // Inherit parent container border radius.
  display: "grid",
  gap: "1px",
  // First child - not <style/> - inherits top left and right border radius.
  [`> *:first-child:not(style)${ignoreSsrWarning}`]: {
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit",
  },
  // First child - after <style/> - inherits top left and right border radius.
  [`> style:first-child + *${ignoreSsrWarning}`]: {
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit",
  },
  // Last child inherits bottom left and right border radius.
  // eslint-disable-next-line sort-keys -- disabling key order for readability
  "> *:last-child": {
    borderBottomLeftRadius: "inherit",
    borderBottomRightRadius: "inherit",
  },
}));
