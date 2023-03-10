/**
 * Model of accession, including URL, associated with a project.
 */
export interface Accession {
  id: string; // Accession value
  label: string; // Accession namespace
  url: string;
}

/**
 * Model of accession configuration, used when mapping accession values returned from /projects and /projects/uuid
 * endpoints into FE-specific model.
 */
export interface AccessionConfig {
  identifierOrgPrefix: string;
  label: string;
  responseKey: string;
}

/**
 * Keys of accession config object - used when grouping accession configs by different values
 */
export type AccessionConfigKeys = keyof AccessionConfig;

/**
 * Accessions keyed by accession namespace.
 */
export type AccessionsByLabel = Map<string, Accession[]>;
