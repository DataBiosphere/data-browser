/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Param model for manifest-related requests.
 */

// App dependencies
import { Catalog } from "../catalog/catalog.model";

export class ICGCQuery {
    
    public readonly catalog: Catalog;
    public readonly filters: string;
    public readonly format?: string;

    constructor(catalog: Catalog, filters: string, format?: string) {

        if ( catalog ) {
            this.catalog = catalog;
        }
        this.filters = filters;
        if ( format ) {
            this.format = format;
        }
    }
}
