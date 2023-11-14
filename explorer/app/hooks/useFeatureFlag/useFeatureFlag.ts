import { useEffect, useState } from "react";
import { FEATURES, FLAG } from "./common/entities";
import { getLocalStorage } from "./common/utils";

/**
 * Determine if feature is available to user.
 * @param featureFlag - Name of feature.
 * @returns True if feature is available to user.
 */
export function useFeatureFlag(featureFlag: FEATURES): boolean {
  /* Flag indicating if feature is available to user. */
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  /* Update state of enabled flag and redirect user if feature is not available to them. */
  useEffect(() => {
    const enabled = getLocalStorage(featureFlag) === FLAG.TRUE;
    setIsEnabled(enabled);
  }, [featureFlag]);

  return isEnabled;
}
