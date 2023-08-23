import { RESPONSE_SOURCE } from "@clevercanary/data-explorer-ui/lib/apis/azul/common/entities";
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
 * Response source.
 */
export interface ResponseSource {
  responseSource?: RESPONSE_SOURCE;
}
