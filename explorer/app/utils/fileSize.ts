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
