import { Box } from "@mui/material";
import React from "react";
import { Text } from "../Text/Text";

interface SectionProps {
  title?: string;
  children: React.ReactNode | React.ReactNode[];
}

export const Section = ({ children, title }: SectionProps): JSX.Element => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={(theme) => theme.spacing(2)}
      padding={(theme) => theme.spacing(5)}
    >
      {title && (
        <Text variant="text-body-large-500" customColor="ink">
          {title}
        </Text>
      )}
      <Box>{children}</Box>
    </Box>
  );
};
