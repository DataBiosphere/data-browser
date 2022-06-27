// Core dependencies
import { Link as PolicyLink, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

// App dependencies
import { Section } from "../Section/section";

export const DataReleasePolicy = (): JSX.Element => {
  return (
    <Section title="Data Release Policy">
      <Typography>
        For information regarding data sharing and data use, please see our{" "}
        <Link
          href="https://www.humancellatlas.org/data-release-policy/"
          passHref
        >
          <PolicyLink target="_blank">HCA Data Release Policy</PolicyLink>
        </Link>
      </Typography>
    </Section>
  );
};
