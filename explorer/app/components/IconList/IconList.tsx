import React from "react";
import { Item, ItemProps } from "./Item";

interface IconListProps {
  icons: ItemProps[];
}

export const IconList = ({ icons }: IconListProps): JSX.Element => {
  return (
    <div>
      {icons.map((item, index) => (
        <Item key={index} {...item} />
      ))}
    </div>
  );
};
