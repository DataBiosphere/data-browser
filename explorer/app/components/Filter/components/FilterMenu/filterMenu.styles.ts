import styled from "@emotion/styled";

const LIST_ITEM_HEIGHT = 40;
const LIST_PADDING_TOP = 8;
const MAX_DISPLAYABLE_LIST_ITEMS = 8;
const MAX_LIST_HEIGHT_PX =
  (MAX_DISPLAYABLE_LIST_ITEMS + 0.5) * LIST_ITEM_HEIGHT + LIST_PADDING_TOP;

interface Props {
  menuWidth: number;
}

export const FilterView = styled.div<Props>`
  width: ${({ menuWidth }) => `${menuWidth}px`};

  // List
  .MuiList-root {
    max-height: ${MAX_LIST_HEIGHT_PX}px;
    overflow: auto;
    overflow-wrap: break-word;
    padding: 8px 0;
  }

  // List item
  .MuiListItemButton-root {
    gap: 8px;
  }

  // List item text
  .MuiListItemText-root {
    align-items: center;
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr auto;

    > span {
      min-width: 0; /* required; flexbox child min-width property is "auto" by default making overflow-wrap ineffectual */
    }
  }
`;
