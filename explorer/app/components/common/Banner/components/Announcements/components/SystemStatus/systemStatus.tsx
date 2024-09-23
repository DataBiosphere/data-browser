import { BannerPrimary } from "@databiosphere/findable-ui/lib/components/common/Banner/components/BannerPrimary/bannerPrimary";

export const SystemStatus = ({ ...props }): JSX.Element => {
  return (
    <BannerPrimary {...props}>
      One or more of the system components are currently unavailable.
      Functionality may be degraded.
    </BannerPrimary>
  );
};
