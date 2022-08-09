import { Typography } from "@mui/material";
import React from "react";
import { Text } from "../Text/Text";
import Link from "next/link";
import { ItemContainer } from "./TextLinks.styles";

export interface ItemProps {
  link?: { label: string; url: string };
  text: string;
}

export const Item = ({ link, text }: ItemProps): JSX.Element => {
  return (
    <ItemContainer>
      <Text variant="text-body-400-2lines" customColor="ink">
        {text}
      </Text>
      {link && (
        <Link href={link.url} passHref>
          <Typography
            variant="text-body-400-2lines"
            component="a"
            color="primary"
          >
            {link.label}
          </Typography>
        </Link>
      )}
    </ItemContainer>
  );
};
