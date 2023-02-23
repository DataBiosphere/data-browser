import { FileEntityResponse } from "../anvil/common/entities";
import {
  ActivitiesResponse,
  BioSamplesResponse,
  DatasetsResponse,
  DonorsResponse,
  LibrariesResponse,
} from "../anvil/common/responses";

/**
 * Base model of an entry in the "hits" value returned from an Azul entities response.
 */
export interface AzulHit {
  entryId: string;
}

/**
 * Set of all entities responses returned from Azul.
 */
export type AzulEntitiesResponses =
  | ActivitiesResponse
  | BioSamplesResponse
  | DatasetsResponse
  | DonorsResponse
  | FileEntityResponse
  | LibrariesResponse;

/**
 * Model of file "leaf" values in matrix tree response from Azul.
 */
export interface ProjectMatrixFileResponse {
  contentDescription: string[];
  matrixCellCount?: number;
  name: string;
  size: number;
  url: string;
  uuid: string;
  version: string;
}
