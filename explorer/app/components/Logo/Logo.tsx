import React from "react";
import Image from "next/image";

export interface LogoProps {
  url: string;
  slogan?: string;
  width: number;
  height: number;
  alt: string;
}

export const Logo: React.FC<LogoProps> = ({
  url,
  slogan,
  width,
  height,
  alt,
}: LogoProps) => {
  return (
    <div>
      <Image
        src={url}
        alt={alt}
        loader={({ src }) => src} //TODO: This loader is just a placeholder for now. It will change when we start serving real images.
        width={width}
        height={height}
        unoptimized
      />
      {slogan && <span>{slogan}</span>}
    </div>
  );
};
