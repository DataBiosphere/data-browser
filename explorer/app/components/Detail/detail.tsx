import React, { ReactNode } from "react";
import { BackPageView } from "../Layout/components/BackPage/backPageView";

interface Props {
  isDetailOverview?: boolean;
  mainColumn: ReactNode;
  sideColumn?: ReactNode;
  Tabs?: ReactNode;
  top: ReactNode;
}

export const Detail = ({
  isDetailOverview,
  mainColumn,
  sideColumn,
  Tabs,
  top,
}: Props): JSX.Element => {
  return (
    <BackPageView
      isDetailOverview={isDetailOverview}
      mainColumn={mainColumn}
      sideColumn={sideColumn}
      Tabs={Tabs}
      top={top}
    />
  );
};
