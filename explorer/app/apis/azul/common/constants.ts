/**
 * Set of valid request params accepted by Azul.
 */
export enum AZUL_PARAM {
  "CATALOG" = "catalog",
}

/**
 * Set of export to Terra formats, use when requesting export to Terra location from Azul.
 */
export enum EXPORT_TO_TERRA_FORMAT {
  "BDBAG" = "terra.bdbag",
  "PFB" = "terra.pfb",
}

/**
 * Set of valid request params accepted by Azul when requesting an export to Terra location.
 */
export enum EXPORT_TO_TERRA_PARAM {
  "FORMAT" = "format",
}

/**
 * "format" request parameter value to include when generating a link to Terra for PFB.
 */
export const EXPORT_TO_TERRA_URL_PFB_FORMAT = "PFB";
