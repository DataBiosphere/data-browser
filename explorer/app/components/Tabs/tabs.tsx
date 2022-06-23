import React from "react";

import { Box, Tabs as MuiTabs, Tab } from "@mui/material";

interface TabsProps {
  tabs: {
    label: string;
  }[];
  children: React.ReactNode;
  onTabChange: (newTab: number) => void;
  selectedTab: number;
}

export const Tabs = ({
  tabs,
  children,
  onTabChange,
  selectedTab,
}: TabsProps): JSX.Element => {
  return (
    <Box display="flex" flexDirection="column">
      <Box>
        <MuiTabs
          value={selectedTab}
          onChange={(_, newIndex) => onTabChange(newIndex)}
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </MuiTabs>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};
