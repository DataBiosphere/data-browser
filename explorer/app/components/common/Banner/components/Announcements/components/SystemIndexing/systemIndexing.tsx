import { BannerPrimary } from "@databiosphere/findable-ui/lib/components/common/Banner/components/BannerPrimary/bannerPrimary";
import React from "react";

export const SystemIndexing = ({ ...props }): JSX.Element => {
  return (
    <BannerPrimary {...props}>
      Data indexing in progress. Downloads and exports are disabled as search
      results may be incomplete.
    </BannerPrimary>
  );
};
