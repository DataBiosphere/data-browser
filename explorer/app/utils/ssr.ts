/**
 * Checks if the current rendering context is happening on the server side
 * @returns true if is server side rendering
 */
export const isSSR = () => typeof window === "undefined";
