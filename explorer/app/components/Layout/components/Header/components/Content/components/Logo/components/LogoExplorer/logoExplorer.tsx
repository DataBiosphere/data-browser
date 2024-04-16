import { ImageSrc } from "@databiosphere/findable-ui/lib/components/common/StaticImage/staticImage";
import { Logo } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Logo/logo";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "@databiosphere/findable-ui/lib/hooks/useBreakpointHelper";
import { DESKTOP_SM } from "@databiosphere/findable-ui/lib/theme/common/breakpoints";

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
  const smDesktop = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, DESKTOP_SM);
  return (
    <Logo
      alt={alt}
      height={smDesktop ? height[1] : height[0]}
      link={url}
      src={smDesktop ? src[1] : src[0]}
    />
  );
};
