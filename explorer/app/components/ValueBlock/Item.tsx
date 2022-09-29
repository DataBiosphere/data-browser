import React from "react";
import { Text } from "../Text/Text";
import { ItemContainer } from "./ValueBlock.styles";

export interface ItemProps {
  label: string;
  value: string;
}

export const Item = ({ label, value }: ItemProps): JSX.Element => {
  return (
    <ItemContainer>
      <Text variant="text-heading-small" customColor="ink">
        {value}
      </Text>
      <Text variant="text-body-400" customColor="ink" colorOption="light">
        {label}
      </Text>
    </ItemContainer>
  );
};