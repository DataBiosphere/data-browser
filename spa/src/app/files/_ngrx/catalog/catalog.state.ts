/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of app catalog state.
 */

// App dependencies
import { Atlas } from "../../atlas/atlas.model";
import { Catalog } from "../../catalog/catalog.model";
import { CatalogUpdate } from "../../catalog/catalog-update.model";
import { FetchCatalogsErrorAction } from "./fetch-catalogs-error.action";
import { FetchCatalogsSuccessAction } from "./fetch-catalogs-success.action";
import { InitCatalogUpdateAction } from "./init-catalog-update.action";

export class CatalogState {

    atlas: Atlas;
    catalog: Catalog; // Current selected catalog
    catalogUpdate: CatalogUpdate;
    init: boolean; // True if catalogs response has been received from Azul, either success or failure. Used to determine if ap init can complete.

    /**
     * @param {Atlas} atlas
     * @param {CatalogUpdate} catalogUpdate
     * @param {Catalog} catalog
     * @param {boolean} init
     */
    constructor(atlas: Atlas, catalog: Catalog, catalogUpdate: CatalogUpdate, init: boolean) {

        Object.assign(this, {atlas, catalog, catalogUpdate, init});
    }

    /**
     * Error occurred during request for catalogs. Update init flag to indicate catalogs request was attempted.
     *
     * @param {FetchCatalogsSuccessAction} action
     * @returns {CatalogState}
     */
    public fetchCatalogsError(action: FetchCatalogsErrorAction): CatalogState {

        return new CatalogState(this.atlas, this.catalog, this.catalogUpdate, true);
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
        return new CatalogState(Object.assign({}, atlas), atlas.defaultCatalog, this.catalogUpdate, true);
    }

    /**
     * Set the initial state of the catalog updates.
     * 
     * @param {InitCatalogUpdateAction} action
     * @returns {CatalogState}
     */
    public initCatalogUpdate(action: InitCatalogUpdateAction): CatalogState {

        const { catalogUpdate } = action;
        return new CatalogState(this.atlas, this.catalog, catalogUpdate, this.init);
    }

    /**
     * Set the catalog value.
     * 
     * @param {Catalog} catalog
     * @returns {CatalogState}
     */
    public setCatalog(catalog: Catalog): CatalogState {
        
        return new CatalogState(this.atlas, catalog, this.catalogUpdate, this.init);
    }

    /**
     * @returns {CatalogState}
     */
    public static getDefaultState(): CatalogState {

        return new CatalogState({
            catalogs: [],
            defaultCatalog: ""
        }, "", {
            catalog: "",
            runDate: null,
            new: [],
            updated: []
        },false);
    }
}
