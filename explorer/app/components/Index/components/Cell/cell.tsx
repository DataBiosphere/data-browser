// Core dependencies
import React from "react";

interface Props {
  value?: number | string | string[];
}

export const Cell = ({ value = "Unspecified" }: Props): JSX.Element => {
  if (typeof value === "string" || typeof value === "number") {
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
