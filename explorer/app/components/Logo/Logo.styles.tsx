import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
`;

export const SloganContainer = styled.div`
  align-items: center;
  border-left: 1px solid ${({ theme }) => theme.palette.colorSmoke};
  display: flex;
  height: 100%;
  margin-left: ${({ theme }) => theme.spacing(4)};
  padding-left: ${({ theme }) => theme.spacing(4)};

  ${({ theme }) => `
    ${theme.breakpoints.down("lg")} {
      ${
        css`
          display: none;
        `.styles
      }
    }
  `}
`;
