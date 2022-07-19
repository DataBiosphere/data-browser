// Core dependencies
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import {
  Breadcrumbs as MBreadcrumbs,
  Link as BreadcrumbLink,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { ReactNode } from "react";

export interface Breadcrumb {
  path: string;
  text: string;
}

interface Props {
  breadcrumbs: Breadcrumb[];
  Separator?: ReactNode;
}

export const Breadcrumbs = ({
  breadcrumbs,
  Separator = <ChevronRightRoundedIcon fontSize="xxsmall" />,
}: Props): JSX.Element => {
  return (
    <>
      {breadcrumbs.length > 0 ? (
        <MBreadcrumbs separator={Separator}>
          {breadcrumbs.map(({ path, text }, b) =>
            path ? (
              <Link key={`${path}${b}`} href={path} passHref>
                <BreadcrumbLink>{text}</BreadcrumbLink>
              </Link>
            ) : (
              <Typography key={`${path}${b}`} maxWidth={180} noWrap>
                {text}
              </Typography>
            )
          )}
        </MBreadcrumbs>
      ) : null}
    </>
  );
};
