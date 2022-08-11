// Core dependencies
import React, { Fragment, ReactNode } from "react";

// App dependencies
import {
  BREAKPOINT,
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";

// Styles
import {
  BackPageView as BackPageLayout,
  BackPageHero,
  BackPageOverview as Overview,
  BackPageOverviewMain as Main,
  BackPageOverviewSide as Side,
} from "./backPageView.styles";
import { FlatPaper } from "../../../common/Paper/paper.styles";

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
