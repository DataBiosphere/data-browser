import React from "react";
import { Citation, ItemContainer } from "./Citations.styles";
import { Text } from "../Text/Text";

export interface ItemProps {
  align?: "right" | "left";
  citation?: string;
  value: string;
}

export const Item = ({ align, citation, value }: ItemProps): JSX.Element => {
  return (
    <ItemContainer>
      {citation && align === "left" && <Citation>{citation}</Citation>}
      <Text variant="text-body-400-2lines" customColor="ink">
        {value}
      </Text>
      {citation && align === "right" && <Citation>{citation}</Citation>}
    </ItemContainer>
  );
};
