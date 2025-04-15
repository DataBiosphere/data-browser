import {
  Attribute,
  AttributeValue,
  DataDictionaryColumnDef,
  SelectCategoryValue,
} from "@databiosphere/findable-ui/lib/common/entities";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { BasicCell } from "@databiosphere/findable-ui/lib/components/DataDictionary/components/Table/components/BasicCell/basicCell";

/**
 * Returns select category value with formatted label.
 * @param formatLabel - Function to format label.
 * @returns select category value with formatted label.
 */
export function mapSelectCategoryValue(
  formatLabel: (label: string) => string
): (select: SelectCategoryValue) => SelectCategoryValue {
  return (selectCategoryValue: SelectCategoryValue) => {
    return {
      ...selectCategoryValue,
      label: formatLabel(selectCategoryValue.label),
    };
  };
}

/**
 * Returns an array of column defs, built from column def configurations, to
 * use when displaying the data dictionary.
 * @param columnDefConfigs - Array of column def configurations.
 * @returns Array of column defs.
 */
export function buildColumnDefs(
  columnDefConfigs: DataDictionaryColumnDef[]
): ColumnDef<Attribute, AttributeValue>[] {
  return columnDefConfigs.map((columnDefConfig) => {
    const {
      attributeDisplayName: header,
      attributeSlotName: key,
      width: { max, min },
    } = columnDefConfig;
    return {
      accessorFn: (row) => row[key as keyof Attribute],
      cell: (props: CellContext<Attribute, AttributeValue>) =>
        BasicCell({ ...props }),
      header: `${header}`,
      id: key,
      meta: { width: { max, min } },
    };
  });
}
