import { Typography } from "@mui/material";
import React from "react";
import { Text } from "../Text/Text";
import { ItemContainer } from "./FileCounts.styles";

export interface ItemProps {
  count: string | number;
  name: string;
}

export const Item = ({ count, name }: ItemProps): JSX.Element => {
  return (
    <ItemContainer>
      <Text variant="text-body-400-2lines" customColor="ink">
        {name}
      </Text>
      <Typography
        variant="text-body-400-2lines"
        color="primary"
      >{`${count} file(s)`}</Typography>
    </ItemContainer>
  );
};
