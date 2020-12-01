/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of app catalog state.
 */

// App dependencies
import { Catalog } from "../../catalog/catalog.model";

export class CatalogState {

    catalog: Catalog;

    /**
     * @param {Catalog} catalog
     */
    constructor(catalog = Catalog.NONE) {

        Object.assign(this, {catalog});
    }

    /**
     * Set the catalog value.
     * 
     * @param {Catalog} catalog
     * @returns {CatalogState}
     */
    public setCatalog(catalog: Catalog): CatalogState {
        
        return new CatalogState(catalog);
    }

    /**
     * @returns {CatalogState}
     */
    public static getDefaultState(): CatalogState {

        return new CatalogState();
    }
}
