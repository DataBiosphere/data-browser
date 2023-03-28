/**
 * Model of cell suspension value in the response from index/{entity_type} API endpoint.
 */
export interface AggregatedCellSuspensionResponse {
  selectedCellType: (string | null)[];
  totalCells: number | null;
}

/**
 * Model of cell suspensions in the response from index/{entity_type} API endpoint.
 */
export interface AggregatedCellSuspensionsResponse {
  cellSuspensions: AggregatedCellSuspensionResponse[];
}

/**
 * Model of donor organism value in the response from index/{entity_type} API endpoint.
 */
export interface AggregatedDonorOrganismResponse {
  biologicalSex: string[];
  developmentStage: string[];
  disease: (string | null)[];
  donorCount: number;
  genusSpecies: string[];
}

/**
 * Model of donor organisms in the response from index/{entity_type} API endpoint.
 */
export interface AggregatedDonorOrganismsResponse {
  donorOrganisms: AggregatedDonorOrganismResponse[];
}

/**
 * Model of aggregated ("inner") file type summary value returned from API endpoints other than /index/files.
 * (for example, /index/samples).
 */
export interface AggregatedFileTypeSummaryResponse {
  contentDescription: (string | null)[];
  count: number;
  fileSource: (string | null)[];
  format: string;
  isIntermediate: boolean | null;
  matrixCellCount: number | null;
  totalSize: number;
}

/**
 * Model of aggregated ("inner") file type summaries returned from API endpoints other than /index/files.
 * (for example, /index/samples).
 */
export interface AggregatedFileTypeSummariesResponse {
  fileTypeSummaries: AggregatedFileTypeSummaryResponse[];
}

/**
 * Model of aggregated ("inner") project value returned from API endpoints other than /index/projects.
 * (for example, /index/samples).
 */
export interface AggregatedProjectResponse {
  estimatedCellCount: number | null;
  laboratory: (string | null)[];
  projectId: string[];
  projectShortname: string[];
  projectTitle: string[];
}

/**
 * Model of aggregated ("inner") projects returned from API endpoints other than /index/projects.
 * (for example, /index/samples).
 */
export interface AggregatedProjectsResponse {
  projects: AggregatedProjectResponse[];
}

/**
 * Model of protocol value in the response from index/{entity_type} API endpoint.
 */
export interface AggregatedProtocolResponse {
  instrumentManufacturerModel?: string[];
  libraryConstructionApproach?: string[];
  nucleicAcidSource?: string[];
  pairedEnd?: boolean[];
  workflow?: string[];
}

/**
 * Model of protocols in the response from index/{entity_type} API endpoint.
 */
export interface AggregatedProtocolsResponse {
  protocols: AggregatedProtocolResponse[];
}

/**
 * Model of aggregated ("inner") sample value returned from API endpoints other than /index/samples.
 * (for example, /index/projects).
 */
export interface AggregatedSampleResponse {
  cellLineType?: string[];
  disease?: (string | null)[];
  effectiveOrgan?: (string | null)[];
  id: string[];
  modelOrgan?: (string | null)[];
  modelOrganPart?: (string | null)[];
  organ?: string[];
  organPart?: (string | null)[];
  preservationMethod?: (string | null)[];
  sampleEntityType: string[];
  source?: string[];
}

/**
 * Model of aggregated ("inner") samples returned from API endpoints other than /index/samples.
 * (for example, /index/projects).
 */
export interface AggregatedSamplesResponse {
  samples: AggregatedSampleResponse[];
}

/**
 * Model of aggregated ("inner") specimen value returned from API endpoints other than /index/samples.
 * (for example, /index/projects).
 */
export interface AggregatedSpecimenResponse {
  disease: (string | null)[];
  id: string[];
  organ: string[];
  organPart: (string | null)[];
  preservationMethod: (string | null)[];
  source: string[];
}

/**
 * Model of aggregated ("inner") specimens returned from API endpoints other than /index/samples.
 * (for example, /index/projects).
 */
export interface AggregatedSpecimensResponse {
  specimens: AggregatedSpecimenResponse[];
}
