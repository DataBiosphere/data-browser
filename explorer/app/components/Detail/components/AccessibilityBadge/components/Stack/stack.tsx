import { Stack as MStack } from "@mui/material";
import { ReactNode } from "react";

interface StackProps {
  children: ReactNode | ReactNode[];
}

export const Stack = ({ children }: StackProps): JSX.Element => {
  return (
    <MStack
      alignItems="center"
      direction="row"
      mt={{ sm: -2 }}
      spacing={4}
      useFlexGap={true}
    >
      {children}
    </MStack>
  );
};
