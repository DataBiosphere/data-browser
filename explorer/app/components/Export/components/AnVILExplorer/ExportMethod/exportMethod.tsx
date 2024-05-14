"use client";
import {
  ExportMethod as DXExportMethod,
  ExportMethodProps,
} from "@databiosphere/findable-ui/lib/components/Export/components/ExportMethod/exportMethod";
import { useExploreState } from "@databiosphere/findable-ui/lib/hooks/useExploreState";
import React, { Fragment, useEffect, useState } from "react";
import { FEATURE_FLAGS } from "../../../../../viewModelBuilders/common/contants";

export const ExportMethod = ({ ...props }: ExportMethodProps): JSX.Element => {
  const {
    exploreState: { featureFlagState },
  } = useExploreState();
  const [showMethod, setShowMethod] = useState<boolean>(false);

  useEffect(() => {
    if (featureFlagState) {
      setShowMethod(featureFlagState === FEATURE_FLAGS.MANIFEST);
    }
  }, [featureFlagState]);

  return showMethod ? <DXExportMethod {...props} /> : <Fragment />;
};
