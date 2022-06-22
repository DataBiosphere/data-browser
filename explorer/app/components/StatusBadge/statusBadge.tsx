// Core dependencies
import { Chip } from "@mui/material";
import React from "react";

export enum STATUS {
  NEW = "NEW",
  NONE = "NONE",
  UPDATED = "UPDATED",
}

const STATUS_CONFIG = {
  [STATUS.NEW]: { color: "info", label: "New" },
  [STATUS.NONE]: { color: "default", label: "None" },
  [STATUS.UPDATED]: { color: "warning", label: "Updated" },
} as const;

interface Props {
  status: STATUS;
}

export const StatusBadge = ({ status }: Props): JSX.Element => {
  return (
    <>
      {status !== STATUS.NONE && (
        <Chip
          color={STATUS_CONFIG[status].color}
          label={STATUS_CONFIG[status].label}
          variant="status"
        />
      )}
    </>
  );
};
