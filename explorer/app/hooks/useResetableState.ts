import { Dispatch, SetStateAction, useEffect, useState } from "react";

/**
 * useState hook wrapper that will keep the state updated if the defaultValue changes
 * @param defaultState - param that determine the default and current state
 * @returns current state the setter function
 */
export const useResetableState = <T>(
  defaultState: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(defaultState);

  useEffect(() => {
    setState(defaultState);
  }, [defaultState]);

  return [state, setState];
};
