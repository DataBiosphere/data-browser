import { Box, IconButton } from "@mui/material";
import React from "react";
import { Text } from "../Text/Text";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  canNextPage?: boolean;
  canPreviousPage?: boolean;
}

export const Pagination = ({
  currentPage,
  onNextPage,
  onPreviousPage,
  totalPage,
  canNextPage = true,
  canPreviousPage = true,
}: PaginationProps): JSX.Element => {
  return (
    <Box display="flex" alignItems="center">
      <Text variant="text-body-400" customColor="ink">
        {"Page  "}
      </Text>
      <Text variant="text-body-500" customColor="ink">
        {currentPage} of {totalPage}
      </Text>
      <Box>
        <IconButton
          onClick={onPreviousPage}
          disabled={!canPreviousPage}
          color="ink"
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton onClick={onNextPage} disabled={!canNextPage} color="ink">
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
