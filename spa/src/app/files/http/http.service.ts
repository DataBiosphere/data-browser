/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service responsible for handling index-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";

// App dependencies
import { Catalog } from "../catalog/catalog.model";

@Injectable()
export class HttpService {
    /**
     * Modify the set of request params by adding a catalog param, if specified.
     */
    public createIndexParams(catalog: Catalog, params: any): any {
        if (catalog) {
            return {
                ...params,
                catalog,
            };
        }

        return params;
    }
}
