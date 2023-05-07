import { ConsentTooltip, NTagCell } from "app/components";

interface ConsentCodesCellProps {
  consentCode: string[];
  consentLongName: string[];
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
      consentLongName={consentLongName[0]}
    />
  ) : (
    <NTagCell label={label} values={consentCode} />
  );
};
