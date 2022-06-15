import React from "react";
import { Text } from "../Text/Text";
import Link from "next/link";
import { ItemContainer } from "./TextLinks.styles";

export interface ItemProps {
  text: string;
  link?: { url: string; label: string };
}

export const Item = ({ text, link }: ItemProps): JSX.Element => {
  return (
    <ItemContainer>
      <Text variant="text-body-400-2lines" customColor="ink">
        {text}
      </Text>
      {link && (
        <Link href={link.url} passHref>
          <Text
            variant="text-body-400-2lines"
            component="a"
            customColor="primaryAnvil"
          >
            {link.label}
          </Text>
        </Link>
      )}
    </ItemContainer>
  );
};
