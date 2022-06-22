// Core dependencies
import { Link as PolicyLink, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export const DataReleasePolicy = (): JSX.Element => {
  return (
    <Typography variant="inherit">
      For information regarding data sharing and data use, please see our{" "}
      <Link href="https://www.humancellatlas.org/data-release-policy/" passHref>
        <PolicyLink target="_blank">HCA Data Release Policy</PolicyLink>
      </Link>
    </Typography>
  );
};
