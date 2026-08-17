/**
 * Shared Schema.org Dataset types used by per-consumer JSON-LD builders
 * (HCA DCP, AnVIL, LungMAP). Each consumer composes its own `SchemaDataset`
 * from its source entity and renders it via the shared `JsonLd` component.
 *
 * See https://developers.google.com/search/docs/appearance/structured-data/dataset
 * for Google's Dataset structured data guidelines.
 */

/**
 * Schema.org DataCatalog type.
 */
export interface SchemaDataCatalog {
  "@type": "DataCatalog";
  name: string;
  url: string;
}

/**
 * Schema.org DataDownload type.
 */
export interface SchemaDataDownload {
  "@type": "DataDownload";
  contentUrl: string;
  encodingFormat?: string;
}

/**
 * Schema.org Dataset JSON-LD structure.
 */
export interface SchemaDataset {
  "@context": "https://schema.org";
  "@type": "Dataset";
  citation?: SchemaScholarlyArticle[];
  creator?: (SchemaPerson | SchemaOrganization)[];
  description: string;
  distribution?: SchemaDataDownload[];
  identifier: string[];
  includedInDataCatalog: SchemaDataCatalog;
  isAccessibleForFree: boolean;
  keywords?: string[];
  measurementTechnique?: string[];
  name: string;
  sameAs?: string[];
  url: string;
}

/**
 * Schema.org Organization type.
 */
export interface SchemaOrganization {
  "@type": "Organization";
  name: string;
}

/**
 * Schema.org Person type.
 */
export interface SchemaPerson {
  "@type": "Person";
  affiliation?: SchemaOrganization;
  name: string;
}

/**
 * Schema.org ScholarlyArticle type.
 */
export interface SchemaScholarlyArticle {
  "@type": "ScholarlyArticle";
  author?: SchemaPerson[];
  headline: string;
  name: string;
  sameAs?: string;
}
