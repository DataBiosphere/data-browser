import React, { Fragment, ReactNode } from "react";
import {
  BREAKPOINT,
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";
import { FlatPaper } from "../../../common/Paper/paper.styles";
import {
  BackPageHero,
  BackPageOverview as Overview,
  BackPageOverviewMain as Main,
  BackPageOverviewSide as Side,
  BackPageView as BackPageLayout,
} from "./backPageView.styles";

interface Props {
  mainColumn: ReactNode;
  sideColumn: ReactNode;
  Tabs?: ReactNode;
  top: ReactNode;
}

export const BackPageView = ({
  mainColumn,
  sideColumn,
  Tabs,
  top,
}: Props): JSX.Element => {
  const tablet = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, BREAKPOINT.TABLET);
  const BackPageOverview = tablet
    ? Overview
    : Overview.withComponent(FlatPaper);
  const BackPageOverviewMain = tablet ? Main : Fragment;
  const BackPageOverviewSide = tablet ? Side : Fragment;
  return (
    <BackPageLayout>
      <BackPageHero>
        {top}
        {Tabs}
      </BackPageHero>
      <BackPageOverview>
        <BackPageOverviewMain>{mainColumn}</BackPageOverviewMain>
        <BackPageOverviewSide>{sideColumn}</BackPageOverviewSide>
      </BackPageOverview>
    </BackPageLayout>
  );
};
