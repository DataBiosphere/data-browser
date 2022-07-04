/**
 * Set of possible metadata keys.
 * TODO refine with https://github.com/clevercanary/data-browser/issues/128
 */
export const enum METADATA_KEY {
  SPECIES = "SPECIES",
}

/**
 * Model of metadata value to be used as props for the NTagCell and NTag component.
 * TODO refine type with https://github.com/clevercanary/data-browser/issues/128
 */
export type MetadataValue = string;
