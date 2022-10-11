import React from "react";
import { Button as ButtonProps } from "../../common/entities";
import { LoginButton as Button, LoginButtonText } from "./loginButton.styles";

type Props = Exclude<ButtonProps, "StartIcon">;

export const LoginButton = ({ children, ...props }: Props): JSX.Element => {
  return (
    <Button fullWidth={true} {...props}>
      <LoginButtonText>{children}</LoginButtonText>
    </Button>
  );
};
