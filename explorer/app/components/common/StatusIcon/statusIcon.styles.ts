import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { PRIORITY, Priority } from "./statusIcon";

interface Props {
  priority: Priority;
}

export const StatusCircle = styled.div<Props>`
  border-radius: 50%;
  box-sizing: content-box;
  display: grid;
  height: 72px;
  place-content: center center;
  width: 72px;

  // Normal priority.
  ${({ priority, theme }) =>
    priority === PRIORITY.NORMAL &&
    css`
      background-color: ${theme.palette.info.lightest};
      color: ${theme.palette.info.main};
    `};

  // Low priority.
  ${({ priority, theme }) =>
    priority === PRIORITY.LOW &&
    css`
      background-color: ${theme.palette.warning.lightest};
      color: ${theme.palette.warning.main};
    `};

  // Medium priority.
  ${({ priority, theme }) =>
    priority === PRIORITY.MEDIUM &&
    css`
      background-color: ${theme.palette.warning.light};
      border: 3px solid white;
      color: ${theme.palette.warning.main};
    `};

  // High priority.
  ${({ priority, theme }) =>
    priority === PRIORITY.HIGH &&
    css`
      background-color: ${theme.palette.alert.light};
      border: 3px solid white;
      color: ${theme.palette.alert.main};
    `};
`;
