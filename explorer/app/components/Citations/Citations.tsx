import React from "react";
import { Item, ItemProps } from "./Item";

interface CitationsProps {
  citations: ItemProps[];
  align?: "right" | "left";
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
