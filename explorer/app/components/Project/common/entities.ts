/**
 * Model of project collaborating organization to be used as props for the CollaboratingOrganizations component.
 */
export interface CollaboratingOrganization {
  citation: number;
  name: string;
}

/**
 * Model of project contact to be used as props for the Contacts component.
 */
export interface Contact {
  email?: string;
  institution?: string;
  name: string;
}

/**
 * Model of project contributor to be used as props for the Contributors component.
 */
export interface Contributor {
  citation?: number;
  name: string;
  role?: string;
}

/**
 * Model of project data curator to be used as props for the DataCurators component.
 */
export type DataCurator = string;

/**
 * Model of project description to be used as props for the Description component.
 */
export type Description = string;

/**
 * Model of project path to be used as props for the Citation component.
 */
export type ProjectPath = string;

/**
 * Model of project publication to be used as props for the Publication component.
 */
export interface Publication {
  doi?: string;
  officialHcaPublication?: boolean;
  publicationTitle: string;
  publicationUrl: string;
}

/**
 * Model of project supplementary link to be used as props for the SupplementaryLinks component.
 */
export type SupplementaryLink = string;
