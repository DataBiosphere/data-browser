import { isSSR } from "./ssr";
/**
 * Converts a object into a url param. This function can be executed both on client or server side
 * @param params
 * @returns url param as string
 */
export const convertUrlParams = (params: Record<string, string>) => {
  if (isSSR()) {
    //check if the operation is being executed on server side
    return new global.URLSearchParams(params).toString();
  }
  return new URLSearchParams(params).toString();
};
