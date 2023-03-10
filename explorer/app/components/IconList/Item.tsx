import {
  ImageSrc,
  StaticImage,
} from "@clevercanary/data-explorer-ui/lib/components/common/StaticImage/staticImage";
import { Typography } from "@mui/material";
import React from "react";
import { IconContainer, ItemContainer } from "./IconList.styles";

export interface ItemProps {
  icon: {
    alt: string;
    path: ImageSrc;
  };
  label?: string;
}

export const Item = ({ icon, label }: ItemProps): JSX.Element => {
  return (
    <ItemContainer>
      <IconContainer>
        <StaticImage src={icon.path} alt={icon.alt} />
      </IconContainer>
      {label && (
        <Typography variant="text-body-400" color="ink">
          {label}
        </Typography>
      )}
    </ItemContainer>
  );
};
