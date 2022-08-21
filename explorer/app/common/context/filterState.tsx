import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Filters } from "../../apis/azul/common/entities";
import { FilterState } from "../../hooks/useCategoryFilter";

/**
 * Model of filter state context.
 */
interface IFilterStateContext {
  filterState: FilterState;
  setFilterState: Dispatch<SetStateAction<Filters>>;
}

/**
 * Filter state context for storing and using filter-related state.
 */
export const FilterStateContext = createContext<IFilterStateContext>({
  filterState: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default state.
  setFilterState: () => {},
});

/**
 * Filter state provider for consuming components to subscribe to changes in filter-related state.
 * @param props - Component inputs.
 * @param props.children - Set of children components that can possibly consume the query provider.
 * @returns Provider element to be used by consumers to both update filter state and subscribe to changes in filter state.
 */
export function FilterStateProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}): JSX.Element {
  const [filterState, setFilterState] = useState<FilterState>([]);
  return (
    <FilterStateContext.Provider value={{ filterState, setFilterState }}>
      {children}
    </FilterStateContext.Provider>
  );
}
