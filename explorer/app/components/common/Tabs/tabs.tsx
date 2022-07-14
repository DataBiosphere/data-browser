// Core dependencies
import { Tab as MTab, Tabs as MTabs, TabProps, TabsProps } from "@mui/material";
import React from "react";

// Styles
import { TabScrollFuzz } from "./tabs.styles";

export type TabsValue = TabsProps["value"]; // any
export type TabValue = TabProps["value"]; // any
export type OnTabChangeFn = (tabValue: TabValue) => void; // Function invoked when selected tab value changes.

export interface Tab {
  icon?: TabProps["icon"]; // element or string
  iconPosition?: TabProps["iconPosition"]; // "bottom" or "end" or "start" or "top
  label: string;
  value: TabValue;
}

interface Props {
  onTabChange: OnTabChangeFn;
  tabs: Tab[];
  value: TabsValue;
}

export const Tabs = ({ onTabChange, tabs, value }: Props): JSX.Element => {
  return (
    <MTabs
      onChange={(_, tabValue): void => onTabChange(tabValue)}
      ScrollButtonComponent={TabScrollFuzz} // Utilizing MuiTabScrollButton to show/hide scroll fuzz.
      value={value}
    >
      {tabs.map(
        ({ icon, iconPosition = "start", label, value: tabValue }, t) => (
          <MTab
            icon={icon}
            iconPosition={icon ? iconPosition : undefined}
            key={`${label}${t}`}
            label={label}
            value={tabValue}
          />
        )
      )}
    </MTabs>
  );
};
