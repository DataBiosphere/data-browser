import { StaticImage } from "@databiosphere/findable-ui/lib/components/common/StaticImage/staticImage";
import type { ComponentProps, JSX } from "react";

/**
 * Icon component that wraps the StaticImage component.
 * @param props - Component props.
 * @returns JSX element representing the icon.
 */
export const ExportIcon = (
  props: ComponentProps<typeof StaticImage>
): JSX.Element => {
  return <StaticImage {...props} />;
};
