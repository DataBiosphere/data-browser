/**
 * Model of aggregated ("inner") activity value returned from API endpoints other than /index/activities (for example,
 * /index/libraries).
 */
export interface AggregatedActivity {
  activity_type: string[];
  data_modality: string[];
}

/**
 * Model of array of aggregated ("inner") activity value returned from API endpoints other than /index/activities
 * (for example, /index/libraries).
 */
export interface AggregatedActivityResponse {
  activities: AggregatedActivity[];
}

/**
 * Model of aggregated ("inner") biosample value returned from API endpoints other than /index/biosamples (for example,
 * /index/libraries).
 */
export interface AggregatedBioSample {
  anatomical_site: (string | null)[];
  biosample_type: (string | null)[];
}

/**
 * Model of array of aggregated ("inner") biosample value returned from API endpoints other than /index/biosamples
 * (for example, /index/libraries).
 */
export interface AggregatedBioSampleResponse {
  biosamples: AggregatedBioSample[];
}

/**
 * Model of aggregated ("inner") dataset value returned from API endpoints other than /index/datasets (for example,
 * /index/libraries).
 */
export interface AggregatedDataset {
  dataset_id: string[];
  title: string[];
}

/**
 * Model of array of aggregated ("inner") dataset returned from API endpoints other than /index/datasets
 * (for example, /index/libraries).
 */
export interface AggregatedDatasetResponse {
  datasets: AggregatedDataset[];
}

/**
 * Model of aggregated ("inner") donor value returned from API endpoints other than /index/donors (for example,
 * /index/libraries).
 */
export interface AggregatedDonor {
  organism_type: string[];
  phenotypic_sex: string[];
  reported_ethnicity: string[];
}

/**
 * Model of array of aggregated ("inner") donor returned from API endpoints other than /index/donors
 * (for example, /index/libraries).
 */
export interface AggregatedDonorResponse {
  donors: AggregatedDonor[];
}

/**
 * Model of aggregated ("inner") diagnosis value returned from API endpoints other than /index/diagnosis (for example,
 * /index/files).
 */
export interface AggregatedDiagnosis {
  phenotype: string[];
}

/**
 * Model of array of aggregated ("inner") diagnoses returned from API endpoints other than /index/diagnoses
 * (for example, /index/files).
 */
export interface AggregatedDiagnosisResponse {
  diagnoses: AggregatedDiagnosis[];
}

/**
 * Model of aggregated ("inner") file value returned from API endpoints other than /index/files (for example,
 * /index/libraries).
 */
export interface AggregatedFile {
  data_modality: string[];
  file_format: string;
  file_id: string;
  file_type: string;
}

/**
 * Model of array of aggregated ("inner") file returned from API endpoints other than /index/files
 * (for example, /index/libraries).
 */
export interface AggregatedFileResponse {
  files: AggregatedFile[];
}

/**
 * Model of aggregated ("inner") library value returned from API endpoints other than /index/libraries (for example,
 * /index/files).
 */
export interface AggregatedLibrary {
  prep_material_name: string[];
}

/**
 * Model of array of aggregated ("inner") library value returned from API endpoints other than /index/libraries
 * (for example, /index/files).
 */
export interface AggregatedLibraryResponse {
  libraries: AggregatedLibrary[];
}
