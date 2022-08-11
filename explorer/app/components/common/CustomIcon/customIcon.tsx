import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";
import { IconName, IconSvgPathShapes } from "./common/iconSvgPathShapes";

interface Props extends SvgIconProps {
  iconName: IconName;
}

export const CustomIcon = ({
  iconName,
  ...props /* Spread props to allow for svg icon specific props SvgIconProps e.g. "fontSize", or "htmlColor". */
}: Props): JSX.Element => {
  const pathShapes = IconSvgPathShapes[iconName];
  return (
    <SvgIcon {...props}>
      {pathShapes.map((shape, s) => (
        <path key={`${iconName}${s}`} d={shape} />
      ))}
    </SvgIcon>
  );
};
