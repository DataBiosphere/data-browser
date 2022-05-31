/**
 * Component to print a JSON string in a readable way.
 */
import React from "react";

interface PrettyJSONProps {
  value: string;
}

export const PrettyJSON = ({ value }: PrettyJSONProps): JSX.Element => {
  return (
    <div>
      <pre>{value}</pre>
    </div>
  );
};
