import { isSSR } from "./ssr";

/**
 * Convert a record into a query string. This function can be executed both on client or server side.
 * @param params - Key value pairs representing query string parameters to include.
 * @returns URL params as string.
 */
export const convertUrlParams = (params: Record<string, string>): string => {
  const validParams = { ...params };
  // Delete any key which value is undefined. So the result string will not transform { key: undefined } into
  // 'key=undefined'
  Object.keys(params).forEach(
    (key) => validParams[key] === undefined && delete validParams[key]
  );
  if (isSSR()) {
    // check if the operation is being executed on server side
    return new global.URLSearchParams(validParams).toString();
  }
  return new URLSearchParams(validParams).toString();
};
