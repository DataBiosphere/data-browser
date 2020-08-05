/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing HCA get matrix component.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatRadioModule } from "@angular/material/radio";
import { By } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { ClipboardModule } from "ngx-clipboard";
import { of } from "rxjs";

// App components
import { ConfigService } from "../../../config/config.service";
import { DisplayDataLinkComponent } from "../display-data-link/display-data-link.component";
import { HCAGetDataPanelComponent } from "../hca-get-data-panel/hca-get-data-panel.component";
import { HCAGetMatrixComponent } from "./hca-get-matrix.component";
import { MatrixPartialQueryMatchWarningComponent } from "../matrix-partial-query-match-warning/matrix-partial-query-match-warning.component";
import { MatrixUrlRequestCompletedComponent } from "../matrix-url-request-completed/matrix-url-request-completed.component";
import { MatrixUrlRequestFormComponent } from "../matrix-url-request-form/matrix-url-request-form.component";
import { CancelFetchMatrixUrlRequestAction } from "../../_ngrx/matrix/cancel-fetch-matrix-url-request.action";
import { ClearMatrixPartialQueryMatchAction } from "../../_ngrx/matrix/clear-matrix-partial-query-match.action";
import { FetchMatrixUrlRequestAction } from "../../_ngrx/matrix/fetch-matrix-url-request.action";
import { SearchTermHttpService } from "../../search/http/search-term-http.service";
import { CopyToClipboardComponent } from "../../../shared/copy-to-clipboard/copy-to-clipboard.component";
import { DEFAULT_FILE_SUMMARY } from "../../shared/file-summary.mock";
import { FileManifestService } from "../../shared/file-manifest.service";
import { GenusSpecies } from "../../shared/genus-species.model";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { MatrixService } from "../../shared/matrix.service";
import { MatrixFormat } from "../../shared/matrix-format.model";
import { MatrixUrlRequestStatus } from "../../shared/matrix-url-request-status.model";
import { WarningComponent } from "../../../shared/warning/warning.component";
import { WarningContentComponent } from "../../../shared/warning/warning-content.component";
import { WarningTitleComponent } from "../../../shared/warning/warning-title.component";
import { HttpService } from "../../http/http.service";

describe("HCAGetMatrixComponent", () => {

    let component: HCAGetMatrixComponent;
    let fixture: ComponentFixture<HCAGetMatrixComponent>;
    let matrixService: MatrixService;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    // Component input properties
    const COMPONENT_INPUT_PROPERTY_LOADING = "loading";

    // Component names
    const COMPONENT_NAME_HCA_GET_DATA_PANEL = "hca-get-data-panel";
    const COMPONENT_NAME_MATRIX_URL_REQUEST_FORM = "matrix-url-request-form";
    const COMPONENT_NAME_MATRIX_URL_REQUEST_COMPLETED = "matrix-url-request-completed";

    // CSS selectors
    const CSS_SELECTOR_MATRIX = ".matrix";
    const CSS_SELECTOR_SPECIES_PARAGRAPH = "matrix-url-request-completed p.fontsize-m.semi-bold"; // for species label
    const CSS_SELECTOR_COMPLETED_HEADING = "h4.fontsize-m.semi-bold";

    // Test values
    const HEADING_COMPLETED_SINGLE = "Your expression matrix is ready.";
    const HEADING_COMPLETED_MULTIPLE = "Your expression matrices are ready.";
    const PARAGRAPH_MULTIPLE_MATRIX_URL =
        "Your request contains data from multiple species. Data from each species is returned in its own expression matrix.";
    const URL_DATA = "https://test.com";
    const URL_DATA_NULL = "";

    const MATRIX_URL_REQUEST_COMPLETED_HOMO = {
        eta: "",
        matrixUrl: URL_DATA,
        message: "",
        requestId: "ea14b8fc-e567-4215-9625-2e4325c04ad3",
        species: GenusSpecies.HOMO_SAPIENS,
        status: MatrixUrlRequestStatus.COMPLETED
    };
    const MATRIX_URL_REQUEST_COMPLETED_MUS = {
        eta: "",
        matrixUrl: URL_DATA,
        message: "",
        requestId: "86ecf86d-df97-4b37-af6f-7f25d78d404b",
        species: GenusSpecies.MUS_MUSCULUS,
        status: MatrixUrlRequestStatus.COMPLETED
    };
    const MATRIX_URL_REQUEST_COMPLETED_HOMO_NULL_DATA = {
        eta: "",
        matrixUrl: URL_DATA_NULL,
        message: "",
        requestId: "ea14b8fc-e567-4215-9625-2e4325c04ad3",
        species: GenusSpecies.HOMO_SAPIENS,
        status: MatrixUrlRequestStatus.COMPLETED
    };
    const MATRIX_URL_REQUEST_COMPLETED_MUS_NULL_DATA = {
        eta: "",
        matrixUrl: URL_DATA_NULL,
        message: "",
        requestId: "86ecf86d-df97-4b37-af6f-7f25d78d404b",
        species: GenusSpecies.MUS_MUSCULUS,
        status: MatrixUrlRequestStatus.COMPLETED
    };
    const MATRIX_URL_REQUEST_FAILED_HOMO = {
        eta: "",
        matrixUrl: "",
        message: "resolved bundles in request do not match bundles available in matrix service",
        requestId: "ea14b8fc-e567-4215-9625-2e4325c04ad3",
        species: GenusSpecies.HOMO_SAPIENS,
        status: MatrixUrlRequestStatus.FAILED
    };
    const MATRIX_URL_REQUEST_FAILED_MUS = {
        eta: "",
        matrixUrl: "",
        message: "resolved bundles in request do not match bundles available in matrix service",
        requestId: "86ecf86d-df97-4b37-af6f-7f25d78d404b",
        species: GenusSpecies.MUS_MUSCULUS,
        status: MatrixUrlRequestStatus.FAILED
    };
    const MATRIX_URL_REQUEST_IN_PROGRESS_HOMO = {
        eta: "",
        matrixUrl: undefined,
        message: "Job started.",
        requestId: "aace1b45-f7e6-4a86-b80e-17cfd62bcb00",
        species: GenusSpecies.HOMO_SAPIENS,
        status: MatrixUrlRequestStatus.IN_PROGRESS
    };
    const MATRIX_URL_REQUEST_IN_PROGRESS_MUS = {
        eta: "",
        matrixUrl: URL_DATA_NULL,
        message: "",
        requestId: "23d520f5-b50a-4407-90d7-1dc3500601cb",
        species: GenusSpecies.MUS_MUSCULUS,
        status: MatrixUrlRequestStatus.IN_PROGRESS
    };
    const MATRIX_URL_REQUEST_MANIFEST_IN_PROGRESS = {status: MatrixUrlRequestStatus.MANIFEST_IN_PROGRESS};

    const MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_MULTIPLE_DATA = new Map([
        [GenusSpecies.HOMO_SAPIENS, MATRIX_URL_REQUEST_COMPLETED_HOMO],
        [GenusSpecies.MUS_MUSCULUS, MATRIX_URL_REQUEST_COMPLETED_MUS]
    ]);
    const MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_NULL_DATA = new Map([
        [GenusSpecies.HOMO_SAPIENS, MATRIX_URL_REQUEST_COMPLETED_HOMO_NULL_DATA],
        [GenusSpecies.MUS_MUSCULUS, MATRIX_URL_REQUEST_COMPLETED_MUS_NULL_DATA]
    ]);
    const MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_SINGLE_DATA = new Map([
        [GenusSpecies.HOMO_SAPIENS, MATRIX_URL_REQUEST_COMPLETED_HOMO],
        [GenusSpecies.MUS_MUSCULUS, MATRIX_URL_REQUEST_COMPLETED_MUS_NULL_DATA]
    ]);
    const MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_FAILED_MULTIPLE_DATA = new Map([
        [GenusSpecies.HOMO_SAPIENS, MATRIX_URL_REQUEST_FAILED_HOMO],
        [GenusSpecies.MUS_MUSCULUS, MATRIX_URL_REQUEST_FAILED_MUS]
    ]);
    const MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_IN_PROGRESS = new Map([
        [GenusSpecies.HOMO_SAPIENS, MATRIX_URL_REQUEST_IN_PROGRESS_HOMO],
        [GenusSpecies.MUS_MUSCULUS, MATRIX_URL_REQUEST_IN_PROGRESS_MUS]
    ]);
    const MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_MIXED_RESULT_MULTIPLE_DATA = new Map([
        [GenusSpecies.HOMO_SAPIENS, MATRIX_URL_REQUEST_COMPLETED_HOMO],
        [GenusSpecies.MUS_MUSCULUS, MATRIX_URL_REQUEST_FAILED_MUS]
    ]);
    const MATRIX_URL_REQUEST_BY_SINGLE_SPECIES_COMPLETED_SINGLE_DATA = new Map([
        [GenusSpecies.HOMO_SAPIENS, MATRIX_URL_REQUEST_COMPLETED_HOMO]
    ]);
    const MATRIX_URL_REQUEST_BY_SINGLE_SPECIES_FAILED_SINGLE_DATA = new Map([
        [GenusSpecies.HOMO_SAPIENS, MATRIX_URL_REQUEST_FAILED_HOMO]
    ]);
    const MATRIX_URL_REQUEST_BY_SPECIES_MANIFEST_IN_PROGRESS = new Map([
        [undefined, MATRIX_URL_REQUEST_MANIFEST_IN_PROGRESS]
    ]);
    const MATRIX_URL_REQUEST_BY_SPECIES_NOT_STARTED = new Map();

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                HCAGetDataPanelComponent,
                CopyToClipboardComponent,
                DisplayDataLinkComponent,
                HCAGetMatrixComponent,
                MatrixPartialQueryMatchWarningComponent,
                MatrixUrlRequestFormComponent,
                MatrixUrlRequestCompletedComponent,
                WarningComponent,
                WarningContentComponent,
                WarningTitleComponent
            ],
            imports: [
                ClipboardModule,
                FormsModule,
                MatIconModule,
                MatRadioModule
            ],
            providers: [
                MatrixService,
                ConfigService,
                {
                    provide: HttpClient,
                    useValue: jasmine.createSpyObj("HttpClient", [
                        "get", "head", "post"
                    ])
                }, {
                    provide: FileManifestService,
                    useValue: jasmine.createSpyObj("FileManifestService", [
                        "requestMatrixFileManifestUrl"
                    ])
                }, {
                    provide: GTMService,
                    useValue: jasmine.createSpyObj("GTMService", [
                        "trackEvent"
                    ])
                }, {
                    provide: HttpService,
                    useValue: jasmine.createSpyObj("HttpService", [
                        "createIndexParams"
                    ])
                }, {
                    provide: SearchTermHttpService,
                    useValue: jasmine.createSpyObj("SearchTermService", [
                        "bindSearchTerms",
                        "marshallSearchTerms"
                    ])
                }, {
                    provide: Store,
                    useValue: testStore
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HCAGetMatrixComponent);
        component = fixture.componentInstance;
        matrixService = fixture.debugElement.injector.get(MatrixService);
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm class "matrix" is displayed on init of state
     */
    it(`adds CSS class "matrix" on init of state`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_SPECIES_NOT_STARTED), // matrixUrlRequestsBySpecies
            of(null), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        expect(getDEByClassName(CSS_SELECTOR_MATRIX)).not.toEqual(null);
    });

    /**
     * Confirm get file formats return a sorted set of possible file formats.
     */
    it("displays only valid file formats, sorted", () => {

        // Confirm a sorted set of possible formats is returned
        const getFileFormats = component.getFileFormats(["mtx", "loom", "zarr", "csv"]);
        expect(getFileFormats).toEqual(["csv", "loom", "mtx"]);
    });

    /**
     * Confirm isDisplayMultipleMatrixUrlRequests returns false when matrix URL request for single species.
     */
    it("displays a single request as a single request", () => {

        // Confirm returns false when matrix url request for single species
        const displayMultipleMatrixUrlRequests =
            component.isDisplayMultipleMatrixUrlRequests([MATRIX_URL_REQUEST_COMPLETED_HOMO]);
        expect(displayMultipleMatrixUrlRequests).toEqual(false);
    });

    /**
     * Confirm isDisplayMultipleMatrixUrlRequests returns false when matrix URL request for multiple species and single
     * species has data.
     */
    it("only displays requests with data", () => {

        // Confirm returns false when matrix url request for multiple species and single species has data
        const isDisplayMultipleMatrixUrlRequests =
            component.isDisplayMultipleMatrixUrlRequests([
                MATRIX_URL_REQUEST_COMPLETED_HOMO,
                MATRIX_URL_REQUEST_COMPLETED_MUS_NULL_DATA
            ]);
        expect(isDisplayMultipleMatrixUrlRequests).toEqual(false);
    });

    /**
     * Confirm isDisplayMultipleMatrixUrlRequests returns true when matrix URL request for multiple species and
     * multiple species have data.
     */
    it("displays multiple requests when more than one request has data", () => {

        // Confirm returns true when matrix url request for multiple species and multiple species has data
        const displayMultipleMatrixUrlRequests = component.isDisplayMultipleMatrixUrlRequests([
            MATRIX_URL_REQUEST_COMPLETED_HOMO,
            MATRIX_URL_REQUEST_COMPLETED_MUS]);
        expect(displayMultipleMatrixUrlRequests).toEqual(true);
    });

    /**
     * Confirm isMatrixUrlRequestStatusInProgress returns true when matrix url request status is in progress.
     */
    it("classifies in progress requests as in progress", () => {

        // Confirm is matrix url request status in progress returns true, when matrix url is in progress
        const matrixUrlRequestStatusInProgress =
            component.isMatrixUrlRequestStatusInProgress(MatrixUrlRequestStatus.IN_PROGRESS);
        expect(matrixUrlRequestStatusInProgress).toEqual(true);
    });

    /**
     * Confirm isMatrixUrlRequestStatusManifestInProgress return true when matrix url request status is manifest in
     * progress.
     */
    it("classifies manifest in progress requests as in progress", () => {

        // Confirm is matrix url request status manifest in progress returns true, when matrix url is manifest in
        // progress
        const matrixUrlRequestStatusManifestInProgress =
            component.isMatrixUrlRequestStatusManifestInProgress(MatrixUrlRequestStatus.MANIFEST_IN_PROGRESS);
        expect(matrixUrlRequestStatusManifestInProgress).toEqual(true);
    });

    /**
     * Confirm isMatrixUrlRequestStatusNotStarted returns true when matrix url request status is not started.
     */
    it("classifies not started requests as not started", () => {

        // Confirm is matrix url request status not started returns true, when matrix url is not started
        const isMatrixUrlRequestStatusNotStarted =
            component.isMatrixUrlRequestStatusNotStarted(MatrixUrlRequestStatus.NOT_STARTED);
        expect(isMatrixUrlRequestStatusNotStarted).toEqual(true);
    });

    /**
     * Confirm store dispatch is called when on matrix url requested.
     */
    it("dispatches action to store, to fetch matrix URL request, when matrix URL is requested", () => {

        // Confirm store dispatch is called
        component.onMatrixUrlRequested([], MatrixFormat.loom);
        const fetchMatrixUrlRequestAction = new FetchMatrixUrlRequestAction(MatrixFormat.loom);
        expect(testStore.dispatch).toHaveBeenCalledWith(fetchMatrixUrlRequestAction);
    });

    /**
     * Confirm store dispatch to be called with clear matrix partial query match action when component is destroyed.
     */
    it("dispatches action to store, to clear partial query match, on destroy of component", () => {

        // Confirm store dispatch is called
        component.ngOnDestroy();
        expect(testStore.dispatch).toHaveBeenCalledWith(new ClearMatrixPartialQueryMatchAction());
    });

    /**
     * Confirm store dispatch to be called with cancel fetch matrix url request action when ng on destroy requested.
     */
    it("dispatches to store, to cancel fetch matrix URL request, on destroy of component", () => {

        // Confirm store dispatch is called
        component.ngOnDestroy();
        expect(testStore.dispatch).toHaveBeenCalledWith(new CancelFetchMatrixUrlRequestAction());
    });

    /**
     * Confirm ng on destroy emits true.
     */
    xit("should ng on destroy emit true", () => {

        // TODO - pending test
    });

    /**
     * Confirm component <matrix-url-request-form> is displayed when matrix url request status is not started.
     */
    it("displays component matrix url request form when matrix url request status has not started", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_SPECIES_NOT_STARTED), // matrixUrlRequestsBySpecies
            of(null), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is displayed
        expect(isComponentDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_FORM)).toBe(true);
    });

    /**
     * Confirm component <hca-get-data-panel> is not displayed when matrix url request status is not started.
     */
    it("hides component hca get data panel when matrix url request status has not started", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_SPECIES_NOT_STARTED), // matrixUrlRequestsBySpecies
            of(null), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed
        expect(isComponentDisplayed(COMPONENT_NAME_HCA_GET_DATA_PANEL)).toBe(false);
    });

    /**
     * Confirm component <matrix-url-request-completed> is not displayed when matrix url request status is not started.
     */
    it("hides component matrix url request progress when matrix url request status has not started", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_SPECIES_NOT_STARTED), // matrixUrlRequestsBySpecies
            of(null), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed
        expect(isComponentDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_COMPLETED)).toBe(false);
    });

    /**
     * Confirm component <matrix-url-request-form> is not displayed when matrix url request status is manifest in
     * progress.
     */
    it("hides display component matrix url request form when matrix url request manifest is in progress", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_SPECIES_MANIFEST_IN_PROGRESS), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed
        expect(isComponentDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_FORM)).toBe(false);
    });

    /**
     * Confirm component <hca-get-data-panel> is displayed when matrix url request status is manifest in progress.
     */
    it("displays component hca-get-data-panel when matrix url request manifest is in progress", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_SPECIES_MANIFEST_IN_PROGRESS), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is displayed
        expect(isComponentDisplayed(COMPONENT_NAME_HCA_GET_DATA_PANEL)).toBe(true);
    });

    /**
     * Confirm component <hca-get-data-panel> is displayed with input property "loading" is true when matrix url request
     * status is manifest in progress.
     */
    it(`displays component hca get data panel with input property "loading" is true when matrix url request manifest is in progress`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_SPECIES_MANIFEST_IN_PROGRESS), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm input property "loading" is true
        const dataPanelDebugEl = getDEByClassName(COMPONENT_NAME_HCA_GET_DATA_PANEL);
        expect(getComponentInputPropertyValue(dataPanelDebugEl, COMPONENT_INPUT_PROPERTY_LOADING)).toEqual(true);
    });

    /**
     * Confirm component <matrix-url-request-completed> is not displayed when matrix url request status is manifest in progress.
     */
    it("hides component matrix url request completed when matrix url request manifest is in progress", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_SPECIES_MANIFEST_IN_PROGRESS), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed
        expect(isComponentDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_COMPLETED)).toBe(false);
    });

    /**
     * Confirm component <matrix-url-request-form> is not displayed when matrix url request status is in progress.
     */
    it("hides component matrix url request form when matrix url request is in progress", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_IN_PROGRESS), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed
        expect(isComponentDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_FORM)).toBe(false);
    });

    /**
     * Confirm component <hca-get-data-panel> is displayed when matrix url request status is in progress.
     */
    it("displays component hca-get-data-panel when matrix url request is in progress", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_IN_PROGRESS), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is displayed
        expect(isComponentDisplayed(COMPONENT_NAME_HCA_GET_DATA_PANEL)).toBe(true);
    });

    /**
     * Confirm component <hca-get-data-panel> is displayed with input property "loading" is true when matrix url request
     * status is in progress.
     */
    it(`displays component hca get data panel with input property "loading" is true when matrix url request status is in progress`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_IN_PROGRESS), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm input property "loading" is true
        const dataPanelDebugEl = getDEByClassName(COMPONENT_NAME_HCA_GET_DATA_PANEL);
        expect(getComponentInputPropertyValue(dataPanelDebugEl, COMPONENT_INPUT_PROPERTY_LOADING)).toEqual(true);
    });

    /**
     * Confirm component <matrix-url-request-completed> is not displayed when matrix url request status is in progress.
     */
    it("hides component matrix url request completed when matrix url request status is in progress", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_IN_PROGRESS), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed
        expect(isComponentDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_COMPLETED)).toBe(false);
    });

    /**
     * Confirm component <matrix-url-request-form> is not displayed when matrix url request status is completed.
     */
    it("hides component matrix url request form when matrix url request has completed", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed
        expect(isComponentDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_FORM)).toBe(false);
    });

    /**
     * Confirm component <hca-get-data-panel> is not displayed with input property "loading" is true when matrix url
     * request status is completed.
     */
    it(`hides component hca get data panel with input property "loading" is true when matrix url request has completed`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed with input property "loading"
        const dataPanelDebugEl = getDEByClassName(COMPONENT_NAME_HCA_GET_DATA_PANEL);
        expect(getComponentInputPropertyValue(dataPanelDebugEl, COMPONENT_INPUT_PROPERTY_LOADING)).toBeUndefined();
    });

    /**
     * Confirm component <matrix-url-request-completed> is displayed when matrix url request status is completed.
     */
    it("displays component matrix url request completed when matrix url request has completed", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is displayed
        expect(isComponentDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_COMPLETED)).toBe(true);
    });

    /**
     * Confirm component <matrix-url-request-form> is not displayed when matrix url request status is failed.
     */
    it("hides component matrix url request form when matrix url request has failed", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_FAILED_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed
        expect(isComponentDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_FORM)).toBe(false);
    });

    /**
     * Confirm component <hca-get-data-panel> is not displayed with input property "loading" is true when matrix url
     * request status is failed.
     */
    it(`hides component hca get data panel with input property "loading" is true when matrix url request has failed`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_FAILED_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed with input property "loading"
        expect(getComponentInputPropertyValue(getDEByClassName(COMPONENT_NAME_HCA_GET_DATA_PANEL), COMPONENT_INPUT_PROPERTY_LOADING)).toBeUndefined();
    });

    /**
     * Confirm component <matrix-url-request-completed> is displayed when multiple matrix url request status is failed.
     */
    it("displays component matrix url request completed when matrix url request has failed", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_FAILED_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is displayed
        expect(isComponentDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_COMPLETED)).toBe(true);
    });

    /**
     * Confirm paragraph "Your request contains data from multiple species. Data from each species is returned in its
     * own expression matrix." is displayed when multiple matrix url requests are completed with data from multiple
     * species.
     */
    it("displays multiple species text when matrix url request has completed with data from multiple species", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm paragraph is displayed
        expect(getComponentsDisplayed("p")[0].nativeElement.innerHTML).toBe(PARAGRAPH_MULTIPLE_MATRIX_URL);
    });

    /**
     * Confirm paragraph "Your request contains data from multiple species. Data from each species is returned in its own expression matrix." is not displayed when multiple matrix url requests are completed with data from single species.
     */
    it("hides multiple species text when matrix url request has completed with data from single species", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_SINGLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        const paragraph = getComponentsDisplayed("p")[0];

        // Confirm paragraph is not displayed
        expect(getDEInnerHtml(paragraph)).toBeUndefined();
    });

    /**
     * Confirm component <matrix-url-request-completed> is displayed twice when multiple matrix url request status is
     * completed.
     */
    it("displays component matrix url request completed twice when multiple matrix url request has completed", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is displayed twice
        expect(getComponentsDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_COMPLETED).length).toEqual(2);
    });

    /**
     * Confirm component <matrix-url-request-completed> is displayed once when single matrix url request status is
     * completed.
     */
    it("displays component matrix url request completed once when single matrix url request has completed", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_SINGLE_SPECIES_COMPLETED_SINGLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed
        expect(getComponentsDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_COMPLETED).length).toEqual(1);
    });

    /**
     * Confirm component <matrix-url-request-completed> is displayed twice when multiple matrix url request status is
     * failed.
     */
    it("displays component matrix url request completed twice when multiple matrix url requesthas failed", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_FAILED_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is displayed twice
        expect(getComponentsDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_COMPLETED).length).toEqual(2);
    });

    /**
     * Confirm component <matrix-url-request-completed> is displayed once when single matrix url request status is
     * failed.
     */
    it("displays component matrix url request completed twice when multiple matrix url request has failed", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_SINGLE_SPECIES_FAILED_SINGLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is displayed twice
        expect(getComponentsDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_COMPLETED).length).toEqual(1);
    });

    /**
     * Confirm component <matrix-url-request-completed> is displayed twice when one matrix url request status is failed
     * and one is completed.
     */
    it("displays component matrix url request completed twice when one matrix url request failed and one matrix url request is completed", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_MIXED_RESULT_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is displayed twice
        expect(getComponentsDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_COMPLETED).length).toEqual(2);
    });

    /**
     * Confirm single species paragraph is displayed when single matrix url request has completed with data.
     */
    it("displays single species header when single matrix url request has completed with data", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_SINGLE_SPECIES_COMPLETED_SINGLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm text is displayed
        const singleHeadingDebugEls = getDEsByClassName(CSS_SELECTOR_COMPLETED_HEADING);
        expect(getDEInnerHtml(singleHeadingDebugEls[0])).toEqual(HEADING_COMPLETED_SINGLE);
    });

    /**
     * Confirm single species paragraph is displayed when multiple matrix url requests are completed with data from
     * single species.
     */
    it("displays single species header when multiple matrix url requests have completed with data from one species", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_SINGLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm text is displayed
        const singleHeadingDebugEls = getDEsByClassName(CSS_SELECTOR_COMPLETED_HEADING);
        expect(getDEInnerHtml(singleHeadingDebugEls[0])).toEqual(HEADING_COMPLETED_SINGLE);
    });

    /**
     * Confirm multiple species paragraph is displayed when multiple matrix url requests are completed with data from
     * multiple species.
     */
    it("displays multiple species header when multiple matrix url requests have completed with data from multiple species", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm text is displayed
        const multipleHeadingDebugEls = getDEsByClassName(CSS_SELECTOR_COMPLETED_HEADING);
        expect(getDEInnerHtml(multipleHeadingDebugEls[0])).toEqual(HEADING_COMPLETED_MULTIPLE);
    });

    /**
     * Confirm species label "Homo sapiens" is displayed when multiple matrix url requests are completed with data from
     * multiple species.
     */
    it(`displays species label "Homo sapiens" when multiple matrix url request has completed with data from multiple species`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        const speciesLabel = getDEsByClassName(CSS_SELECTOR_SPECIES_PARAGRAPH);

        // Confirm label is displayed
        expect(getDEInnerHtml(speciesLabel[0])).toEqual(GenusSpecies.HOMO_SAPIENS);
    });

    /**
     * Confirm species label "Mus musculus" is displayed when multiple matrix url requests are completed with data from
     * multiple species.
     */
    it(`displays species label "Mus musculus" when multiple matrix url request has completed with data from multiple species`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        const speciesLabel = getDEsByClassName(CSS_SELECTOR_SPECIES_PARAGRAPH);

        // Confirm label is displayed
        expect(getDEInnerHtml(speciesLabel[1])).toEqual(GenusSpecies.MUS_MUSCULUS);
    });

    /**
     * Confirm no species label is displayed when multiple matrix url requests are completed with data from single species.
     */
    it("displays no species label when multiple matrix url requests are completed but only one request has data", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_SINGLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm no label is displayed
        const speciesLabel = getDEsByClassName(CSS_SELECTOR_SPECIES_PARAGRAPH);
        expect(speciesLabel).toEqual([]);
    });

    /**
     * Returns the debug element specified by class name ".matrix".
     *
     * @returns {DebugElement[]}
     */
    function getClassNameMatrixChildrenComponents(): DebugElement[] {

        const parentComponentElement = getDEByClassName(CSS_SELECTOR_MATRIX);
        return parentComponentElement.children;
    }

    /**
     * Returns all debug element displayed for the specified component name.
     *
     * @param {string} componentName
     * @returns {DebugElement[]}
     */
    function getComponentsDisplayed(componentName: string): DebugElement[] {

        const childrenComponentElements = getClassNameMatrixChildrenComponents();

        if ( childrenComponentElements.length === 0 ) {

            return;
        }

        return childrenComponentElements.filter(childrenEl => childrenEl.name === componentName);
    }

    /**
     * Returns the component input property value specified by input property.
     *
     * @param {DebugElement} component
     * @param {string} inputProperty
     * @returns {any}
     */
    function getComponentInputPropertyValue(component: DebugElement, inputProperty: string): any {

        if ( !component ) {
            return;
        }

        return component.componentInstance[inputProperty];
    }

    /**
     * Returns debug element for the specified class name.
     *
     * @param {string} className
     * @returns {DebugElement}
     */
    function getDEByClassName(className: string): DebugElement {

        return fixture.debugElement.query(By.css(className));
    }

    /**
     * Returns debug elements for the specified class name.
     *
     * @param {string} className
     * @returns {DebugElement[]}
     */
    function getDEsByClassName(className: string): DebugElement[] {

        return fixture.debugElement.queryAll(By.css(className));
    }

    /**
     * Returns the inner html of a debug element.
     *
     * @param {DebugElement} debugElement
     * @returns {any}
     */
    function getDEInnerHtml(debugElement: DebugElement): any {

        if ( !debugElement ) {
            return;
        }

        return debugElement.nativeElement.innerHTML;
    }

    /**
     * Returns true if component is displayed.
     *
     * @param {string} componentName
     * @returns {boolean}
     */
    function isComponentDisplayed(componentName: string): boolean {

        const childrenComponentElements = getClassNameMatrixChildrenComponents();

        if ( childrenComponentElements.length === 0 ) {

            return false;
        }

        return childrenComponentElements.some(childrenEl => childrenEl.name === componentName);
    }
});
