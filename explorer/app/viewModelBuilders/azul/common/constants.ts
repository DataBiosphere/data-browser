/**
 * Set of possible genus species.
 */
export enum GenusSpecies {
  "DANIO_RERIO" = "Danio rerio",
  "homo_sapiens" = "homo sapiens", // Lower case to handle bad data.
  "HOMO_SAPIENS" = "Homo sapiens",
  "MUS_MUSCULUS" = "Mus musculus",
  "UNSPECIFIED" = "Unspecified",
}

/**
 * Set of supported project-level analysis portals.
 */
export enum ProjectAnalysisPortalName {
  "CELL_BROWSER" = "UCSC Cell Browser",
  "CELLXGENE" = "cellxgene",
  "GENOME_BROWSER" = "UCSC Genome Browser",
  "LUNGMAP_APPS" = "LungMAP Apps",
  "STEM_CELL_HUB" = "The Stem Cell Hub",
}
