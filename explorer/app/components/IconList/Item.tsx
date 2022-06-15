import React from "react";
import { ImageSrc, StaticImage } from "../common/StaticImage/staticImage";
import { Text } from "../Text/Text";
import { IconContainer, ItemContainer } from "./IconList.styles";

export interface ItemProps {
  label?: string;
  icon: {
    path: ImageSrc;
    alt: string;
  };
}

export const Item = ({ label, icon }: ItemProps): JSX.Element => {
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
