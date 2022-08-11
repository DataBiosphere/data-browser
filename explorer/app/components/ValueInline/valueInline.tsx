import { Box } from "@mui/material";
import React from "react";
import { Text } from "../Text/Text";

interface ValueInlineProps {
  label: string;
  value: string;
}

export const ValueInline = ({
  label,
  value,
}: ValueInlineProps): JSX.Element => {
  return (
    <Box display="flex" gap={1}>
      <Text variant="text-body-small-500" customColor="ink">
        {value}
      </Text>
      <Text variant="text-body-small-400" customColor="ink" colorOption="light">
        {label}
      </Text>
    </Box>
  );
};
