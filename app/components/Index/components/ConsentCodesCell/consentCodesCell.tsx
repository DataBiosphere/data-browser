import { ConsentTooltip, NTagCell } from "app/components";
import { JSX } from "react";

interface ConsentCodesCellProps {
  consentCode: string[];
  consentLongName: Record<string, string>;
  label: string;
}

export const ConsentCodesCell = ({
  consentCode,
  consentLongName,
  label,
}: ConsentCodesCellProps): JSX.Element => {
  return consentCode.length === 1 ? (
    <ConsentTooltip
      consentCode={consentCode[0]}
      consentLongName={consentLongName[consentCode[0]]}
    />
  ) : (
    <NTagCell label={label} values={consentCode} />
  );
};
