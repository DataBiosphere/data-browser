import { Button } from "@mui/material";
import React, { useState } from "react";
import { Container, Wrapper } from "./ShowMore.styles";

interface ShowMoreProps {
  lineHeight?: number;
  maxLines: number;
  buttonLabelShow?: string;
  buttonLabelHide?: string;
  children: React.ReactNode | React.ReactNode[];
}

export const ShowMore = ({
  children,
  maxLines,
  lineHeight = 23,
  buttonLabelShow = "Read More",
  buttonLabelHide = "Hide",
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
