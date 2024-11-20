/**
 * Format file size (in bytes) to TB, formatted to two decimal places.
 * @param size - The file size to format.
 * @returns Formatted file size in TB.
 */
export function formatSizeToTB(size: number): string {
  /* See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString. */
  return (size / 1e12).toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}

/**
 * Format bytes as human-readable text.
 * @param size - The file size to format.
 * @returns Human-readable size.
 */
export const humanFileSize = (size: number): string => {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    Number((size / Math.pow(1024, i)).toFixed(2)) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
};
