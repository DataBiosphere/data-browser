import React from "react";
import { Citation, ItemContainer } from "./Citations.styles";
import { Text } from "../Text/Text";

export interface ItemProps {
  value: string;
  citation?: string;
  align?: "right" | "left";
}

export const Item = ({ value, citation, align }: ItemProps): JSX.Element => {
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
