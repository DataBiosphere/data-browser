import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Container = styled.nav`
  display: flex;

  & > .MuiTypography-root {
    border-radius: 4px;
    box-sizing: border-box;
    color: ${({ theme }) => theme.palette.colorInk};
    margin: ${({ theme }) => theme.spacing(0, 2)};
    padding: ${({ theme }) => theme.spacing(2, 2)};
    text-decoration: none;

    &:hover {
      background-color: ${({ theme }) => theme.palette.colorSmokeLight};
    }
  }

  ${({ theme }) => `
    ${theme.breakpoints.down("lg")} {
      ${
        css`
          flex-direction: column;

          & > .MuiTypography-root {
            margin: 0;
            padding: ${theme.spacing(4, 6)};
          }
        `.styles
      }
    }
  `}
`;
