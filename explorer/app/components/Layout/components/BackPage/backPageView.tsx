import React, { ReactNode } from "react";
import {
  BackPageContent,
  BackPageContentMainColumn,
  BackPageContentSideColumn,
  BackPageHero,
  BackPageTabs,
  BackPageView as BackPageLayout,
  DetailPageOverviewContent,
  DetailPageOverviewContentMainColumn,
  DetailPageOverviewContentSideColumn,
} from "./backPageView.styles";

interface Props {
  isDetailOverview?: boolean;
  mainColumn: ReactNode;
  sideColumn: ReactNode;
  Tabs?: ReactNode;
  top: ReactNode;
}

export const BackPageView = ({
  isDetailOverview = false,
  mainColumn,
  sideColumn,
  Tabs,
  top,
}: Props): JSX.Element => {
  const Content = isDetailOverview
    ? DetailPageOverviewContent
    : BackPageContent;
  const MainColumn = isDetailOverview
    ? DetailPageOverviewContentMainColumn
    : BackPageContentMainColumn;
  const SideColumn = isDetailOverview
    ? DetailPageOverviewContentSideColumn
    : BackPageContentSideColumn;
  return (
    <BackPageLayout>
      <BackPageHero>{top}</BackPageHero>
      {Tabs && <BackPageTabs>{Tabs}</BackPageTabs>}
      <Content>
        <MainColumn>{mainColumn}</MainColumn>
        <SideColumn>{sideColumn}</SideColumn>
      </Content>
    </BackPageLayout>
  );
};
