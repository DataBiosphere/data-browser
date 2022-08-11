import { Typography } from "@mui/material";
import React from "react";

export type HeroTitle = string;

interface Props {
  title: HeroTitle;
}

export const Title = ({ title }: Props): JSX.Element => {
  return (
    <Typography color="ink.main" component="h1" variant="text-heading-large">
      {title}
    </Typography>
  );
};
