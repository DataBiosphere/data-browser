import React from "react";
import { Item, ItemProps } from "./Item";

interface CitationsProps {
  align?: "right" | "left";
  citations: ItemProps[];
}

export const Citations = ({
  citations,
  align = "right",
}: CitationsProps): JSX.Element => {
  return (
    <div>
      {citations.map((item) => (
        <Item key={item.value} align={align} {...item} />
      ))}
    </div>
  );
};
