/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

/**
 * This component should be used only for images from the /images folder. And the url should be
 * a relative path from /images
 * These images will be optimized at the build time by next-optimized-images
 */
import { StaticImageData } from "next/image";
import React from "react";

export interface StaticImageProps {
  src: StaticImageData;
  width?: number;
  height?: number;
  alt: string;
}

export const StaticImage = ({
  src,
  width,
  height,
  alt,
}: StaticImageProps): JSX.Element => {
  return <img src={src as any} alt={alt} width={width} height={height} />;
};
