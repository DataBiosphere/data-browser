import { Box } from "@mui/material";
import React from "react";
import { Text } from "../Text/Text";

interface LabelValueProps {
  label: string;
  value: string;
}

export const LabelValue = ({ label, value }: LabelValueProps): JSX.Element => {
  return (
    <Box display="grid">
      <Text variant="text-body-400-2lines" customColor="inkLight">
        {label}
      </Text>
      <Text variant="text-body-400-2lines" customColor="ink">
        {value}
      </Text>
    </Box>
  );
};
