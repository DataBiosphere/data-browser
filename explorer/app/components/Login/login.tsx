import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { LoginButton } from "../common/Button/components/LoginButton/loginButton";
import { GoogleIcon } from "../common/CustomIcon/components/GoogleIcon/googleIcon";
import { RoundedPaper } from "../common/Paper/paper.styles";
import { SectionContent } from "../Detail/components/Section/section.styles";
import {
  LoginSection,
  LoginSectionActions,
  LoginWrapper,
} from "./login.styles";

interface Props {
  isGoogle?: boolean;
  loginNotice?: ReactNode;
  text?: string;
  title: string;
}

export const Login = ({
  isGoogle = false,
  loginNotice,
  text,
  title,
}: Props): JSX.Element => {
  return (
    <LoginWrapper>
      <RoundedPaper>
        <LoginSection>
          <SectionContent>
            <Typography color="ink.main" component="h3" variant="text-heading">
              {title}
            </Typography>
            <Typography variant="text-body-400">{text}</Typography>
          </SectionContent>
          <LoginSectionActions>
            {isGoogle && <LoginButton EndIcon={GoogleIcon}>Google</LoginButton>}
          </LoginSectionActions>
        </LoginSection>
      </RoundedPaper>
      {loginNotice}
    </LoginWrapper>
  );
};
