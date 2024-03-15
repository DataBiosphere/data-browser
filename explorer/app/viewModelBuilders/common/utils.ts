import { DATE_TIME_LOCALES } from "./contants";

/**
 * Format date string as string.
 * @param dateString - Date string to format.
 * @param options - Options to use for formatting.
 * @returns formatted date string.
 */
export function formatDate(
  dateString: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObject = new Date(dateString);
  return dateObject.toLocaleDateString(
    DATE_TIME_LOCALES,
    options ? options : {}
  );
}
