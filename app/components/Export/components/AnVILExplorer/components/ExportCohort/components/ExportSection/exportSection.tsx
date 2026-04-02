import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { Stack, Typography } from "@mui/material";
import type { JSX } from "react";

/**
 * Returns section title and description for exporting cohort files and metadata.
 * @returns Export section title and description.
 */
export const ExportSection = (): JSX.Element => {
  return (
    <Stack gap={1}>
      <Typography
        component="h2"
        variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_SMALL}
      >
        Export
      </Typography>
      <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_400}>
        Send selected files and metadata to a supported cloud workspace for
        analysis.
      </Typography>
    </Stack>
  );
};
