/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Tests covering catalog reducer functionality.
 */

// App dependencies
import * as catalogReducer from "./catalog.reducer";
import { CatalogState } from "./catalog.state";
import { FetchCatalogsSuccessAction } from "./fetch-catalogs-success.action";
import { SelectCatalogAction } from "./select-catalog.action";

describe("CatalogReducer", () => {
    const ATLAS = {
        defaultCatalog: "dcp2",
        catalogs: ["dc1", "dc2"],
    };

    describe("FetchCatalogsSuccessAction", () => {
        /**
         * Returns default state on action that is not handled by reducer.
         */
        it("returns default state", () => {
            const initialState = CatalogState.getDefaultState();
            const dummyAction = {
                type: "DUMMY",
            };
            const state = catalogReducer.reducer(initialState, dummyAction);
            expect(state).toBe(initialState); // toBe as state should remain untouched by unknown action
        });

        /**
         * Sets atlas in store on fetch of catalogs.
         */
        it("sets atlas in store", () => {
            const initialState = CatalogState.getDefaultState();
            const successAction = new FetchCatalogsSuccessAction(ATLAS);
            const state = catalogReducer.reducer(initialState, successAction);
            expect(state.atlas).toEqual(ATLAS);
            expect(state.atlas).not.toBe(ATLAS); // immutability - new atlas object should have been created
        });

        /**
         * Sets selected catalog to be default catalog on fetch of catalogs.
         */
        it("sets selected catalog to default catalog in store", () => {
            const initialState = CatalogState.getDefaultState();
            const successAction = new FetchCatalogsSuccessAction(ATLAS);
            const state = catalogReducer.reducer(initialState, successAction);
            expect(state.catalog).toEqual(ATLAS.defaultCatalog);
        });
    });

    xdescribe("SelectCatalogAction", () => {});
    xdescribe("SetViewStateAction", () => {});
});
