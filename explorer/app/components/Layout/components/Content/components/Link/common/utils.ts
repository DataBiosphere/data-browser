import { Parameter } from "./entities";

/**
 * Replaces parameters in the given URL string e.g. {portalURL} with the corresponding value.
 * @param str - URL string, with parameters.
 * @param parameter - Parameter.
 * @returns string with parameters replaced.
 */
export function replaceParameters(str: string, parameter: Parameter): string {
  const decodedUrl = decodeURI(str);
  const result = Object.entries(parameter).reduce(
    (acc, [parameterKey, parameterValue]) => {
      const regex = new RegExp(`\\{${parameterKey}}`, "g");
      return acc.replace(regex, parameterValue);
    },
    decodedUrl
  );
  if (/{\w+}/.test(result)) {
    throw new Error(`URL still contains path parameters: ${result}`);
  }
  return result;
}
