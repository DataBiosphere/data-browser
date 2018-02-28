/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of JSON response returned from files API.
 */

// App dependencies
import { FacetTermsResponse } from "./facet-terms-response.model";
import { Dictionary } from "../../shared/dictionary";
import { PaginationModel } from "../table/pagination.model";

export interface FilesAPIResponse {
    termFacets: Dictionary<FacetTermsResponse>;
    pagination: PaginationModel;
    hits: any[];
}
