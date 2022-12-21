import { AzulEntityStaticResponse } from "app/apis/azul/common/entities";
import { ComponentCreator } from "app/components/ComponentCreator/ComponentCreator";
import { BackPageView } from "app/components/Layout/components/BackPage/backPageView";
import { useExportConfig } from "app/hooks/useExportConfig";
import React from "react";

export const ExportView = (props: AzulEntityStaticResponse): JSX.Element => {
  const exportConfig = useExportConfig();
  const currentTab = exportConfig.tabs[0];
  const mainColumn = currentTab.mainColumn;
  const sideColumn = currentTab.sideColumn;
  const top = exportConfig.top;

  return (
    <BackPageView
      mainColumn={<ComponentCreator components={mainColumn} response={props} />}
      sideColumn={
        sideColumn ? (
          <ComponentCreator components={sideColumn} response={props} />
        ) : undefined
      }
      top={<ComponentCreator components={top} response={props} />}
    />
  );
};
