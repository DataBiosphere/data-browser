import { Typography } from "@mui/material";
import React from "react";
import { TextButtonPrimary } from "../../../common/Button/button.styles";
import { FilterNoResultsFound as FilterNoResults } from "./filterNoResultsFound.styles";

type OnClearSearchTermFn = () => void;

interface Props {
  onClearSearchTerm: OnClearSearchTermFn;
}

export const FilterNoResultsFound = ({
  onClearSearchTerm,
}: Props): JSX.Element => {
  return (
    <FilterNoResults>
      <Typography component="div" variant="text-body-500">
        No results found!
      </Typography>
      <Typography
        component="div"
        color="ink.light"
        mb={2}
        mt={1}
        variant="text-body-400"
      >
        Try adjusting your search or filter to find what you’re looking for.
      </Typography>
      <TextButtonPrimary onClick={onClearSearchTerm}>
        Clear All
      </TextButtonPrimary>
    </FilterNoResults>
  );
};
