/**
 * Model of core activity value returned from the /index/activities API endpoint.
 */
export interface ActivityEntity {
  activity_id?: string;
  activity_type: string;
  data_modality: string[];
  document_id: string;
}

/**
 * Model of singleton array containing core activity value returned from the /index/activities API endpoint.
 */
export interface ActivityEntityResponse {
  activities: ActivityEntity[];
}

/**
 * Model of core biosample value returned from the /index/biosamples API endpoint.
 */
export interface BioSampleEntity {
  anatomical_site: string | null;
  biosample_id: string;
  biosample_type: string | null;
}

/**
 * Model of singleton array containing core biosample value returned from the /index/biosamples API endpoint.
 */
export interface BioSampleEntityResponse {
  biosamples: BioSampleEntity[];
}

/**
 * Model of core dataset value returned from the /index/datasets API endpoint.
 */
export interface DatasetEntity {
  consent_group: string;
  dataset_id: string;
  entity_description: string;
  registered_identifier: string;
  title: string;
}

/**
 * Model of singleton array containing core dataset value returned from the /index/datasets API endpoint.
 */
export interface DatasetEntityResponse {
  datasets: DatasetEntity[];
}

/**
 * Model of core donor value returned from the /index/donors API endpoint.
 */
export interface DonorEntity {
  donor_id: string;
  organism_type: string;
  phenotypic_sex: string;
  reported_ethnicity: string[];
}

/**
 * Model of singleton array containing core donor value returned from the /index/donors API endpoint.
 */
export interface DonorEntityResponse {
  donors: DonorEntity[];
}

/**
 * Model of core file value returned from the /index/files API endpoint.
 */
export interface FileEntity {
  accessible: boolean;
  data_modality: string[];
  date_created: string;
  document_id: string;
  file_format: string;
  file_id: string;
  file_type: string;
  name: string;
  size: number;
  url: string;
}

/**
 * Model of singleton array containing core file value returned from the /index/files API endpoint.
 */
export interface FileEntityResponse {
  files: FileEntity[];
}

/**
 * Model of core library value returned from the /index/libraries API endpoint.
 */
export interface LibraryEntity {
  library_id: string;
  prep_material_name: string;
}

/**
 * Model of singleton array containing core library value returned from the /index/libraries API endpoint.
 */
export interface LibraryEntityResponse {
  libraries: LibraryEntity[];
}
