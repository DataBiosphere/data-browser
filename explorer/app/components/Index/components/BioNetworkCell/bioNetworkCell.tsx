import { LABEL } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { TypographyProps } from "@databiosphere/findable-ui/lib/components/common/Typography/common/entities";
import { NTagCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/NTagCell/nTagCell";
import { NetworkIcon } from "../../../common/NetworkIcon/networkIcon";
import { NetworkKey } from "../../common/entities";
import { Cell, Network } from "./bioNetworkCell.styles";

const MAX_DISPLAYABLE_VALUES = 1;

export interface BioNetworkCellProps {
  label: string;
  networkKeys: NetworkKey[];
  TypographyProps?: TypographyProps;
}

export const BioNetworkCell = ({
  label,
  networkKeys,
  TypographyProps,
}: BioNetworkCellProps): JSX.Element => {
  if (networkKeys.length === 0) return <span>{LABEL.UNSPECIFIED}</span>;
  const showNTag = networkKeys.length > MAX_DISPLAYABLE_VALUES;
  return (
    <>
      {showNTag ? (
        <NTagCell
          label={label}
          TypographyProps={TypographyProps}
          values={networkKeys}
        />
      ) : (
        <Cell>
          {networkKeys.map((networkKey) => (
            <Network component="div" key={networkKey} {...TypographyProps}>
              <NetworkIcon networkKey={networkKey} />
              <div>{networkKey}</div>
            </Network>
          ))}
        </Cell>
      )}
    </>
  );
};
