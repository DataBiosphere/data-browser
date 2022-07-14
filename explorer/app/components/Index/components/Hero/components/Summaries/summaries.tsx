// Core dependencies
import { Typography } from "@mui/material";
import React, { Fragment } from "react";

// App dependencies
import { Dot } from "../../../../../common/Dot/dot";
import { Summary } from "../../../../common/entities";
import { Stack } from "../../../../../common/Stack/Stack";

interface Props {
  summaries?: Summary[];
}

export const Summaries = ({ summaries }: Props): JSX.Element => {
  return (
    <>
      {summaries &&
        summaries.map(({ count, label }, c) => (
          <Fragment key={`${label}${c}`}>
            {c !== 0 && <Dot />}
            <Stack direction="row" gap={1}>
              <Typography color="ink" variant="text-body-small-500">
                {count}
              </Typography>
              <Typography color="inkLight" variant="text-body-small-400">
                {label}
              </Typography>
            </Stack>
          </Fragment>
        ))}
    </>
  );
};
