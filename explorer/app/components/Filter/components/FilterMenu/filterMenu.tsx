import {
  Checkbox,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { CheckedIcon } from "app/components/common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "app/components/common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { matchSorter } from "match-sorter";
import React, { useState } from "react";
import {
  CategoryKey,
  SelectCategoryValueView,
} from "../../../../common/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { FilterMenuSearch } from "../FilterMenuSearch/filterMenuSearch";
import { FilterNoResultsFound } from "../FilterNoResultsFound/filterNoResultsFound";
import { FilterView, MAX_DISPLAYABLE_LIST_ITEMS } from "./filterMenu.styles";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const isSearchable = values.length > MAX_DISPLAYABLE_LIST_ITEMS;
  const filteredValues = isSearchable
    ? matchSorter(values, searchTerm, {
        keys: ["key", "label"],
      })
    : values;
  return (
    <FilterView menuWidth={menuWidth}>
      {isSearchable && (
        <FilterMenuSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}
      <List>
        {filteredValues.length > 0 ? (
          filteredValues.map(({ count, key, label, selected }) => (
            <ListItemButton
              key={key}
              onClick={(): void => onFilter(categoryKey, key, !selected)}
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
          ))
        ) : (
          <FilterNoResultsFound
            onClearSearchTerm={(): void => setSearchTerm("")}
          />
        )}
      </List>
    </FilterView>
  );
};
