/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing HCA matrix URL request form.
 */

// Core dependencies
import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatRadioModule } from "@angular/material/radio";
import { By } from "@angular/platform-browser";
import { ClipboardModule } from "ngx-clipboard";

// App components
import { WarningComponent } from "../../../shared/warning/warning.component";
import { WarningContentComponent } from "../../../shared/warning/warning-content.component";
import { WarningTitleComponent } from "../../../shared/warning/warning-title.component";
import { MatrixFormat } from "../../shared/matrix-format.model";
import { CopyToClipboardComponent } from "../copy-to-clipboard/copy-to-clipboard.component";
import { HCAGetDataPanelComponent } from "../hca-get-data-panel/hca-get-data-panel.component";
import { MatrixPartialQueryMatchWarningComponent } from "../matrix-partial-query-match-warning/matrix-partial-query-match-warning.component";
import { MatrixUrlRequestFormComponent } from "./matrix-url-request-form.component";

describe("MatrixUrlRequestForm", () => {

    let component: MatrixUrlRequestFormComponent;
    let fixture: ComponentFixture<MatrixUrlRequestFormComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent,
                HCAGetDataPanelComponent,
                MatrixPartialQueryMatchWarningComponent,
                MatrixUrlRequestFormComponent,
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
            providers: []
        }).compileComponents();

        fixture = TestBed.createComponent(MatrixUrlRequestFormComponent);
        component = fixture.componentInstance;
    }));

    // Class names
    const CLASSNAME_FONTSIZE_M = "p.fontsize-m";

    // Component input properties
    const COMPONENT_INPUT_PROPERTY_LOADING = "loading";

    // Component input property values
    const COMPONENT_INPUT_PROPERTY_VALUE_FILE_FORMATS = ["csv", "loom", "mtx"];
    const COMPONENT_INPUT_PROPERTY_VALUE_FILE_FORMATS_EMPTY = [];

    // Component names
    const COMPONENT_NAME_HCA_GET_DATA_PANEL = "hca-get-data-panel";
    const COMPONENT_NAME_MAT_RADIO_BUTTON = "mat-radio-button";
    const COMPONENT_NAME_MAT_RADIO_GROUP = "mat-radio-group";
    const COMPONENT_NAME_MATRIX_PARTIAL_QUERY_MATCH_WARNING = "matrix-partial-query-match-warning";

    // Test values
    const PARAGRAPH_REQUEST_MATRIX = "Request an expression matrix for the selected data from the HCA Matrix service.";
    const PARAGRAPH_TO_BEING = "To begin, choose one of the output file formats below.";

    /**
     * Smoke test.
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm method on matrix url requested emit file format.
     */
    it("should on matrix url requested emit file format", () => {

        spyOn(component.matrixUrlRequested, "emit");
        component.onMatrixUrlRequested(MatrixFormat.loom);

        expect(component.matrixUrlRequested.emit).toHaveBeenCalledWith(MatrixFormat.loom);
    });

    /**
     * Confirm component <hca-get-data-panel> is displayed with input value "loading" is true when matrix partial query match completed is false.
     */
    it(`should display component hca get data panel with input value "loading" is true when matrix partial query match completed is false`, () => {

        component.matrixPartialQueryMatchCompleted = false;
        fixture.detectChanges();

        // Confirm input value is true
        expect(getComponentInputPropertyValue(getDebugElement(COMPONENT_NAME_HCA_GET_DATA_PANEL), COMPONENT_INPUT_PROPERTY_LOADING)).toEqual(true);
    });

    /**
     * Confirm component <hca-get-data-panel> is displayed with input value "loading" is false when matrix partial query match completed is true.
     */
    it(`should display component hca get data panel with input value "loading" is true when matrix partial query match completed is false`, () => {

        component.matrixPartialQueryMatchCompleted = true;
        fixture.detectChanges();

        // Confirm input value is false
        expect(getComponentInputPropertyValue(getDebugElement(COMPONENT_NAME_HCA_GET_DATA_PANEL), COMPONENT_INPUT_PROPERTY_LOADING)).toEqual(false);
    });

    /**
     * Confirm component <matrix-partial-query-match-warning> is not displayed when matrix partial query match is false.
     */
    it("should not display component matrix partial query match warning when matrix partial query match is false", () => {

        component.matrixPartialQueryMatchCompleted = true;
        component.matrixPartialQueryMatch = false;
        fixture.detectChanges();

        // Confirm component is not displayed
        expect(getComponentElement(COMPONENT_NAME_MATRIX_PARTIAL_QUERY_MATCH_WARNING)).toBe(null);
    });

    /**
     * Confirm component <matrix-partial-query-match-warning> is displayed when matrix partial query match is true.
     */
    it("should display component matrix partial query match warning when matrix partial query match is true", () => {

        component.matrixPartialQueryMatchCompleted = true;
        component.matrixPartialQueryMatch = true;
        fixture.detectChanges();

        // Confirm component is displayed
        expect(getComponentElement(COMPONENT_NAME_MATRIX_PARTIAL_QUERY_MATCH_WARNING)).not.toBe(null);
    });

    /**
     * Confirm paragraph "Request an expression matrix for the selected data from the HCA Matrix service." is displayed when matrix partial query match completed is true.
     */
    it(`should display paragraph "Request an expression matrix for the selected data from the HCA Matrix service." when matrix partial query match completed is true`, () => {

        component.matrixPartialQueryMatchCompleted = true;
        fixture.detectChanges();

        // Confirm paragraph is displayed
        expect(isTextDisplayed(CLASSNAME_FONTSIZE_M, PARAGRAPH_REQUEST_MATRIX)).toEqual(true);
    });

    /**
     * Confirm paragraph "Request an expression matrix for the selected data from the HCA Matrix service." is not displayed when matrix partial query match completed is false.
     */
    it(`should not display paragraph "Request an expression matrix for the selected data from the HCA Matrix service." when matrix partial query match completed is false`, () => {

        component.matrixPartialQueryMatchCompleted = false;
        fixture.detectChanges();

        // Confirm paragraph is not displayed
        expect(isTextDisplayed(CLASSNAME_FONTSIZE_M, PARAGRAPH_REQUEST_MATRIX)).toEqual(false);
    });

    /**
     * Confirm paragraph "To begin, choose one of the output file formats below." is displayed when matrix partial query match completed is true.
     */
    it(`should display paragraph "To begin, choose one of the output file formats below." when matrix partial query match completed is true`, () => {

        component.matrixPartialQueryMatchCompleted = true;
        fixture.detectChanges();

        // Confirm paragraph is displayed
        expect(isTextDisplayed(CLASSNAME_FONTSIZE_M, PARAGRAPH_TO_BEING)).toEqual(true);
    });

    /**
     * Confirm paragraph "To begin, choose one of the output file formats below." is not displayed when matrix partial query match completed is false.
     */
    it(`should not display paragraph "To begin, choose one of the output file formats below." when matrix partial query match completed is false`, () => {

        component.matrixPartialQueryMatchCompleted = false;
        fixture.detectChanges();

        // Confirm paragraph is not displayed
        expect(isTextDisplayed(CLASSNAME_FONTSIZE_M, PARAGRAPH_TO_BEING)).toEqual(false);
    });

    /**
     * Confirm component <mat-radio-group> is displayed when matrix partial query match completed is true.
     */
    it("should display component mat radio group when matrix partial query match completed is true", () => {

        component.matrixPartialQueryMatchCompleted = true;
        fixture.detectChanges();

        // Confirm component is displayed
        expect(getComponentElement(COMPONENT_NAME_MAT_RADIO_GROUP)).not.toBe(null);
    });

    /**
     * Confirm component <mat-radio-group> is not displayed when matrix partial query match completed is false.
     */
    it("should not display component mat radio group when matrix partial query match completed is false", () => {

        component.matrixPartialQueryMatchCompleted = false;
        fixture.detectChanges();

        // Confirm component is not displayed
        expect(getComponentElement(COMPONENT_NAME_MAT_RADIO_GROUP)).toBe(null);
    });

    /**
     * Confirm component <mat-radio-button> is not displayed when file formats is empty
     */
    it("should not display component mat radio button when file formats is empty", () => {

        component.matrixPartialQueryMatchCompleted = true;
        component.fileFormats = COMPONENT_INPUT_PROPERTY_VALUE_FILE_FORMATS_EMPTY;
        fixture.detectChanges();

        // Confirm component is not displayed
        expect(getComponentElement(COMPONENT_NAME_MAT_RADIO_BUTTON)).toBe(null);
    });

    /**
     * Confirm component <mat-radio-button> is displayed when file formats is defined.
     */
    it("should display component mat radio button when file formats is defined", () => {

        component.matrixPartialQueryMatchCompleted = true;
        component.fileFormats = COMPONENT_INPUT_PROPERTY_VALUE_FILE_FORMATS;
        fixture.detectChanges();

        // Confirm component is displayed
        expect(getComponentElement(COMPONENT_NAME_MAT_RADIO_BUTTON)).not.toBe(null);
    });

    /**
     * Confirm component <mat-radio-button> is displayed three times, once for each file format.
     */
    it(`should display component mat radio button three times, once for each file format`, () => {

        component.matrixPartialQueryMatchCompleted = true;
        component.fileFormats = COMPONENT_INPUT_PROPERTY_VALUE_FILE_FORMATS;
        fixture.detectChanges();

        // Confirm component is displayed for each file format
        expect(getComponentsDisplayed(COMPONENT_NAME_MAT_RADIO_BUTTON).length).toEqual(3);
    });

    /**
     * Confirm method on matrix url requested is called on click of button.
     */
    it("should call method on matrix url requested on click of button", () => {

        component.matrixPartialQueryMatchCompleted = true;
        component.fileFormats = COMPONENT_INPUT_PROPERTY_VALUE_FILE_FORMATS;
        fixture.detectChanges();

        const onMatrixUrlRequested = spyOn(component, "onMatrixUrlRequested");
        const requestMatrixButton = fixture.debugElement.query(By.css("button"));

        // Execute click on request manifest
        requestMatrixButton.triggerEventHandler("click", null);

        expect(onMatrixUrlRequested).toHaveBeenCalled();
    });

    /**
     * Returns all debug element displayed for the specified name.
     *
     * @param {string} name
     * @returns {DebugElement[]}
     */
    function getComponentsDisplayed(name: string): DebugElement[] {

        return fixture.debugElement.queryAll(By.css(name));
    }

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
     * Returns the input property value of a debug element.
     *
     * @param {DebugElement} debugElement
     * @param {string} inputProperty
     * @returns {any}
     */
    function getComponentInputPropertyValue(debugElement: DebugElement, inputProperty: string): any {

        return debugElement.componentInstance[inputProperty];
    }

    /**
     * Returns debug element specified by class name.
     *
     * @param {string} className
     * @returns {DebugElement}
     */
    function getDebugElement(className: string): DebugElement {

        return fixture.debugElement.query(By.css(className));
    }

    /**
     * Returns debug elements specified by class name.
     *
     * @param {string} className
     * @returns {DebugElement[]}
     */
    function getDebugElements(className: string): DebugElement[] {

        return fixture.debugElement.queryAll(By.css(className));
    }

    /**
     * Returns true if any debug element's innerHTML matches the specified text.
     *
     * @param className
     * @param {string} text
     * @returns {boolean}
     */
    function isTextDisplayed(className, text: string): boolean {

        const textDEs = getDebugElements(className);

        if ( !textDEs ) {

            return;
        }

        return textDEs.some(textDE => textDE.nativeElement.innerHTML === text);
    }
});
