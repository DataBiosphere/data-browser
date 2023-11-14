import { FEATURES } from "./entities";

/**
 * Set feature flags from URL.
 */
export function setFeatureFlags(): void {
  if (typeof window === "undefined") return;
  // Grab the search params from the URL.
  const params = new URLSearchParams(window.location.search);
  const features = Object.values(FEATURES) as string[];
  for (const [key, value] of params) {
    if (features.includes(key)) {
      setLocalStorage(key, value);
    }
  }
}

/**
 * Clear all values from the storage.
 */
export function clearLocalStorage(): void {
  window?.localStorage?.clear();
}

/**
 * Return the value for the specified key.
 * @param key - Key.
 * @returns value.
 */
export function getLocalStorage(key: string): string | null {
  return window?.localStorage?.getItem(key);
}

/**
 * Set the value for the specified key.
 * @param key - Key.
 * @param value - Value.
 */
export function setLocalStorage(key: string, value: string): void {
  window?.localStorage?.setItem(key, value);
}
