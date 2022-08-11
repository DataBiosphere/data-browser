import EastRoundedIcon from "@mui/icons-material/EastRounded";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import { Typography } from "@mui/material";
import React from "react";
import { IconButtonSecondary } from "../../../common/IconButton/iconButton.styles";
import { Stack } from "../../../common/Stack/Stack";
import { Pagination as TablePagination } from "./pagination.styles";

interface Props {
  canNextPage?: boolean;
  canPreviousPage?: boolean;
  currentPage: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  totalPage: number;
}

export const Pagination = ({
  canNextPage = true,
  canPreviousPage = true,
  currentPage,
  onNextPage,
  onPreviousPage,
  totalPage,
}: Props): JSX.Element => {
  return (
    <TablePagination>
      <div>
        <Typography variant="text-body-400">Page </Typography>
        <Typography variant="text-body-500">
          {currentPage} of {totalPage}
        </Typography>
      </div>
      <Stack direction="row" gap={2}>
        <IconButtonSecondary
          disabled={!canPreviousPage}
          Icon={WestRoundedIcon}
          onClick={onPreviousPage}
        />
        <IconButtonSecondary
          disabled={!canNextPage}
          Icon={EastRoundedIcon}
          onClick={onNextPage}
        />
      </Stack>
    </TablePagination>
  );
};
