/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing HCA matrix URL request completed.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule } from "@angular/material/icon";
import { By } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { ClipboardModule } from "ngx-clipboard";

// App components
import { ConfigService } from "../../../config/config.service";
import { DisplayDataLinkComponent } from "../display-data-link/display-data-link.component";
import { HCAGetDataPanelComponent } from "../hca-get-data-panel/hca-get-data-panel.component";
import { MatrixUrlRequestCompletedComponent } from "./matrix-url-request-completed.component";
import { SearchTermHttpService } from "../../search/http/search-term-http.service";
import { CopyToClipboardComponent } from "../../../shared/copy-to-clipboard/copy-to-clipboard.component";
import { GTMService } from "../../../shared/gtm/gtm.service";
import { FileManifestService } from "../../shared/file-manifest.service";
import { MatrixService } from "../../shared/matrix.service";
import { MatrixUrlRequestStatus } from "../../shared/matrix-url-request-status.model";

describe("MatrixUrlRequestCompleted", () => {

    let component: MatrixUrlRequestCompletedComponent;
    let fixture: ComponentFixture<MatrixUrlRequestCompletedComponent>;
    let matrixService: MatrixService;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    // Class names
    const CLASSNAME_ERROR_MESSAGE = ".error-message";
    const CLASSNAME_FILE_NAME = ".file-name";

    // Component input property
    const COMPONENT_INPUT_PROPERTY_COPY_TO_CLIPBOARD_LINK = "copyToClipboardLink";

    // Component name
    const COMPONENT_NAME_COPY_TO_CLIPBOARD = "copy-to-clipboard";

    // Text values
    const SPECIES_HOMO = "Homo sapiens";
    const SPECIES_MUS = "Mus musdisplays no species label when multiple matrix url requests are completed but only one request has datculus";
    const URL_DATA = "https://test.com";
    const URL_DATA_NULL = "";

    const COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED = {
        eta: "",
        matrixUrl: URL_DATA,
        message: "Completed and successful",
        requestId: "ea14b8fc-e567-4215-9625-2e4325c04ad3",
        species: SPECIES_HOMO,
        status: MatrixUrlRequestStatus.COMPLETED
    };
    const COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED_NULL_DATA = {
        eta: "",
        matrixUrl: URL_DATA_NULL,
        message: "Completed and successful",
        requestId: "ea14b8fc-e567-4215-9625-2e4325c04ad3",
        species: SPECIES_HOMO,
        status: MatrixUrlRequestStatus.COMPLETED
    };
    const COMPONENT_INPUT_MATRIX_URL_REQUEST_FAILED = {
        eta: "",
        matrixUrl: "",
        message: "Failed",
        requestId: "ea14b8fc-e567-4215-9625-2e4325c04ad3",
        species: SPECIES_MUS,
        status: MatrixUrlRequestStatus.FAILED
    };

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent,
                DisplayDataLinkComponent,
                HCAGetDataPanelComponent,
                MatrixUrlRequestCompletedComponent
            ],
            imports: [
                ClipboardModule,
                MatIconModule,
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
                    provide: GTMService,
                    useValue: jasmine.createSpyObj("GTMService", [
                        "trackEvent"
                    ])
                }, {
                    provide: FileManifestService,
                    useValue: jasmine.createSpyObj("FileManifestService", [
                        "requestMatrixFileManifestUrl"
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

        fixture = TestBed.createComponent(MatrixUrlRequestCompletedComponent);
        component = fixture.componentInstance;
        matrixService = fixture.debugElement.injector.get(MatrixService);
    }));

    /**
     * Smoke test.
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm getMatrixDownloadFileName returns the file name.
     */
    it("calculates the matrix download file name from URL specified in the completed request", () => {

        const fileName = component.getMatrixDownloadFileName(COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED);

        expect(fileName).toEqual("test.com");
    });

    /**
     * Confirm getMatrixLink returns the matrix url
     */
    it("returns the matrix URL as specified in the completed request", () => {

        const matrixUrl = component.getMatrixLink(COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED);

        expect(matrixUrl).toEqual(COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED.matrixUrl);
    });

    /**
     * Confirm isMatrixUrlRequestCompleted returns true when matrix request is "COMPLETED".
     */
    it("identifies a completed request as a completed requested", () => {

        const isRequestCompleted = component.isMatrixUrlRequestCompleted(COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED);

        expect(isRequestCompleted).toEqual(true);
    });

    /**
     * Confirm isMatrixUrlRequestCompleted returns false when matrix request is not "COMPLETED".
     */
    it("identifies a request that hasn't completed as a request that hasn't completed", () => {

        const isRequestCompleted = component.isMatrixUrlRequestCompleted(COMPONENT_INPUT_MATRIX_URL_REQUEST_FAILED);

        expect(isRequestCompleted).toEqual(false);
    });

    /**
     * Confirm method is matrix url request failed returns true when matrix request is "FAILED".
     */
    it("identifies a failed request as a request that has failed", () => {

        const isRequestFailed = component.isMatrixUrlRequestFailed(COMPONENT_INPUT_MATRIX_URL_REQUEST_FAILED);

        expect(isRequestFailed).toEqual(true);
    });

    /**
     * Confirm method is matrix url request failed returns false when matrix request is not "FAILED".
     */
    it("identifies a request that hasn't failed as a request that hasn't failed", () => {

        const isRequestFailed = component.isMatrixUrlRequestFailed(COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED);

        expect(isRequestFailed).toEqual(false);
    });

    /**
     * Confirm error message is displayed when matrix request is "FAILED".
     */
    it(`displays error message when matrix request has failed`, () => {

        component.matrixUrlRequest = COMPONENT_INPUT_MATRIX_URL_REQUEST_FAILED;
        fixture.detectChanges();

        // Confirm message is displayed
        expect(getTextByClassQuery(CLASSNAME_ERROR_MESSAGE)).toBe(COMPONENT_INPUT_MATRIX_URL_REQUEST_FAILED.message);
    });

    /**
     * Confirm error message is not displayed when matrix request is "COMPLETED".
     */
    it(`hides error message when matrix request is completed successfully`, () => {

        component.matrixUrlRequest = COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED;
        fixture.detectChanges();

        // Confirm message is not displayed
        expect(getTextByClassQuery(CLASSNAME_ERROR_MESSAGE)).toBeUndefined();
    });

    /**
     * Confirm file name is displayed when matrix request is "COMPLETED".
     */
    it(`displays file name when matrix request is completed successfully`, () => {

        component.matrixUrlRequest = COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED;
        fixture.detectChanges();

        // Confirm label is not displayed
        expect(getTextByClassQuery(CLASSNAME_FILE_NAME)).toBe(component.getMatrixDownloadFileName(COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED));
    });

    /**
     * Confirm file name is not displayed when matrix request is "FAILED".
     */
    it(`hides file name when matrix request has failed"`, () => {

        component.matrixUrlRequest = COMPONENT_INPUT_MATRIX_URL_REQUEST_FAILED;
        fixture.detectChanges();

        // Confirm file name is not displayed
        expect(getTextByClassQuery(CLASSNAME_FILE_NAME)).toBeUndefined();
    });

    /**
     * Confirm component <copy-to-clipboard> is displayed when matrix request is "COMPLETED".
     */
    it(`displays component copy to clipboard when matrix request completed successfully"`, () => {

        component.matrixUrlRequest = COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED;
        fixture.detectChanges();

        // Confirm component is displayed
        expect(getComponentElement(COMPONENT_NAME_COPY_TO_CLIPBOARD)).not.toBe(null);
    });

    /**
     * Confirm component <copy-to-clipboard> is not displayed when matrix request is "FAILED".
     */
    it(`hides copy to clipboard when matrix request has failed`, () => {

        component.matrixUrlRequest = COMPONENT_INPUT_MATRIX_URL_REQUEST_FAILED;
        fixture.detectChanges();

        // Confirm component is not displayed
        expect(getComponentElement(COMPONENT_NAME_COPY_TO_CLIPBOARD)).toBe(null);
    });

    /**
     * Confirm component <copy-to-clipboard> is with input property "copyToClipboardLink" is matrix link when matrix request is "COMPLETED".
     */
    it(`displays component hca get data panel with the matrix link as the input property "copyToClipboardLink" when matrix request successfully completed`, () => {

        component.matrixUrlRequest = COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED;
        fixture.detectChanges();

        // Confirm input property value
        expect(getComponentInputValue(COMPONENT_NAME_COPY_TO_CLIPBOARD, COMPONENT_INPUT_PROPERTY_COPY_TO_CLIPBOARD_LINK)).toEqual(component.getMatrixLink(COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED));
    });

    /**
     * Returns element specified by component name.
     *
     * @param {string} componentName
     * @returns {Element}
     */
    function getComponentElement(componentName: string): Element {

        return fixture.debugElement.nativeElement.querySelector(componentName);
    }

    /**
     * Returns the input property of a component when specified by class name and input property.
     *
     * @param {string} className
     * @param {string} inputProperty
     * @returns {any}
     */
    function getComponentInputValue(className: string, inputProperty: string): any {

        const componentDE = fixture.debugElement.query(By.css(className));

        if ( !componentDE ) {
            return;
        }

        return componentDE.componentInstance[inputProperty];
    }

    /**
     * Returns debug element inner html specified by class name.
     *
     * @param {string} className
     * @returns {string}
     */
    function getTextByClassQuery(className: string): any {

        const label = fixture.debugElement.query(By.css(className));

        if ( !label ) {
            return;
        }

        return label.nativeElement.innerHTML;
    }
});
