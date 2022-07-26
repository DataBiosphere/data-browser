import React from "react";
import { ImageSrc, StaticImage } from "../common/StaticImage/staticImage";
import { Text } from "../Text/Text";
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
        <Text variant="text-body-400" customColor="ink">
          {label}
        </Text>
      )}
    </ItemContainer>
  );
};
