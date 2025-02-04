export const CHIP_TEXT_ACCESS_GRANTED = "Granted";
export const CHIP_TEXT_ACCESS_REQUIRED = "Required";
export const BUTTON_TEXT_ANALYZE_IN_TERRA = "Analyze in Terra";
export const BUTTON_TEXT_EXPORT = "Export";
export const BUTTON_TEXT_REQUEST_ACCESS = "Request Access";
export const BUTTON_TEXT_REQUEST_FILE_MANIFEST = "Request File Manifest";

export type DatasetAccess =
  | typeof CHIP_TEXT_ACCESS_GRANTED
  | typeof CHIP_TEXT_ACCESS_REQUIRED;
