import { useContext } from "react";
import { TabControllerContext } from "./context";

/**
 * Helper hook to access tab controller context
 * @returns tab controller context
 */
export const useTabController = () => {
  return useContext(TabControllerContext);
};
