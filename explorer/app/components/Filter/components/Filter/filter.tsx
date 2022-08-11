import { PopoverPosition } from "@mui/material";
import React, { ElementType, MouseEvent, ReactNode, useState } from "react";
import { FilterPopover } from "./filter.styles";

interface Props {
  content: ReactNode; // e.g. basic filter menu
  tags?: ReactNode; // e.g. filter tags
  Target: ElementType; // e.g. filter label
}

export const Filter = ({ content, tags, Target }: Props): JSX.Element => {
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [popoverPosition, setPopoverPosition] = useState<PopoverPosition>({
    left: 0,
    top: 0,
  });

  /**
   * Closes filter popover.
   */
  const onCloseFilter = (): void => {
    setOpenPopover(false);
  };

  /**
   * Opens filter popover and sets popover position.
   * @param event - Mouse event interaction with filter target.
   */
  const onOpenFilter = (event: MouseEvent<HTMLButtonElement>): void => {
    // Grab the filter target size and position and calculate the popover position.
    const targetDOMRect = event.currentTarget.getBoundingClientRect();
    const popoverLeftPos = targetDOMRect.x;
    const popoverTopPos = targetDOMRect.y + targetDOMRect.height;
    // Set popover position and open state.
    setPopoverPosition({ left: popoverLeftPos, top: popoverTopPos });
    setOpenPopover(true);
  };

  return (
    <>
      <Target onClick={onOpenFilter} />
      <FilterPopover
        anchorPosition={{ ...popoverPosition }}
        anchorReference="anchorPosition"
        onClose={onCloseFilter}
        open={openPopover}
        PaperProps={{ variant: "menu" }}
      >
        {content}
      </FilterPopover>
      {tags}
    </>
  );
};
