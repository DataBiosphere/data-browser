/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of app catalog state.
 */

// App dependencies
import { Atlas } from "../../atlas/atlas.model";
import { Catalog } from "../../catalog/catalog.model";
import { FetchCatalogsErrorAction } from "./fetch-catalogs-error.action";
import { FetchCatalogsSuccessAction } from "./fetch-catalogs-success.action";

export class CatalogState {

    atlas: Atlas;
    catalog: Catalog; // Current selected catalog
    init: boolean; // True if catalogs response has been received from Azul, either success or failure. Used to determine if ap init can complete.

    /**
     * @param {Atlas} atlas
     * @param {Catalog} catalog
     * @param {boolean} init
     */
    constructor(atlas: Atlas, catalog: Catalog, init: boolean) {

        Object.assign(this, {atlas, catalog, init});
    }

    /**
     * Error occurred during request for catalogs. Update init flag to indicate catalogs request was attempted.
     *
     * @param {FetchCatalogsSuccessAction} action
     * @returns {CatalogState}
     */
    public fetchCatalogsError(action: FetchCatalogsErrorAction): CatalogState {

        return new CatalogState(this.atlas, this.catalog, true);
    }

    /**
     * Set catalogs and default catalog for the current environment.
     * 
     * @param {FetchCatalogsSuccessAction} action
     * @returns {CatalogState}
     */
    public fetchCatalogsSuccess(action: FetchCatalogsSuccessAction): CatalogState {

        // Set default catalog as the selected catalog.
        const { atlas } = action;
        return new CatalogState(Object.assign({}, atlas), atlas.defaultCatalog, true);
    }

    /**
     * Set the catalog value.
     * 
     * @param {Catalog} catalog
     * @returns {CatalogState}
     */
    public setCatalog(catalog: Catalog): CatalogState {
        
        return new CatalogState(this.atlas, catalog, this.init);
    }

    /**
     * @returns {CatalogState}
     */
    public static getDefaultState(): CatalogState {

        return new CatalogState({
            catalogs: [],
            defaultCatalog: ""
        }, "", false);
    }
}
