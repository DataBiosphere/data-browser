import { useCallback, useMemo, useState } from "react";
import { ColumnConfig } from "app/config/model";

/**
 * Hook used to isolate the logic necessary for tables with the edit columns functionality.
 * Where is possible to dynamically determine which columns should be displayed.
 * @param columns - An array of columns config from the current entity.
 * @returns All necessary handlers and values for the edit columns functionality.
 */
export const useEditColumns = (columns: ColumnConfig[]): JSX.Element => {
  const defaultColumns = useMemo(
    () => columns.filter(({ hiddenColumn }) => !hiddenColumn),
    [columns]
  );
  const [visibleColumns, setVisibleColumns] = useState(defaultColumns);

  const readOnlyColumns = defaultColumns.map(({ header }) => header);
  const selectedColumns = visibleColumns.map(({ header }) => header);
  const columnsOptions = columns.map(({ header }) => ({
    id: header,
    label: header,
  }));

  const handleVisibleColumnsChanged = useCallback(
    (columnId: string) => {
      setVisibleColumns((state) => {
        const columnIndex = state.findIndex(
          ({ header }) => header === columnId
        );

        if (columnIndex !== -1) {
          const newState = [...state];
          newState.splice(columnIndex, 1);
          return newState;
        }

        const newColumn = columns.find(({ header }) => header === columnId);
        if (newColumn) {
          return [...state, newColumn];
        }
        return state;
      });
    },
    [columns]
  );

  const editColumns = useMemo(() => {
    if (defaultColumns.length !== columns.length) {
      return {
        onVisibleColumnsChange: handleVisibleColumnsChanged,
        options: columnsOptions,
        readOnlyColumns: readOnlyColumns,
        selectedColumns: selectedColumns,
      };
    }
    return undefined;
  }, [
    columns.length,
    columnsOptions,
    defaultColumns.length,
    handleVisibleColumnsChanged,
    readOnlyColumns,
    selectedColumns,
  ]);

  return {
    editColumns,
    visibleColumns,
  };
};
