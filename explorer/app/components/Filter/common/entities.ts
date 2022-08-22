import { Dispatch, SetStateAction } from "react";

/**
 * Function invoked to update state for the search term.
 */
export type SetSearchTermFn = Dispatch<SetStateAction<string>>;
