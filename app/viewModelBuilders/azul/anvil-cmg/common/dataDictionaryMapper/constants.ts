import { ChipCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/ChipCell/chipCell";
import { CellContext, AccessorFn } from "@tanstack/react-table";
import { requiredAccessorFn } from "./dataDictionaryMapper";
import {
  Attribute,
  AttributeValueTypes,
} from "@databiosphere/findable-ui/lib/common/entities";

export const ACCESSOR_FNS: Record<
  string,
  AccessorFn<Attribute, AttributeValueTypes>
> = {
  requiredAccessorFn: requiredAccessorFn,
};

export const CELLS: Record<
  string,
  (props: CellContext<Attribute, AttributeValueTypes>) => JSX.Element | null
> = {
  chipCell: ChipCell,
};
