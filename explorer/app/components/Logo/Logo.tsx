import React from "react";
import Image from "next/image";

export interface LogoProps {
  url: string;
  slogan?: string;
  width: number;
  height: number;
}

export const Logo: React.FC<LogoProps> = ({
  url,
  slogan,
  width,
  height,
}: LogoProps) => {
  return (
    <div>
      <Image
        src={url}
        alt="Company logo"
        loader={({ src }) => src}
        width={width}
        height={height}
      />
      {slogan && <span>{slogan}</span>}
    </div>
  );
};
