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

    const COMPONENT_INPUT_NAME = "loading";

    const COMPONENT_INPUT_VALUE_FILE_FORMATS = ["csv", "loom", "mtx"];
    const COMPONENT_INPUT_VALUE_FILE_FORMATS_EMPTY = [];

    const COMPONENT_NAME_HCA_GET_DATA_PANEL = "hca-get-data-panel";
    const COMPONENT_NAME_MAT_RADIO_BUTTON = "mat-radio-button";
    const COMPONENT_NAME_MAT_RADIO_GROUP = "mat-radio-group";
    const COMPONENT_NAME_MATRIX_PARTIAL_QUERY_MATCH_WARNING = "matrix-partial-query-match-warning";

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm method on matrix url requested emit file format
     */
    it("should on matrix url requested emit file format", () => {

        spyOn(component.matrixUrlRequested, "emit");
        component.onMatrixUrlRequested(MatrixFormat.loom);

        expect(component.matrixUrlRequested.emit).toHaveBeenCalledWith(MatrixFormat.loom);
    });

    /**
     * Confirm component <mat-radio-group> is displayed when matrix partial query match completed is true
     */
    it("should display component mat radio group when matrix partial query match completed is true", () => {

        component.matrixPartialQueryMatchCompleted = true;
        fixture.detectChanges();

        // Confirm component is displayed
        expect(getComponentElement(COMPONENT_NAME_MAT_RADIO_GROUP)).not.toBe(null);
    });

    /**
     * Confirm component <mat-radio-group> is not displayed when matrix partial query match completed is false
     */
    it("should not display component mat radio group when matrix partial query match completed is false", () => {

        component.matrixPartialQueryMatchCompleted = false;
        fixture.detectChanges();

        // Confirm component is not displayed
        expect(getComponentElement(COMPONENT_NAME_MAT_RADIO_GROUP)).toBe(null);
    });

    /**
     * Confirm component <hca-get-data-panel> is displayed with input value "loading" is true when matrix partial query match completed is false
     */
    it(`should display component hca get data panel with input value "loading" is true when matrix partial query match completed is false`, () => {

        component.matrixPartialQueryMatchCompleted = false;
        fixture.detectChanges();

        // Confirm input value is true
        expect(getComponentInputValue(getDebugElement(COMPONENT_NAME_HCA_GET_DATA_PANEL), COMPONENT_INPUT_NAME)).toEqual(true);
    });

    /**
     * Confirm component <matrix-partial-query-match-warning> is not displayed when matrix partial query match is false
     */
    it("should not display component matrix partial query match warning when matrix partial query match is false", () => {

        component.matrixPartialQueryMatchCompleted = true;
        component.matrixPartialQueryMatch = false;
        fixture.detectChanges();

        // Confirm component is not displayed
        expect(getComponentElement(COMPONENT_NAME_MATRIX_PARTIAL_QUERY_MATCH_WARNING)).toBe(null);
    });

    /**
     * Confirm component <matrix-partial-query-match-warning> is displayed when matrix partial query match is true
     */
    it("should display component matrix partial query match warning when matrix partial query match is true", () => {

        component.matrixPartialQueryMatchCompleted = true;
        component.matrixPartialQueryMatch = true;
        fixture.detectChanges();

        // Confirm component is displayed
        expect(getComponentElement(COMPONENT_NAME_MATRIX_PARTIAL_QUERY_MATCH_WARNING)).not.toBe(null);
    });

    /**
     * Confirm component <mat-radio-button> is not displayed when file formats is empty
     */
    it("should not display component mat radio button when file formats is empty", () => {

        component.matrixPartialQueryMatchCompleted = true;
        component.fileFormats = COMPONENT_INPUT_VALUE_FILE_FORMATS_EMPTY;
        fixture.detectChanges();

        // Confirm component is not displayed
        expect(getComponentElement(COMPONENT_NAME_MAT_RADIO_BUTTON)).toBe(null);
    });

    /**
     * Confirm component <mat-radio-button> is displayed when file formats is defined
     */
    it("should display component mat radio button when file formats is defined", () => {

        component.matrixPartialQueryMatchCompleted = true;
        component.fileFormats = COMPONENT_INPUT_VALUE_FILE_FORMATS;
        fixture.detectChanges();

        // Confirm component is displayed
        expect(getComponentElement(COMPONENT_NAME_MAT_RADIO_BUTTON)).not.toBe(null);
    });

    /**
     * Confirm component <mat-radio-button> is displayed three times, once for each file format
     */
    it(`should display component mat radio button three times, once for each file format`, () => {

        component.matrixPartialQueryMatchCompleted = true;
        component.fileFormats = COMPONENT_INPUT_VALUE_FILE_FORMATS;
        fixture.detectChanges();

        // Confirm component is displayed for each file format
        expect(getComponentsDisplayed(COMPONENT_NAME_MAT_RADIO_BUTTON).length).toEqual(3);
    });

    /**
     * Confirm method on matrix url requested is called on click of button.
     */
    it("should call method on matrix url requested on click of button", () => {

        component.matrixPartialQueryMatchCompleted = true;
        component.fileFormats = COMPONENT_INPUT_VALUE_FILE_FORMATS;
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
     * Returns the input value of a debug element [component].
     *
     * @param {DebugElement} debugElement
     * @param {string} inputName
     * @returns {any}
     */
    function getComponentInputValue(debugElement: DebugElement, inputName: string): any {

        return debugElement.componentInstance[inputName];
    }

    /**
     * Returns debug element specified by name.
     *
     * @param {string} name
     * @returns {DebugElement}
     */
    function getDebugElement(name: string): DebugElement {

        return fixture.debugElement.query(By.css(name));
    }
});
