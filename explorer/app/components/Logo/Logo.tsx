import { StaticImageData } from "next/image";
import React from "react";
import { StaticImage } from "../StaticImage/StaticImage";

export interface LogoProps {
  url: StaticImageData;
  slogan?: string;
  width?: number;
  height?: number;
  alt: string;
}

export const Logo = ({
  url,
  slogan,
  width,
  height,
  alt,
}: LogoProps): JSX.Element => {
  return (
    <div>
      <StaticImage src={url} alt={alt} width={width} height={height} />
      {slogan && <span>{slogan}</span>}
    </div>
  );
};
