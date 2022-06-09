import { StaticImageData } from "next/image";
import React from "react";
import { StaticImage } from "../StaticImage/StaticImage";
import { Text } from "../Text/Text";
import { IconContainer, ItemContainer } from "./IconList.styles";

export interface ItemProps {
  label?: string;
  icon: {
    path: StaticImageData;
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
        <Text variant="text-body-400" customColor="colorInk">
          {label}
        </Text>
      )}
    </ItemContainer>
  );
};
