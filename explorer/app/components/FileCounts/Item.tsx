import React from "react";
import { Text } from "../Text/Text";
import { ItemContainer } from "./FileCounts.styles";

export interface ItemProps {
  name: string;
  count: string | number;
}

export const Item = ({ count, name }: ItemProps): JSX.Element => {
  return (
    <ItemContainer>
      <Text variant="text-body-400-2lines" customColor="ink">
        {name}
      </Text>
      <Text
        variant="text-body-400-2lines"
        customColor="primaryAnvil"
      >{`${count} file(s)`}</Text>
    </ItemContainer>
  );
};
