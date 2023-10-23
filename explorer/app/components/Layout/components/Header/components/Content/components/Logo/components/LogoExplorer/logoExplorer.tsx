import { ImageSrc } from "@clevercanary/data-explorer-ui/lib/components/common/StaticImage/staticImage";
import { Logo } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/components/Content/components/Logo/logo";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { Divider, Typography } from "@mui/material";
import React from "react";
import { ExplorerText, ExplorerWithLogo } from "./logoExplorer.styles";

export interface LogoExplorerProps {
  alt: string;
  height?: number;
  link: string;
  src: ImageSrc;
  target?: ANCHOR_TARGET;
  width?: number;
}

export const LogoExplorer = ({
  alt,
  height,
  link,
  src,
  target,
  width,
}: LogoExplorerProps): JSX.Element => {
  return (
    <ExplorerWithLogo>
      <Logo
        alt={alt}
        height={height}
        link={link}
        src={src}
        target={target}
        width={width}
      />
      <Divider flexItem orientation="vertical" />
      <ExplorerText>
        <Typography component="div" color="primary">
          Data Explorer
        </Typography>
      </ExplorerText>
    </ExplorerWithLogo>
  );
};
