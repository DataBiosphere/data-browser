import React from "react";

export interface TabContextValue {
  onTabChange: (newTab: number) => void;
  selectedTab: number;
}

/**
 * Context used to control the current selected tab and when it changes
 */
export const TabControllerContext = React.createContext<TabContextValue | null>(
  null
);

export const TabControllerProvider = TabControllerContext.Provider;
