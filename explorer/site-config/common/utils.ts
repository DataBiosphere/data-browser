export interface Parameter {
  [key: string]: string;
}

/**
 * Replaces path parameters in the given URL string e.g. "/{portalURL}/overview" with the corresponding value.
 * TODO(cc) Import this function from findable-ui.
 * @param str - URL string, with parameters.
 * @param parameter - Parameter.
 * @returns string with parameters replaced.
 */
export function replaceParameters(str: string, parameter: Parameter): string {
  const result = Object.entries(parameter).reduce(
    (acc, [parameterKey, parameterValue]) => {
      const regex = new RegExp(`\\{${parameterKey}}`, "g");
      return acc.replace(regex, parameterValue);
    },
    str
  );
  if (/\{\w+}/.test(result)) {
    throw new Error(`URL still contains path parameters: ${result}`);
  }
  return result;
}
