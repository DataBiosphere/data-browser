import { Link as MLink } from "@mui/material";
import NLink from "next/link";
import React from "react";
import { CopyToClipboard } from "../../../common/CopyToClipboard/copyToClipboard";
import { ANCHOR_TARGET, Link as ILink } from "../../common/entities";

type Props = ILink;

export const Link = ({
  copyable = false,
  label,
  noWrap = false,
  target = ANCHOR_TARGET.SELF,
  url,
}: Props): JSX.Element => {
  return (
    <>
      <NLink href={url} passHref>
        <MLink rel="noopener" noWrap={noWrap} target={target}>
          {label}
        </MLink>
      </NLink>
      {copyable && <CopyToClipboard copyStr={url} />}
    </>
  );
};
