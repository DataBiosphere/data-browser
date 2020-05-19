/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of JSON response returned from entity-related end points (projects, samples, files).
 */

// App dependencies
import { ResponseFacet } from "./response-facet.model";
import { Dictionary } from "../../dictionary";
import { Pagination } from "../table/pagination/pagination.model";

export interface EntityAPIResponse {
    termFacets: Dictionary<ResponseFacet>;
    pagination: Pagination;
    hits: any[];
}
