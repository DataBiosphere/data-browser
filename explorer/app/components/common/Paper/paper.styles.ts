// TODO review paper align-self styles with ticket https://github.com/clevercanary/data-browser/issues/417
import styled from "@emotion/styled";
import { Paper } from "./paper";

/**
 * Flat paper - typically used when in full stretch or full "bleed" across a container.
 * e.g. the entire width of mobile viewports.
 */
export const FlatPaper = styled(Paper)`
  border-left: none;
  border-radius: 0;
  border-right: none;
  box-shadow: none;
`;

/**
 * Rounded paper - typically used when contained within a parent container.
 */
export const RoundedPaper = styled(Paper)`
  border-radius: 8px;

  & > :first-of-type {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  & > :last-of-type {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;
