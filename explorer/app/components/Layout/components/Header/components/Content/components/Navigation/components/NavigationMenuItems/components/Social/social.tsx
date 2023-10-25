import { IconName } from "@clevercanary/data-explorer-ui/lib/components/common/CustomIcon/common/iconSvgPathShapes";
import { CustomIcon } from "@clevercanary/data-explorer-ui/lib/components/common/CustomIcon/customIcon";
import { TEXT_BODY_LARGE_400 } from "@clevercanary/data-explorer-ui/lib/theme/common/typography";
import { Typography } from "@mui/material";
import React from "react";
import { ButtonLabel } from "./social.styles";

export interface SocialProps {
  iconName?: IconName;
  label: string;
}

export const Social = ({ iconName, label }: SocialProps): JSX.Element => {
  return (
    <ButtonLabel>
      {iconName && (
        <CustomIcon color="inkLight" fontSize="small" iconName={iconName} />
      )}
      <Typography variant={TEXT_BODY_LARGE_400}>{label}</Typography>
    </ButtonLabel>
  );
};
