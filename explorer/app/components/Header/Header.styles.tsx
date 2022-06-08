import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Theme } from "@mui/material";

export const HEADER_HEIGHT = 56;

const hideOnMobile = ({ theme }: { theme: Theme }) => css`
  ${theme.breakpoints.down("lg")} {
    ${css`
      display: none;
    `.styles}
  }
`;

export const Container = styled.div`
  align-items: center;
  background-color: white;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.07);
  box-sizing: border-box;
  display: flex;
  height: ${HEADER_HEIGHT}px;
  padding: ${({ theme }) => theme.spacing(3, 0, 3, 4)};
  width: 100%;
`;

export const Header = styled.header`
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
`;

interface LinksContainerProps {
  center: boolean;
}

export const LinksContainer = styled.div<LinksContainerProps>`
  ${hideOnMobile}
  display: flex;
  flex-grow: 1;
  justify-content: ${(props) => (props.center ? "center" : "flex-start")};
  margin-left: ${({ theme, center }) => theme.spacing(center ? 0 : 9)};
`;

export const LinksContent = styled.div``;

export const SocialLinksContainer = styled.div`
  ${hideOnMobile}
  margin-right: ${({ theme }) => theme.spacing(8)};
`;

export const MenuButton = styled.div`
  margin-right: ${({ theme }) => theme.spacing(4)};
  white-space: nowrap;
`;

export const MenuContainer = styled.div`
  ${hideOnMobile}
  display: flex;
`;

export const DesktopContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const MobileContainer = styled.div`
  display: none;

  ${({ theme }) => `
    ${theme.breakpoints.down("lg")} {
      ${
        css`
          display: flex;
        `.styles
      }
    }
  `}
`;

export const DrawerContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(6, 0)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`;
