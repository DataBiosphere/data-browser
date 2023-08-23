import { Fade as MFade, FadeProps as MFadeProps } from "@mui/material";
import React, { ReactNode } from "react";

/**
 * Basic Fade component for rendering with component configuration.
 * Transition child requirements: see https://mui.com/material-ui/transitions/#child-requirement.
 * A wrapper element around component configuration "children" is required as the "children" do not meet the child
 * requirements for a transition component i.e. they are not defined as a single element.
 */

export interface FadeProps extends Omit<MFadeProps, "children"> {
  children: ReactNode[]; // component configuration "children" are not defined as a single element.
}

export const Fade = ({
  children,
  ...props /* Spread props to allow for Mui Fade specific prop overrides e.g. "appear" or "style". */
}: FadeProps): JSX.Element => {
  return (
    <MFade {...props}>
      <div>{children}</div>
    </MFade>
  );
};
