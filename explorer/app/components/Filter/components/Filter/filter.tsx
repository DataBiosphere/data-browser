// Core dependencies
import React, { ElementType, MouseEvent, ReactNode, useState } from "react";

// Styles
import { FilterPopover } from "./filter.styles";

interface Props {
  content: ReactNode; // e.g. basic filter menu
  tags?: ReactNode; // e.g. filter tags
  Target: ElementType; // e.g. filter label
}

export const Filter = ({ content, tags, Target }: Props): JSX.Element => {
  const [filterTargetEl, setFilterTargetEl] =
    useState<HTMLButtonElement | null>(null);

  /**
   * Closes filter popover.
   * Sets filterTargetEl state to null.
   */
  const onCloseFilter = (): void => {
    setFilterTargetEl(null);
  };

  /**
   * Opens filter popover.
   * Sets filterTargetEl state to the current target for the specified event.
   * @param event - Mouse event interaction with filter target.
   */
  const onOpenFilter = (event: MouseEvent<HTMLButtonElement>): void => {
    setFilterTargetEl(event.currentTarget);
  };

  return (
    <>
      <Target onClick={onOpenFilter} />
      <FilterPopover
        anchorEl={filterTargetEl}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
        onClose={onCloseFilter}
        open={Boolean(filterTargetEl)}
        PaperProps={{ variant: "menu" }}
      >
        {content}
      </FilterPopover>
      {tags}
    </>
  );
};
