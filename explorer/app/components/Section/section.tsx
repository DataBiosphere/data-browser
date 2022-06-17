// Core dependencies
import { Box, Collapse } from "@mui/material";
import { CollapseProps } from "@mui/material/Collapse/Collapse";
import React, { ReactNode, useEffect, useState } from "react";

// App dependencies
import { CollapseButton } from "./components/CollapseButton/collapseButton";
import { SectionTitle } from "./components/SectionTitle/sectionTitle";
import { useBreakpointHelper } from "../../hooks/useBreakpointHelper";

interface Props {
  children: ReactNode;
  collapsable?: boolean;
  title?: string;
}

export const Section = ({
  children,
  collapsable = false,
  title,
}: Props): JSX.Element => {
  const mobile = useBreakpointHelper("down", "lg");
  const [expanded, setExpanded] = useState<boolean>(false);
  const [transitionDuration, setTransitionDuration] =
    useState<CollapseProps["timeout"]>(0);

  const onToggleExpanded = () => {
    setExpanded((expanded) => !expanded);
  };

  // Toggles expanded state on change of media breakpoint.
  useEffect(() => {
    setExpanded(!mobile);
  }, [mobile]);

  // Sets collapseTimeout state on change of media breakpoint.
  // Delays setting transitionDuration state for mobile breakpoint to facilitate the immediate transition from
  //  desktop to mobile.
  useEffect(() => {
    if (mobile) {
      const duration = setTimeout(() => {
        setTransitionDuration("auto");
      }, 100);
      return () => {
        clearTimeout(duration);
      };
    } else {
      setTransitionDuration(0);
    }
  }, [mobile]);

  return (
    <Box display="flex" flexDirection="column" gap={2} padding={5}>
      <Box display="flex" justifyContent="space-between">
        <SectionTitle title={title} />
        {mobile && collapsable && (
          <CollapseButton
            expanded={expanded}
            onToggleExpanded={onToggleExpanded}
          />
        )}
      </Box>
      {collapsable ? (
        <Collapse in={expanded} timeout={transitionDuration}>
          {children}
        </Collapse>
      ) : (
        children
      )}
    </Box>
  );
};
