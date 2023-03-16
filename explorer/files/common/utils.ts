import fs from "fs";

export const writeAsJSON = async function writeFile(
  fileName: string,
  obj: unknown
): Promise<void> {
  console.log(fileName);
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- why is this necessary? //TODO
  fs.writeFile(fileName, JSON.stringify(obj, null, 2), () => {});
};

/**
 * Timeout to delay fetch.
 *
 * @param timer - ms to delay.
 * @returns {Promise<unknown>} the promise that resoves when the timeout is over.
 */
export async function delayFetch(timer: number): Promise<unknown> {
  return new Promise((r) => setTimeout(r, timer));
}
