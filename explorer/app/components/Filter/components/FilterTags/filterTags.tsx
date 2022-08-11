import React from "react";
import { CategoryTag } from "../../../../common/entities";
import { FilterTag as Tag } from "../FilterTag/filterTag";
import { FilterTags as Tags } from "./filterTags.styles";

interface Props {
  tags?: CategoryTag[];
}

export const FilterTags = ({ tags }: Props): JSX.Element | null => {
  return tags && tags.length ? (
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
  ) : null;
};
