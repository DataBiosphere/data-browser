import { OpenInNewIcon } from "@clevercanary/data-explorer-ui/lib/components/common/CustomIcon/components/OpenInNewIcon/openInNewIcon";
import React, { ElementType } from "react";
import { Label } from "./labelIconMenuItem.styles";

export interface LabelIconMenuItemProps {
  Icon?: ElementType;
  label: string;
}

export const LabelIconMenuItem = ({
  Icon = OpenInNewIcon,
  label,
}: LabelIconMenuItemProps): JSX.Element => {
  return (
    <Label>
      <div>{label}</div>
      <Icon color="inkLight" fontSize="xsmall" />
    </Label>
  );
};
