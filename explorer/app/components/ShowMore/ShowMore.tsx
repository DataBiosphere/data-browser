import { Button } from "@mui/material";
import React, { useState } from "react";
import { Container, Wrapper } from "./ShowMore.styles";

interface ShowMoreProps {
  buttonLabelHide?: string;
  buttonLabelShow?: string;
  children: React.ReactNode | React.ReactNode[];
  lineHeight?: number;
  maxLines: number;
}

export const ShowMore = ({
  buttonLabelHide = "Hide",
  buttonLabelShow = "Read More",
  children,
  lineHeight = 23,
  maxLines,
}: ShowMoreProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <Wrapper lineHeight={lineHeight} maxLines={maxLines} open={open}>
        {children}
      </Wrapper>
      <Button onClick={(): void => setOpen((s) => !s)} variant="text">
        {open ? buttonLabelHide : buttonLabelShow}
      </Button>
    </Container>
  );
};
