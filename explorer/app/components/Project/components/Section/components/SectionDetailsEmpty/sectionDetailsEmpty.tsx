import React from "react";

interface Props {
  displayText?: string;
}

export const SectionDetailsEmpty = ({
  displayText = "None",
}: Props): JSX.Element => {
  return <span>{displayText}</span>;
};
