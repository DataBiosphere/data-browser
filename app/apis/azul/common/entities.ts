/**
 * Base model of an entry in the "hits" value returned from an Azul entities response.
 */
export interface AzulHit {
  entryId: string;
}

/**
 * Response status.
 */
export interface ResponseStatus {
  isLoading?: boolean;
}
