// Core dependencies
import Link from "next/link";
import React from "react";

// App dependencies
import { Logo as LogoProps } from "../../../../common/entities";
import { StaticImage } from "../../../../../common/StaticImage/staticImage";

interface Props {
  logo: LogoProps;
}

export const Logo = ({ logo }: Props): JSX.Element => {
  const { alt, height, link, src, width } = logo;
  return (
    <Link href={link} passHref>
      <a href="passHref">
        <StaticImage alt={alt} height={height} src={src} width={width} />
      </a>
    </Link>
  );
};
