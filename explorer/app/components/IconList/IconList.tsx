import React from "react";
import { Item, ItemProps } from "./Item";

/**
 * TODO deprecate IconList folder and associated components and use KeyValuePairs component instead.
 */

interface IconListProps {
  icons: ItemProps[];
}

export const IconList = ({ icons }: IconListProps): JSX.Element => {
  return (
    <>
      {icons.length ? (
        <div>
          {icons.map((item, index) => (
            <Item key={index} {...item} />
          ))}
        </div>
      ) : (
        "None"
      )}
    </>
  );
};
