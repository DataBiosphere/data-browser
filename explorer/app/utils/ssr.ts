/**
 * Check if the current rendering context is server-side.
 * @returns True if is server side rendering.
 */
export const isSSR = (): boolean => typeof window === "undefined";
