import Link from "next/link";
import React from "react";
import { ItemContainer } from "./Contacts.styles";
import { Text } from "../Text/Text";

export interface ItemProps {
  name: string;
  institution?: string;
  email?: string;
}

export const Item = ({ name, institution, email }: ItemProps): JSX.Element => {
  return (
    <ItemContainer>
      <Text variant="text-body-400-2lines" customColor="colorInk">
        {name}
      </Text>
      {institution && (
        <Text
          variant="text-body-400-2lines"
          customColor="colorInk"
        >{` (${institution})`}</Text>
      )}
      {email && (
        <Link href={`mailto:${email}`} passHref>
          <Text
            variant="text-body-400-2lines"
            component="a"
            customColor="colorPrimartAnvil"
          >
            {email}
          </Text>
        </Link>
      )}
    </ItemContainer>
  );
};
