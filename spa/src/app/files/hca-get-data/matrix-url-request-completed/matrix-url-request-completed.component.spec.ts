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
import { FileManifestService } from "../../shared/file-manifest.service";
import { MatrixService } from "../../shared/matrix.service";
import { MatrixUrlRequestStatus } from "../../shared/matrix-url-request-status.model";
import { CopyToClipboardComponent } from "../copy-to-clipboard/copy-to-clipboard.component";
import { HCAGetDataPanelComponent } from "../hca-get-data-panel/hca-get-data-panel.component";
import { MatrixUrlRequestCompletedComponent } from "./matrix-url-request-completed.component";

describe("MatrixUrlRequestCompleted", () => {

    let component: MatrixUrlRequestCompletedComponent;
    let fixture: ComponentFixture<MatrixUrlRequestCompletedComponent>;
    let matrixService: MatrixService;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    const COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED = {
        eta: "",
        matrixUrl: "https://matrixUrl.com",
        message: "Completed and successful",
        requestId: "ea14b8fc-e567-4215-9625-2e4325c04ad3",
        species: "Homo sapiens",
        status: MatrixUrlRequestStatus.COMPLETED
    };
    const COMPONENT_INPUT_MATRIX_URL_REQUEST_FAILED = {
        eta: "",
        matrixUrl: "https://matrixUrl.com",
        message: "Failed",
        requestId: "ea14b8fc-e567-4215-9625-2e4325c04ad3",
        species: "Homo sapiens",
        status: MatrixUrlRequestStatus.FAILED
    };

    const CLASSNAME_ERROR_MESSAGE = ".error-message";
    const CLASSNAME_HCA_GET_DATA_PANEL_H4 = "hca-get-data-panel h4";
    const CLASSNAME_FILE_NAME = ".file-name";

    const COMPONENT_INPUT_VALUE_COPY_TO_CLIPBOARD_LINK = "copyToClipboardLink";

    const COMPONENT_NAME_COPY_TO_CLIPBOARD = "copy-to-clipboard";

    const LABEL_COMPLETED = ": Your expression matrix is ready.";
    const LABEL_FAILED = ": Error";

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                MatrixUrlRequestCompletedComponent,
                CopyToClipboardComponent,
                HCAGetDataPanelComponent
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
                    provide: FileManifestService,
                    useValue: jasmine.createSpyObj("FileManifestService", [
                        "requestMatrixFileManifestUrl"
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
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm method get matrix download file name returns the file name
     */
    it("should get matrix download file name returns the file name", () => {

        const fileName = component.getMatrixDownloadFileName(COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED);

        expect(fileName).toEqual("matrixUrl.com");
    });

    /**
     * Confirm method get matrix link return the matrix url
     */
    it("should get matrix link return the matrix url", () => {

        const matrixUrl = component.getMatrixLink(COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED);

        expect(matrixUrl).toEqual(COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED.matrixUrl);
    });

    /**
     * Confirm method is matrix url request completed returns true when matrix request is "COMPLETED"
     */
    it(`should is matrix url request completed returns true when matrix request is "COMPLETED"`, () => {

        const isRequestCompleted = component.isMatrixUrlRequestCompleted(COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED);

        expect(isRequestCompleted).toEqual(true);
    });

    /**
     * Confirm method is matrix url request completed returns false when matrix request is not "COMPLETED"
     */
    it(`should is matrix url request completed returns false when matrix request is not "COMPLETED"`, () => {

        const isRequestCompleted = component.isMatrixUrlRequestCompleted(COMPONENT_INPUT_MATRIX_URL_REQUEST_FAILED);

        expect(isRequestCompleted).toEqual(false);
    });

    /**
     * Confirm method is matrix url request failed returns true when matrix request is "FAILED"
     */
    it(`should is matrix url request completed returns true when matrix request is "FAILED"`, () => {

        const isRequestFailed = component.isMatrixUrlRequestFailed(COMPONENT_INPUT_MATRIX_URL_REQUEST_FAILED);

        expect(isRequestFailed).toEqual(true);
    });

    /**
     * Confirm method is matrix url request failed returns false when matrix request is not "FAILED"
     */
    it(`should is matrix url request completed returns false when matrix request is not "FAILED"`, () => {

        const isRequestFailed = component.isMatrixUrlRequestFailed(COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED);

        expect(isRequestFailed).toEqual(false);
    });

    /**
     * Confirm label "Homo sapiens: Error" is displayed when matrix request is "FAILED"
     */
    it(`should display "Homo sapiens: Error" when matrix request is "FAILED"`, () => {

        component.matrixUrlRequest = COMPONENT_INPUT_MATRIX_URL_REQUEST_FAILED;
        fixture.detectChanges();

        // Confirm label is displayed
        expect(getTextByClassQuery(CLASSNAME_HCA_GET_DATA_PANEL_H4)).toBe(COMPONENT_INPUT_MATRIX_URL_REQUEST_FAILED.species + LABEL_FAILED);
    });

    /**
     * Confirm message "Failed" is displayed when matrix request is "FAILED"
     */
    it(`should display message "Failed" when matrix request is "FAILED"`, () => {

        component.matrixUrlRequest = COMPONENT_INPUT_MATRIX_URL_REQUEST_FAILED;
        fixture.detectChanges();

        // Confirm label is displayed
        expect(getTextByClassQuery(CLASSNAME_ERROR_MESSAGE)).toBe(COMPONENT_INPUT_MATRIX_URL_REQUEST_FAILED.message);
    });

    /**
     * Confirm label "Homo sapiens: Your expression matrix is ready." is not displayed when matrix request is "FAILED"
     */
    it(`should not display "Homo sapiens: Your expression matrix is ready." when matrix request is "FAILED"`, () => {

        component.matrixUrlRequest = COMPONENT_INPUT_MATRIX_URL_REQUEST_FAILED;
        fixture.detectChanges();

        // Confirm label is not displayed
        expect(getTextByClassQuery(CLASSNAME_HCA_GET_DATA_PANEL_H4)).not.toBe(COMPONENT_INPUT_MATRIX_URL_REQUEST_FAILED.species + LABEL_COMPLETED);
    });

    /**
     * Confirm component <copy-to-clipboard> is not displayed when matrix request is "FAILED"
     */
    it(`should not display component copy to clipboard when matrix request is "FAILED"`, () => {

        component.matrixUrlRequest = COMPONENT_INPUT_MATRIX_URL_REQUEST_FAILED;
        fixture.detectChanges();

        // Confirm component is not displayed
        expect(getComponentElement(COMPONENT_NAME_COPY_TO_CLIPBOARD)).toBe(null);
    });

    /**
     * Confirm label "Homo sapiens: Error" is not displayed when matrix request is "COMPLETED"
     */
    it(`should not display "Homo sapiens: Error" when matrix request is "COMPLETED"`, () => {

        component.matrixUrlRequest = COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED;
        fixture.detectChanges();

        // Confirm label is not displayed
        expect(getTextByClassQuery(CLASSNAME_HCA_GET_DATA_PANEL_H4)).not.toBe(COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED.species + LABEL_FAILED);
    });

    /**
     * Confirm label "Homo sapiens: Your expression matrix is ready." is displayed when matrix request is "COMPLETED"
     */
    it(`should display "Homo sapiens: Your expression matrix is ready." when matrix request is "COMPLETED"`, () => {

        component.matrixUrlRequest = COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED;
        fixture.detectChanges();

        // Confirm label is not displayed
        expect(getTextByClassQuery(CLASSNAME_HCA_GET_DATA_PANEL_H4)).toBe(COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED.species + LABEL_COMPLETED);
    });

    /**
     * Confirm file name is displayed when matrix request is "COMPLETED"
     */
    it(`should display file name when matrix request is "COMPLETED"`, () => {

        component.matrixUrlRequest = COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED;
        fixture.detectChanges();

        // Confirm label is not displayed
        expect(getTextByClassQuery(CLASSNAME_FILE_NAME)).toBe(component.getMatrixDownloadFileName(COMPONENT_INPUT_MATRIX_URL_REQUEST_FAILED));
    });

    /**
     * Confirm component <copy-to-clipboard> is displayed when matrix request is "COMPLETED"
     */
    it(`should display component copy to clipboard when matrix request is "COMPLETED"`, () => {

        component.matrixUrlRequest = COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED;
        fixture.detectChanges();

        // Confirm component is displayed
        expect(getComponentElement(COMPONENT_NAME_COPY_TO_CLIPBOARD)).not.toBe(null);
    });

    /**
     * Confirm component <copy-to-clipboard> is with input value "copyToClipboardLink" is matrix link when matrix request is "COMPLETED"
     */
    it(`should display component hca get data panel with input value "copyToClipboardLink" is matrix link when matrix request is "COMPLETED"`, () => {

        component.matrixUrlRequest = COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED;
        fixture.detectChanges();

        // Confirm input value
        expect(getComponentInputValue(COMPONENT_NAME_COPY_TO_CLIPBOARD, COMPONENT_INPUT_VALUE_COPY_TO_CLIPBOARD_LINK)).toEqual(component.getMatrixLink(COMPONENT_INPUT_MATRIX_URL_REQUEST_COMPLETED));
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
     * Returns the input value of a component when specified by component and input name.
     *
     * @param {string} componentName
     * @param {string} inputName
     * @returns {any}
     */
    function getComponentInputValue(componentName: string, inputName: string): any {

        const componentDE = fixture.debugElement.query(By.css(componentName));

        if ( !componentDE ) {
            return;
        }

        return componentDE.componentInstance[inputName];
    }

    /**
     * Returns debug element inner html text value specified by class name.
     * @param {string} className
     * @returns {string}
     */
    function getTextByClassQuery(className: string): string {

        const label = fixture.debugElement.query(By.css(className));

        if ( !label ) {
            return;
        }

        return label.nativeElement.innerHTML;
    }
});
