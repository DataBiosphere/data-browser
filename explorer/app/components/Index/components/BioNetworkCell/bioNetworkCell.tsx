import { TypographyProps } from "@databiosphere/findable-ui/lib/components/common/Typography/common/entities";
import { processNullElements } from "app/apis/azul/common/utils";
import * as C from "../../../../components";
import {
  getBioNetworkByKey,
  getBioNetworkName,
} from "../../../../viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import { NetworkIcon } from "../../../common/NetworkIcon/networkIcon";
import { NetworkKey } from "../../common/entities";
import { Cell } from "./bioNetworkCell.styles";

const MAX_DISPLAYABLE_VALUES = 1;

export interface BioNetworkCellProps {
  label: string;
  networkKeys: (NetworkKey | null)[];
  TypographyProps?: TypographyProps;
}

export const BioNetworkCell = ({
  label,
  networkKeys,
  TypographyProps,
}: BioNetworkCellProps): JSX.Element => {
  const showNTag = networkKeys?.length > MAX_DISPLAYABLE_VALUES;
  const names = processNullElements(
    networkKeys.map((networkKey) =>
      networkKey === null ? null : getBioNetworkByKey(networkKey)?.key ?? null
    )
  );
  return (
    <>
      {showNTag ? (
        <C.NTagCell
          label={label}
          TypographyProps={TypographyProps}
          values={names}
        />
      ) : (
        <Cell component="div" {...TypographyProps}>
          {networkKeys[0] === null ? (
            <C.BasicCell TypographyProps={TypographyProps} />
          ) : (
            <>
              <NetworkIcon networkKey={networkKeys[0]} />
              <div>{getBioNetworkName(networkKeys[0])}</div>
            </>
          )}
        </Cell>
      )}
    </>
  );
};
