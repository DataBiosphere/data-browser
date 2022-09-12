import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface Props {
  profileImageURL?: string;
}

export const ProfileImage = styled.div<Props>`
  border-radius: 50%;
  height: 32px;
  width: 32px;

  ${({ profileImageURL, theme }) => {
    return profileImageURL
      ? css`
          background: no-repeat url(${profileImageURL});
          background-size: cover;
        `
      : css`
          background-color: ${theme.palette.smoke.main};
        `;
  }};
`;
