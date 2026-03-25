import { NETWORK_KEYS } from "./constants";
import { NetworkKey } from "./entities";

/**
 * Type guard for NetworkKey.
 * @param value - Value.
 * @returns true if value is a NetworkKey.
 */
export function isNetworkKey(value: unknown): value is NetworkKey {
  if (typeof value !== "string") return false;
  return (NETWORK_KEYS as readonly string[]).includes(value);
}
