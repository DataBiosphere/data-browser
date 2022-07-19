/**
 * Model of aggregated ("inner") biosample value returned from API endpoints other than /index/biosamples (for example,
 * /index/libraries).
 */
export interface BioSampleAggregatedResponse {
  anatomical_site: (string | null)[];
  biosample_type: (string | null)[];
}

/**
 * Model of aggregated ("inner") dataset value returned from API endpoints other than /index/datasets (for example,
 * /index/libraries).
 */
export interface DatasetAggregatedResponse {
  dataset_id: string[];
  title: string[];
}

/**
 * Model of core library value returned from the /index/datasets API endpoint.
 */
export interface DatasetEntityResponse {
  dataset_id: string;
  description: string;
  title: string;
}

/**
 * Model of response returned from the /index/datasets API endpoint.
 */
export interface DatasetsResponse {
  datasets: DatasetEntityResponse[];
  entryId: string;
}

/**
 * Model of core donor value returned from the /index/donors API endpoint.
 */
export interface DonorEntityResponse {
  donor_id: string;
  organism_type: string;
  phenotypic_sex: string;
  reported_ethnicity: string[];
}

/**
 * Model of response returned from the /index/donors API endpoint.
 */
export interface DonorsResponse {
  datasets: DatasetAggregatedResponse[];
  donors: DonorEntityResponse[]; // Singleton array
  entryId: string;
}

/**
 * Model of response returned from the /index/libraries API endpoint.
 */
export interface LibrariesResponse {
  biosamples: BioSampleAggregatedResponse[];
  datasets: DatasetAggregatedResponse[];
  entryId: string;
  libraries: LibraryEntityResponse[]; // Singleton array
}

/**
 * Model of aggregated ("inner") library value returned from API endpoints other than /index/libraries (for example,
 * /index/files).
 */
export interface LibraryAggregatedResponse {
  prep_material_name: string[];
}

/**
 * Model of core library value returned from the /index/libraries API endpoint.
 */
export interface LibraryEntityResponse {
  library_id: string;
  prep_material_name: string;
}
