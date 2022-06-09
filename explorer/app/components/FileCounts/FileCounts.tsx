import React from "react";
import { Item, ItemProps } from "./Item";

interface FileCountsProps {
  files: ItemProps[];
}

export const FileCounts = ({ files }: FileCountsProps): JSX.Element => {
  return (
    <div>
      {files.map((item) => (
        <Item key={item.name} {...item} />
      ))}
    </div>
  );
};
