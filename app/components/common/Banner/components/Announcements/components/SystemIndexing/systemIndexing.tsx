import { BannerPrimary } from "@databiosphere/findable-ui/lib/components/common/Banner/components/BannerPrimary/bannerPrimary";

export const SystemIndexing = ({ ...props }): JSX.Element => {
  return (
    <BannerPrimary {...props}>
      Data indexing in progress. Downloads and exports are disabled as search
      results may be incomplete.
    </BannerPrimary>
  );
};
