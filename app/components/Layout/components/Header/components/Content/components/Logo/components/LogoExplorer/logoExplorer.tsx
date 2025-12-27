import { ImageSrc } from "@databiosphere/findable-ui/lib/components/common/StaticImage/staticImage";
import { Logo } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Logo/logo";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "@databiosphere/findable-ui/lib/hooks/useBreakpointHelper";
import { JSX } from "react";

export interface LogoExplorerProps {
  alt: string;
  height: [number, number]; // [mobile, desktop]
  src: [ImageSrc, ImageSrc]; // [mobile, desktop]
  url: string;
}

export const LogoExplorer = ({
  alt,
  height,
  src,
  url,
}: LogoExplorerProps): JSX.Element => {
  const bpMdUp = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, "md");
  return (
    <Logo
      alt={alt}
      height={bpMdUp ? height[1] : height[0]}
      link={url}
      src={bpMdUp ? src[1] : src[0]}
    />
  );
};
