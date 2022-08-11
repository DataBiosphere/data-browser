import { AzulEntityStaticResponse } from "app/apis/azul/common/entities";
import { ComponentCreator } from "app/components/ComponentCreator/ComponentCreator";
import { BackPageView } from "app/components/Layout/components/BackPage/backPageView";
import { useExportConfig } from "app/hooks/useExportConfig";
import React from "react";

export const ExportPage = (props: AzulEntityStaticResponse): JSX.Element => {
  const exportConfig = useExportConfig();
  const currentTab = exportConfig.tabs[0];
  const mainColumn = currentTab.mainColumn;
  const sideColumn = currentTab.sideColumn;
  const top = exportConfig.top;

  return (
    <BackPageView
      mainColumn={<ComponentCreator components={mainColumn} response={props} />}
      sideColumn={<ComponentCreator components={sideColumn} response={props} />}
      top={<ComponentCreator components={top} response={props} />}
    />
  );
};
