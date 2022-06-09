import React from "react";
import { Item, ItemProps } from "./Item";

interface ContactsProps {
  contacts: ItemProps[];
}

export const Contacts = ({ contacts }: ContactsProps): JSX.Element => {
  return (
    <div>
      {contacts.map((item) => (
        <Item key={item.name} {...item} />
      ))}
    </div>
  );
};
