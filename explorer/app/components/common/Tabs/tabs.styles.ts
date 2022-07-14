import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { TabScrollButtonProps } from "@mui/material";

interface Props {
  direction: TabScrollButtonProps["direction"];
  disabled: TabScrollButtonProps["disabled"];
}

export const TabScrollFuzz = styled.span<Props>`
  height: 100%;
  opacity: 1;
  position: absolute;
  top: 0;
  width: 56px;
  z-index: 1;

  // Scroll fuzz direction.
  ${({ direction }) => {
    return direction === "left"
      ? css`
          background: linear-gradient(90deg, #f6f6f7 5.88%, #f6f6f700 94.12%);
          left: 0;
        `
      : css`
          background: linear-gradient(270deg, #f6f6f7 5.88%, #f6f6f700 94.12%);
          right: 0;
        `;
  }};

  // Disabled scroll fuzz.
  ${({ disabled }) => {
    return (
      disabled &&
      css`
        opacity: 0;
        pointer-events: none;
      `
    );
  }};
`;
