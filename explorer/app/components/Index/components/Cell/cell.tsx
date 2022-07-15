// Core dependencies
import React from "react";

interface Props {
  value?: string | string[];
}

export const Cell = ({ value = "Unspecified" }: Props): JSX.Element => {
  if (typeof value === "string") {
    return <div>{value}</div>;
  }
  return (
    <>
      {value.map((v: string) => (
        <div key={v}>{v}</div>
      ))}
    </>
  );
};
