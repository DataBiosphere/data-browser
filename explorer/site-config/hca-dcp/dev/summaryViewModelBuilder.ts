// Core dependencies
import React from "react";

// App dependencies
import { SummaryResponse } from "app/models/responses";
import * as C from "../../../app/components";

const countFormatter = Intl.NumberFormat("en", { notation: "compact" });

export const title = (): React.ComponentProps<typeof C.Text> => {
  return {
    variant: "text-heading-large",
    customColor: "ink",
    children: "Explore Data: DCP 2.0 Data View",
  };
};

export const summaryToEstimatedCells = (
  summary?: SummaryResponse
): React.ComponentProps<typeof C.ValueInline> => {
  if (!summary) {
    return {
      label: "Estimated Cells",
      value: "0",
    };
  }

  const projects = summary.projects ?? [];
  const estimatedCells = projects.reduce(
    (acc, { cellSuspensions, projects }) => {
      if (
        projects &&
        (projects.estimatedCellCount || projects.estimatedCellCount === 0)
      ) {
        acc += projects.estimatedCellCount;
      } else if (
        cellSuspensions &&
        (cellSuspensions.totalCells || cellSuspensions.totalCells === 0)
      ) {
        acc += cellSuspensions.totalCells;
      }
      return acc;
    },
    0
  );

  return {
    label: "Estimated Cells",
    value: `${countFormatter.format(estimatedCells)}`,
  };
};

export const summaryToSpecimens = (
  summary?: SummaryResponse
): React.ComponentProps<typeof C.ValueInline> => {
  if (!summary) {
    return {
      label: "Specimens",
      value: "0",
    };
  }

  return {
    label: "Specimens",
    value: `${countFormatter.format(summary.specimenCount)}`,
  };
};

export const summaryToDonors = (
  summary?: SummaryResponse
): React.ComponentProps<typeof C.ValueInline> => {
  if (!summary) {
    return {
      label: "Donors",
      value: "0",
    };
  }

  return {
    label: "Donors",
    value: `${countFormatter.format(summary.donorCount)}`,
  };
};

export const summaryToFiles = (
  summary?: SummaryResponse
): React.ComponentProps<typeof C.ValueInline> => {
  if (!summary) {
    return {
      label: "Files",
      value: "0",
    };
  }

  return {
    label: "Files",
    value: `${countFormatter.format(summary.fileCount)}`,
  };
};
