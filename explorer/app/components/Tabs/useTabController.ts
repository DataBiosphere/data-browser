import { useContext } from "react";
import { TabContextValue, TabControllerContext } from "./context";

/**
 * Helper hook to access tab controller context
 * @returns tab controller context
 */
export const useTabController = (): TabContextValue | null => {
  return useContext(TabControllerContext);
};
