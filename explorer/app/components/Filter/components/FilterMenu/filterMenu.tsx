// Core dependencies
import {
  Checkbox,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

// App dependencies
import { CheckedIcon } from "app/components/common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "app/components/common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import {
  CategoryKey,
  SelectCategoryValueView,
} from "../../../../common/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";

// Styles
import { FilterView } from "./filterMenu.styles";

interface Props {
  categoryKey: CategoryKey;
  menuWidth?: number;
  onFilter: OnFilterFn;
  values: SelectCategoryValueView[];
}

export const FilterMenu = ({
  categoryKey,
  menuWidth = 312,
  onFilter,
  values,
}: Props): JSX.Element => {
  return (
    <FilterView menuWidth={menuWidth}>
      <List>
        {values.map(({ count, key, label, selected }) => (
          <ListItemButton
            key={key}
            onClick={(): void => onFilter(categoryKey, key, selected)}
            selected={selected}
          >
            <Checkbox
              checked={selected}
              checkedIcon={<CheckedIcon />}
              icon={<UncheckedIcon />}
            />
            <ListItemText
              disableTypography
              primary={<span>{label}</span>}
              secondary={
                <Typography color="inkLight" variant="text-body-small-400">
                  {count}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </FilterView>
  );
};
