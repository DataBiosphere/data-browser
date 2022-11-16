import { LinkProps } from "@mui/material";
import { ReactNode } from "react";

export enum ANCHOR_TARGET {
  BLANK = "_blank",
  SELF = "_self",
}

export interface Link {
  copyable?: boolean;
  label: ReactNode /* link label may be an element */;
  noWrap?: LinkProps["noWrap"];
  target?: ANCHOR_TARGET;
  url: string;
}
