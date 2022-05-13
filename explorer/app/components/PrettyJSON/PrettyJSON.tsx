/**
 * Component to print a JSON string in a readable way.
 */
import React from "react";

interface PrettyJSONProps {
  value: string;
}

export const PrettyJSON: React.FC<PrettyJSONProps> = ({
  value,
}: PrettyJSONProps) => {
  return (
    <div>
      <pre>{value}</pre>
    </div>
  );
};
