// Core dependencies
import React from "react";

// App dependencies
import { CategoryTag } from "../../../../common/entities";
import { FilterTag as Tag } from "../FilterTag/filterTag";

// Styles
import { FilterTags as Tags } from "./filterTags.styles";

interface Props {
  tags: CategoryTag[];
}

export const FilterTags = ({ tags }: Props): JSX.Element => {
  return (
    <Tags>
      {tags.map(({ label, onRemove, superseded }, t) => (
        <Tag
          key={`${label}${t}`}
          label={label}
          onRemove={onRemove}
          superseded={superseded}
        />
      ))}
    </Tags>
  );
};
