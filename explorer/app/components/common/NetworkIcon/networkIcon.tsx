import {
  StaticImage,
  StaticImageProps,
} from "@databiosphere/findable-ui/lib/components/common/StaticImage/staticImage";
import { NETWORK_ICONS } from "../../Index/common/constants";
import { NetworkKey } from "../../Index/common/entities";

export interface NetworkIconProps
  extends Pick<StaticImageProps, "height" | "width"> {
  networkKey: NetworkKey;
}

export const NetworkIcon = ({
  height = 24,
  networkKey,
  ...props
}: NetworkIconProps): JSX.Element => {
  return (
    <StaticImage
      alt={networkKey}
      height={height}
      src={NETWORK_ICONS[networkKey]}
      {...props}
    />
  );
};
