// Core dependencies
import { Typography } from "@mui/material";
import React from "react";

interface Props {
  firstResult: number;
  lastResult: number;
  totalResult: number;
}

export const PaginationSummary = ({
  firstResult,
  lastResult,
  totalResult,
}: Props): JSX.Element => {
  return (
    <div>
      <Typography variant="text-body-400">Results </Typography>
      <Typography variant="text-body-small-500">
        {firstResult} - {lastResult}
      </Typography>
      <Typography variant="text-body-400"> of </Typography>
      <Typography variant="text-body-small-500">{totalResult}</Typography>
    </div>
  );
};
