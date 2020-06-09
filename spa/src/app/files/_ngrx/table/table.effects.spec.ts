/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite of table effects.
 */

// Core dependencies
import { TestBed } from "@angular/core/testing";
import { cold, hot } from "jasmine-marbles";
import { provideMockActions } from "@ngrx/effects/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Observable, of } from "rxjs";

// App dependencies
import { FileState } from "../file.state";
import { FetchFileFacetsRequestAction } from "../facet/file-facet-list.actions";
import { DEFAULT_FILES_STATE, DEFAULT_PROJECTS_STATE, DEFAULT_SAMPLES_STATE } from "../file.state.mock";
import { FetchFileSummaryRequestAction } from "../file-summary/file-summary.actions";
import { FetchSortedTableDataRequestAction } from "./fetch-sorted-table-data-request.action";
import { FetchTableDataRequestAction } from "./fetch-table-data-request.action";
import { FetchTableDataSuccessAction } from "./fetch-table-data-success.action";
import { PROJECT_1M_NEURONS } from "../search/search.state.mock";
import { SelectProjectIdAction } from "../search/select-project-id.action";
import { ProjectService } from "../../project/project.service";
import { DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS } from "../../shared/entity-search-results.mock";
import { DEFAULT_FILE_SUMMARY } from "../../shared/file-summary.mock";
import { FilesService } from "../../shared/files.service";
import { ProjectMockService } from "../../shared/project.service.mock";
import { TableEffects } from "./table.effects";
import { TableNextPageAction } from "./table-next-page.action";
import { TableNextPageSuccessAction } from "./table-next-page-success.action";
import { TablePreviousPageAction } from "./table-previous-page.action";
import { TablePreviousPageSuccessAction } from "./table-previous-page-success.action";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { EntityName } from "../../shared/entity-name.model";
import { GASource } from "../../../shared/analytics/ga-source.model";

describe("Table Effects", () => {

    let effects: TableEffects;
    let actions: Observable<any>;
    let store: MockStore<FileState>;

    /**
     * Setup for each test in suite.
     */
    beforeEach(() => {

        const filesService = jasmine.createSpyObj("FilesService", ["fetchEntitySearchResults", "fetchFileSummary"]);
        filesService.fetchEntitySearchResults.and.returnValue(of(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS));
        filesService.fetchFileSummary.and.returnValue(of(DEFAULT_FILE_SUMMARY));

        TestBed.configureTestingModule({
            imports: [
                // any modules needed
            ],
            providers: [
                TableEffects,
                provideMockActions(() => actions),
                {provide: FilesService, useValue: filesService}, {
                    provide: GTMService,
                    useValue: jasmine.createSpyObj("GTMService", [
                        "trackEvent"
                    ])
                },
                {provide: ProjectService, useClass: ProjectMockService},
                provideMockStore({initialState: DEFAULT_PROJECTS_STATE})
            ],
        });

        effects = TestBed.get(TableEffects);
        store = TestBed.get(Store);
    });

    /**
     * Table data should not be updated when selecting a project from the projects tab.
     */
    it(`selectProject$ - projects tab - should set "update table data" flag to false`, () => {

        actions = hot("--a-", {
            a: new SelectProjectIdAction(PROJECT_1M_NEURONS.id, PROJECT_1M_NEURONS.name, true)
        });

        const expected = cold("--(bc)", {
            b: new FetchFileSummaryRequestAction(),
            c: new FetchFileFacetsRequestAction(false)
        });

        expect(effects.selectProject$).toBeObservable(expected);
    });

    /**
     * Table data should be updated when selecting a project from the samples tab.
     */
    it(`selectProject$ - samples tab - should set "update table data" flag to true`, () => {

        // Update selected tab to be samples
        store.setState(DEFAULT_SAMPLES_STATE);

        actions = hot("--a-", {
            a: new SelectProjectIdAction(PROJECT_1M_NEURONS.id, PROJECT_1M_NEURONS.name, true)
        });

        const expected = cold("--(bc)", {
            b: new FetchFileSummaryRequestAction(),
            c: new FetchFileFacetsRequestAction(true)
        });

        expect(effects.selectProject$).toBeObservable(expected);
    });

    /**
     * Table data should be updated when selecting a project from the files tab.
     */
    it(`selectProject$ - files tab - should set "update table data" flag to true`, () => {

        // Update selected tab to be samples
        store.setState(DEFAULT_FILES_STATE);

        actions = hot("--a-", {
            a: new SelectProjectIdAction(PROJECT_1M_NEURONS.id, PROJECT_1M_NEURONS.name, true)
        });

        const expected = cold("--(bc)", {
            b: new FetchFileSummaryRequestAction(),
            c: new FetchFileFacetsRequestAction(true)
        });

        expect(effects.selectProject$).toBeObservable(expected);
    });

    /**
     * Only table data should be updated when viewing a project tab and there is a selected project search term.
     */
    it("fetchTableData$ - should update table data only", () => {

        // Update selected tab to be samples
        store.setState(DEFAULT_FILES_STATE);

        actions = hot("--a-", {
            a: new FetchTableDataRequestAction(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel.termCountsByFacetName)
        });

        const tableModel = DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel;
        const expected = cold("--b", {
            b: new FetchTableDataSuccessAction(tableModel.data, tableModel.pagination, tableModel.termCountsByFacetName)
        });

        expect(effects.fetchTableData$).toBeObservable(expected);
    });

    /**
     * Only table data should be updated when navigating to next page of data.
     */
    it("fetchNextPagedOrSortedTableData$ - should update table data only", () => {

        // Update selected tab to be samples
        store.setState(DEFAULT_FILES_STATE);

        actions = hot("--a-", {
            a: new TableNextPageAction({
                "search_after": "10x 1 Run Integration Test",
                "search_after_uid": "doc#1af6d535-81f1-4a3f-8626-830ae8668867",
                "size": 15,
                "sort": "projectTitle",
                "order": "asc"
            }, 1)
        });

        const tableModel = DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel;
        const expected = cold("--b", {
            b: new TableNextPageSuccessAction(tableModel)
        });

        expect(effects.fetchNextPagedOrSortedTableData$).toBeObservable(expected);
    });

    /**
     * Only table data should be updated when navigating to previous page of data.
     */
    it("fetchPreviousPagedOrSortedTableData$ - should update table data only", () => {

        // Update selected tab to be samples
        store.setState(DEFAULT_FILES_STATE);

        actions = hot("--a-", {
            a: new TablePreviousPageAction({
                "search_before": "Assessing the relevance of organoids to model inter-individual variation",
                "search_before_uid": "doc#2c4724a4-7252-409e-b008-ff5c127c7e89",
                "size": 15,
                "sort": "projectTitle",
                "order": "asc"
            }, 2)
        });

        const tableModel = DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel;
        const expected = cold("--b", {
            b: new TablePreviousPageSuccessAction(tableModel)
        });

        expect(effects.fetchPreviousPagedOrSortedTableData$).toBeObservable(expected);
    });

    /**
     * Only table data should be updated when sorting or updating the page size of the table.
     */
    it("fetchPagedOrSortedTableData$ - should update table data only", () => {

        // Update selected tab to be samples
        store.setState(DEFAULT_FILES_STATE);

        actions = hot("--a-", {
            a: new FetchSortedTableDataRequestAction(
                {
                    "search_before": "Assessing the relevance of organoids to model inter-individual variation",
                    "search_before_uid": "doc#2c4724a4-7252-409e-b008-ff5c127c7e89",
                    "size": 15,
                    "sort": "projectTitle",
                    "order": "desc"
                },
                EntityName.PROJECTS,
                GASource.SEARCH_RESULTS)
        });

        const tableModel = DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel;
        const expected = cold("--b", {
            b: new FetchTableDataSuccessAction(tableModel.data, tableModel.pagination, DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS.tableModel.termCountsByFacetName)
        });

        expect(effects.fetchSortedTableData$).toBeObservable(expected);
    });
});
