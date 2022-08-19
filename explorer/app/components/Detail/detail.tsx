import React, { ReactNode } from "react";
import { BackPageView } from "../Layout/components/BackPage/backPageView";

interface Props {
  mainColumn: ReactNode;
  sideColumn: ReactNode;
  Tabs?: ReactNode;
  top: ReactNode;
}

export const Detail = ({
  mainColumn,
  sideColumn,
  Tabs,
  top,
}: Props): JSX.Element => {
  return (
    <BackPageView
      mainColumn={mainColumn}
      sideColumn={sideColumn}
      Tabs={Tabs}
      top={top}
    />
  );
};
