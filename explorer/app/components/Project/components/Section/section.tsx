// Core dependencies
import { Collapse } from "@mui/material";
import { CollapseProps } from "@mui/material/Collapse/Collapse";
import React, { ReactNode, useEffect, useState } from "react";

// App dependencies
import { CollapseButton } from "./components/CollapseButton/collapseButton";
import { SectionTitle } from "./components/SectionTitle/sectionTitle";
import { useBreakpointHelper } from "../../../../hooks/useBreakpointHelper";

// Styles
import { Section as SectionContainer, SectionSummary } from "./section.styles";

interface Props {
  children: ReactNode;
  collapsable?: boolean;
  title: string;
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
    <SectionContainer>
      <SectionSummary>
        <SectionTitle title={title} />
        {mobile && collapsable && (
          <CollapseButton
            expanded={expanded}
            onToggleExpanded={onToggleExpanded}
          />
        )}
      </SectionSummary>
      {collapsable ? (
        <Collapse in={expanded} timeout={transitionDuration}>
          {children}
        </Collapse>
      ) : (
        children
      )}
    </SectionContainer>
  );
};
