// Core dependencies
import Link from "next/link";
import React from "react";

// App dependencies
import { ImageSrc, StaticImage } from "../../../common/StaticImage/staticImage";

export interface LogoProps {
  alt: string;
  height?: number;
  link: string;
  src: ImageSrc;
  width?: number;
}

export const Logo = ({
  alt,
  height,
  link,
  src,
  width,
}: LogoProps): JSX.Element => {
  return (
    <>
      <Link href={link} passHref>
        <a href="passHref">
          <StaticImage alt={alt} height={height} src={src} width={width} />
        </a>
      </Link>
    </>
  );
};
