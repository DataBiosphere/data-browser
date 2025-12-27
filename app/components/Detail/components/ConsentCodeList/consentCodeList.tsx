import { ConsentTooltip } from "../ConsentTooltip/consentTooltip";
import { JSX } from "react";

interface ConsentCodeListProps {
  consentCode: string[];
  consentLongName: Record<string, string>;
  separator?: string;
}

export const ConsentCodeList = ({
  consentCode,
  consentLongName,
  separator = ", ",
}: ConsentCodeListProps): JSX.Element => {
  return (
    <>
      {consentCode.map((code, i) => [
        i ? separator : "",
        <ConsentTooltip
          consentCode={code}
          consentLongName={consentLongName[code]}
          key={code}
        />,
      ])}
    </>
  );
};
