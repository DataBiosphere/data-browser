/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite of file effects.
 */

// Core dependencies
import { TestBed } from "@angular/core/testing";
import { cold, hot } from "jasmine-marbles";
import { provideMockActions } from "@ngrx/effects/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Observable } from "rxjs";

// App dependencies
import { FileEffects } from "./file.effects";
import { FileState } from "./file.state";
import {
    DEFAULT_FILES_STATE,
    DEFAULT_PROJECTS_STATE,
    DEFAULT_SAMPLES_STATE, FILES_STATE_WITH_SEARCH_TERM,
    PROJECTS_STATE_WITH_PROJECT_SEARCH_TERM, SAMPLES_STATE_WITH_SEARCH_TERM
} from "./file.state.mock";
import { FetchFileFacetsRequestAction, FetchFileFacetsSuccessAction } from "./file-facet-list/file-facet-list.actions";
import { SearchTermsUpdatedAction } from "./search/search-terms-updated-action.action";
import { FilesService } from "../shared/files.service";
import { FilesMockService } from "../shared/files.service.mock";
import { DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS } from "../shared/entity-search-results.mock";
import { TermCountsUpdatedAction } from "./table/term-counts-updated.action";
import { FetchTableModelSuccessAction } from "./table/fetch-table-model-success.action";
import { FetchTableDataRequestAction } from "./table/fetch-table-data-request.action";

describe("File Effects", () => {

    let effects: FileEffects;
    let actions: Observable<any>;
    let store: MockStore<FileState>;

    /**
     * Setup for each test in suite.
     */
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                // any modules needed
            ],
            providers: [
                FileEffects,
                provideMockActions(() => actions),
                {provide: FilesService, useClass: FilesMockService},
                provideMockStore({initialState: DEFAULT_PROJECTS_STATE})
            ],
        });

        effects = TestBed.get(FileEffects);
        store = TestBed.get(Store);
    });

    /**
     * Term counts that are displayed on the table column headers should be updated when fetching facets if the "update
     * table data" flag is set to false.
     */
    it(`fetchFacets$ - projects tab - should update column term counts when "update table data" is set to false`, () => {

        // The select project action is translated into a fetch file facets action, with the update project table flag
        // set to false
        actions = hot("--a-", {
            a: new FetchFileFacetsRequestAction(false)
        });
        
        const expected = cold("--(bcd)", {
            b: new FetchFileFacetsSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.fileFacets),
            c: new SearchTermsUpdatedAction([]),
            d: new TermCountsUpdatedAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel.termCountsByFacetName)
        });

        expect(effects.fetchFacets$).toBeObservable(expected);
    });

    /**
     * Full table model (data, pagination and term counts) should be updated when fetching facets if the "update table
     * data" flag is set to true and the current tab is projects.
     */
    it("fetchFacets$ - projects tab - should update full table model when no project search term is selected", () => {

        // The select project action is translated into a fetch file facets action, with the update project table flag
        // set to false
        actions = hot("--a-", {
            a: new FetchFileFacetsRequestAction(true)
        });

        const expected = cold("--(bcd)", {
            b: new FetchFileFacetsSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.fileFacets),
            c: new SearchTermsUpdatedAction([]),
            d: new FetchTableModelSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel)
        });

        expect(effects.fetchFacets$).toBeObservable(expected);
    });
    
    /**
     * A new request to fetch table data should be returned when viewing the projects tab and there is currently a
     * selected project.
     */
    it("fetchFacets$ - projects tab - should request table data when a project search term is selected", () => {

        // Update search state to include a selected project search term
        store.setState(PROJECTS_STATE_WITH_PROJECT_SEARCH_TERM); 

        // Dispatch the fetch file facets action
        actions = hot("--a-", {
            a: new FetchFileFacetsRequestAction(true)
        });

        const expected = cold("--(bcd)", {
            b: new FetchFileFacetsSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.fileFacets),
            c: new SearchTermsUpdatedAction([]),
            d: new FetchTableDataRequestAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel.termCountsByFacetName)
        });

        expect(effects.fetchFacets$).toBeObservable(expected);
    });
    
    /**
     * Full table model (data, pagination and term counts) should be updated when fetching facets if the "update table
     * data" flag is set to true and the current tab is samples.
     */
    it("fetchFacets$ - samples tab - should update full table model when no project search term is selected", () => {

        // Update selected tab to be samples
        store.setState(DEFAULT_SAMPLES_STATE);

        // Dispatch the fetch file facets action
        actions = hot("--a-", {
            a: new FetchFileFacetsRequestAction(true)
        });

        const expected = cold("--(bcd)", {
            b: new FetchFileFacetsSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.fileFacets),
            c: new SearchTermsUpdatedAction([]),
            d: new FetchTableModelSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel)
        });

        expect(effects.fetchFacets$).toBeObservable(expected);
    });

    /**
     * Full table model (data, pagination and term counts) should be updated when fetching facets if the "update table
     * data" flag is set to true and the current tab is samples.
     */
    it("fetchFacets$ - samples tab - should update full table model when a project search term is selected", () => {

        // Update search state to include a selected project search term
        store.setState(SAMPLES_STATE_WITH_SEARCH_TERM);

        // Dispatch the fetch file facets action
        actions = hot("--a-", {
            a: new FetchFileFacetsRequestAction(true)
        });

        const expected = cold("--(bcd)", {
            b: new FetchFileFacetsSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.fileFacets),
            c: new SearchTermsUpdatedAction([]),
            d: new FetchTableModelSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel)
        });

        expect(effects.fetchFacets$).toBeObservable(expected);
    });

    /**
     * Full table model (data, pagination and term counts) should be updated when fetching facets if the "update table
     * data" flag is set to true and the current tab is files.
     */
    it("fetchFacets$ - files tab - should update full table model when no project search term is selected", () => {

        // Update selected tab to be files
        store.setState(DEFAULT_FILES_STATE);

        // Dispatch the fetch file facets action
        actions = hot("--a-", {
            a: new FetchFileFacetsRequestAction(true)
        });

        const expected = cold("--(bcd)", {
            b: new FetchFileFacetsSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.fileFacets),
            c: new SearchTermsUpdatedAction([]),
            d: new FetchTableModelSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel)
        });

        expect(effects.fetchFacets$).toBeObservable(expected);
    });

    /**
     * Full table model (data, pagination and term counts) should be updated when fetching facets if the "update table
     * data" flag is set to true and the current tab is files.
     */
    it("fetchFacets$ - files tab - should update full table model when a project search term is selected", () => {

        // Update search state to include a selected project search term
        store.setState(FILES_STATE_WITH_SEARCH_TERM);

        // Dispatch the fetch file facets action
        actions = hot("--a-", {
            a: new FetchFileFacetsRequestAction(true)
        });

        const expected = cold("--(bcd)", {
            b: new FetchFileFacetsSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.fileFacets),
            c: new SearchTermsUpdatedAction([]),
            d: new FetchTableModelSuccessAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel)
        });

        expect(effects.fetchFacets$).toBeObservable(expected);
    });
});
