/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for ProjectPreparedMatrixDownloads.
 */

// Core dependencies
import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule } from "@angular/material";
import { By } from "@angular/platform-browser";
import { ClipboardModule } from "ngx-clipboard";

// App dependencies
import { CopyToClipboardComponent } from "../hca-get-data/copy-to-clipboard/copy-to-clipboard.component";
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";
import { ProjectPreparedMatrixDownloadsComponent } from "./project-prepared-matrix-downloads.component";

describe("ProjectPreparedMatrixDownloadsComponent", () => {

    let component: ProjectPreparedMatrixDownloadsComponent;
    let fixture: ComponentFixture<ProjectPreparedMatrixDownloadsComponent>;

    // Download matrix file type order by index
    const INDEX_MTX = 0;
    const INDEX_CSV = 1;
    const INDEX_LOOM = 2;

    // Download matrix file label
    const LABEL_MTX = "mtx";
    const LABEL_CSV = "csv";
    const LABEL_LOOM = "loom";

    // Example of project matrix urls with single values
    const PROJECT_MATRIX_URLS_SINGLE_VALUES = new ProjectMatrixUrls("4a95101c-9ffc-4f30-a809-f04518a23803", "https://data.humancellatlas.org/project-assets/project-matrices/4a95101c-9ffc-4f30-a809-f04518a23803.csv.zip", "https://data.humancellatlas.org/project-assets/project-matrices/4a95101c-9ffc-4f30-a809-f04518a23803.loom", "https://data.humancellatlas.org/project-assets/project-matrices/4a95101c-9ffc-4f30-a809-f04518a23803.mtx.zip");

    // Example of project matrix urls with null values
    const PROJECT_MATRIX_URLS_EMPTY_VALUES = new ProjectMatrixUrls("4a95101c-9ffc-4f30-a809-f04518a23803", "", "", "");

    // Example of project matrix urls with null values
    const PROJECT_MATRIX_URLS_NULL_VALUES = new ProjectMatrixUrls("4a95101c-9ffc-4f30-a809-f04518a23803", null, null, null);


    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent,
                ProjectPreparedMatrixDownloadsComponent
            ],
            imports: [
                ClipboardModule,
                MatIconModule
            ],
            providers: []
        }).compileComponents();

        fixture = TestBed.createComponent(ProjectPreparedMatrixDownloadsComponent);
        component = fixture.componentInstance;

        // spyOn method ngAfterViewInit and ngAfterViewChecked
        spyOn(component, "ngAfterViewInit");
        spyOn(component, "ngAfterViewChecked");
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Incomplete test
     */
    xit("TBD", () => {

        // TODO - pending test
        // TODO - methods, host listener and lifecycle hooks
    });

    /**
     * Confirm "mtx" is displayed when project matrix mtx is available.
     */
    it(`should display "mtx" when project matrix mtx is available`, () => {

        component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_VALUES;

        fixture.detectChanges();

        // Confirm label is displayed
        expect(isMatrixLabelDisplayed(LABEL_MTX)).toEqual(true);
    });

    /**
     * Confirm "mtx" is not displayed when project matrix mtx is not available.
     */
    it(`should not display "mtx" when project matrix mtx is not available`, () => {

        component.projectURLs = PROJECT_MATRIX_URLS_EMPTY_VALUES;

        fixture.detectChanges();

        // Confirm label is not displayed
        expect(isMatrixLabelDisplayed(LABEL_MTX)).toEqual(false);
    });

    /**
     * Confirm matrix mtx link is added to href attribute.
     */
    it("should add mtx link to href", () => {

        // Set up initial component state
        component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_VALUES;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm link is added to href attribute
        expect(getMatrixLinkHrefAttribute(INDEX_MTX)).toEqual(component.projectURLs.mtxUrl);
    });

    /**
     * Confirm <copy-to-clipboard> is displayed when project matrix mtx is available.
     */
    it("should display component copy-to-clipboard when project matrix mtx is available", () => {

        component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_VALUES;

        fixture.detectChanges();

        // Confirm <copy-to-clipboard> is displayed
        expect(getCopyToClipboardElement(INDEX_MTX)).not.toBe(null);
    });

    /**
     * Confirm <copy-to-clipboard> is not displayed when project matrix mtx is empty.
     */
    it("should not display component copy-to-clipboard when project matrix mtx is empty", () => {

        component.projectURLs = PROJECT_MATRIX_URLS_EMPTY_VALUES;

        fixture.detectChanges();

        // Confirm <copy-to-clipboard> is not displayed
        expect(getCopyToClipboardElement(INDEX_MTX)).toBe(null);
    });

    /**
     * Confirm <copy-to-clipboard> is not displayed when project matrix mtx is null.
     */
    it("should not display component copy-to-clipboard when project matrix mtx is null", () => {

        component.projectURLs = PROJECT_MATRIX_URLS_NULL_VALUES;

        fixture.detectChanges();

        // Confirm <copy-to-clipboard> is not displayed
        expect(getCopyToClipboardElement(INDEX_MTX)).toBe(null);
    });

    /**
     * Confirm "csv" is displayed when project matrix csv is available.
     */
    it(`should display "csv" when project matrix csv is available`, () => {

        component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_VALUES;

        fixture.detectChanges();

        // Confirm label is displayed
        expect(isMatrixLabelDisplayed(LABEL_CSV)).toEqual(true);
    });

    /**
     * Confirm "csv" is not displayed when project matrix csv is not available.
     */
    it(`should not display "csv" when project matrix csv is not available`, () => {

        component.projectURLs = PROJECT_MATRIX_URLS_EMPTY_VALUES;

        fixture.detectChanges();

        // Confirm label is not displayed
        expect(isMatrixLabelDisplayed(LABEL_CSV)).toEqual(false);
    });

    /**
     * Confirm matrix csv link is added to href attribute.
     */
    it("should add csv link to href", () => {

        // Set up initial component state
        component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_VALUES;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm link is added to href attribute
        expect(getMatrixLinkHrefAttribute(INDEX_CSV)).toEqual(component.projectURLs.csvUrl);
    });

    /**
     * Confirm <copy-to-clipboard> is displayed when project matrix csv is available.
     */
    it("should display component copy-to-clipboard when project matrix csv is available", () => {

        component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_VALUES;

        fixture.detectChanges();

        // Confirm <copy-to-clipboard> is displayed
        expect(getCopyToClipboardElement(INDEX_CSV)).not.toBe(null);
    });

    /**
     * Confirm <copy-to-clipboard> is not displayed when project matrix csv is empty.
     */
    it("should not display component copy-to-clipboard when project matrix csv is empty", () => {

        component.projectURLs = PROJECT_MATRIX_URLS_EMPTY_VALUES;

        fixture.detectChanges();

        // Confirm <copy-to-clipboard> is not displayed
        expect(getCopyToClipboardElement(INDEX_CSV)).toBe(null);
    });

    /**
     * Confirm <copy-to-clipboard> is not displayed when project matrix csv is null.
     */
    it("should not display component copy-to-clipboard when project matrix csv is null", () => {

        component.projectURLs = PROJECT_MATRIX_URLS_NULL_VALUES;

        fixture.detectChanges();

        // Confirm <copy-to-clipboard> is not displayed
        expect(getCopyToClipboardElement(INDEX_CSV)).toBe(null);
    });

    /**
     * Confirm "loom" is displayed when project matrix loom is available.
     */
    it(`should display "loom" when project matrix loom is available`, () => {

        component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_VALUES;

        fixture.detectChanges();

        // Confirm label is displayed
        expect(isMatrixLabelDisplayed(LABEL_LOOM)).toEqual(true);
    });

    /**
     * Confirm "loom" is not displayed when project matrix loom is not available.
     */
    it(`should not display "loom" when project matrix loom is not available`, () => {

        component.projectURLs = PROJECT_MATRIX_URLS_EMPTY_VALUES;

        fixture.detectChanges();

        // Confirm label is not displayed
        expect(isMatrixLabelDisplayed(LABEL_LOOM)).toEqual(false);
    });

    /**
     * Confirm matrix loom link is added to href attribute.
     */
    it("should add loom link to href", () => {

        // Set up initial component state
        component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_VALUES;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm link is added to href attribute
        expect(getMatrixLinkHrefAttribute(INDEX_LOOM)).toEqual(component.projectURLs.loomUrl);
    });

    /**
     * Confirm <copy-to-clipboard> is displayed when project matrix loom is available.
     */
    it("should display component copy-to-clipboard when project matrix loom is available", () => {

        component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_VALUES;

        fixture.detectChanges();

        // Confirm <copy-to-clipboard> is displayed
        expect(getCopyToClipboardElement(INDEX_LOOM)).not.toBe(null);
    });

    /**
     * Confirm <copy-to-clipboard> is not displayed when project matrix loom is empty.
     */
    it("should not display component copy-to-clipboard when project matrix loom is empty", () => {

        component.projectURLs = PROJECT_MATRIX_URLS_EMPTY_VALUES;

        fixture.detectChanges();

        // Confirm <copy-to-clipboard> is not displayed
        expect(getCopyToClipboardElement(INDEX_LOOM)).toBe(null);
    });

    /**
     * Confirm <copy-to-clipboard> is not displayed when project matrix loom is null.
     */
    it("should not display component copy-to-clipboard when project matrix loom is null", () => {

        component.projectURLs = PROJECT_MATRIX_URLS_NULL_VALUES;

        fixture.detectChanges();

        // Confirm <copy-to-clipboard> is not displayed
        expect(getCopyToClipboardElement(INDEX_LOOM)).toBe(null);
    });

    /**
     * Confirm method click inside card is called on click of mtx download.
     */
    it("should method click inside card is called on click of mtx download", () => {

        component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_VALUES;
        fixture.detectChanges();

        const matrixLinkEl = getMatrixLinkElement(INDEX_MTX);
        matrixLinkEl.addEventListener("click", (event) => {event.preventDefault()});
        const onClickCard = spyOn(component, "onClickCard");

        // Execute click on mtx download
        matrixLinkEl.click();

        expect(onClickCard).toHaveBeenCalled();
    });

    /**
     * Confirm method click inside card is not called on click of close image.
     */
    it("should method click inside card is not called on click of close image", () => {

        component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_VALUES;
        fixture.detectChanges();

        const closeImageDE = getElementByClassName(".close");
        const onClickCard = spyOn(component, "onClickCard");

        // Execute click on close image
        closeImageDE.triggerEventHandler("click", null);

        expect(onClickCard).not.toHaveBeenCalled();
    });

    /**
     * Confirm method prepared matrix downloads opened is called on click of close image.
     */
    it("should method prepared matrix downloads opened is called on click of close image", () => {

        const onPreparedMatrixDownloadsOpened = spyOn(component, "onPreparedMatrixDownloadsOpened");
        const closeImageDE = getElementByClassName(".close");

        // Execute click on close image
        closeImageDE.triggerEventHandler("click", null);

        expect(onPreparedMatrixDownloadsOpened).toHaveBeenCalled();
    });

    /**
     * Returns the corresponding element when specified by selector and index.
     *
     * @param {number} index
     * @returns {HTMLElement}
     */
    function getCopyToClipboardElement(index: number): HTMLElement {

        const copyToClipboardNodeLists = fixture.debugElement.nativeElement.querySelectorAll("copy-to-clipboard");

        if ( !copyToClipboardNodeLists ) {

            return null;
        }

        const copyToClipboardEl = copyToClipboardNodeLists[index];

        if ( !copyToClipboardEl ) {

            return null;
        }

        return copyToClipboardEl;
    }

    /**
     * Returns debug element for the specified class name.
     *
     * @param {string} className
     * @returns {DebugElement}
     */
    function getElementByClassName(className: string): DebugElement {

        return fixture.debugElement.query(By.css(className));
    }

    /**
     * Returns the matrix link element, specified by matrix index.
     *
     * @param {number} index
     * @returns {HTMLElement}
     */
    function getMatrixLinkElement(index: number): HTMLElement {

        const matrixByClassNameDEs = fixture.debugElement.queryAll(By.css(".file-format a"));

        if ( !matrixByClassNameDEs ) {

            return null;
        }

        const matrixByClassNameDE = matrixByClassNameDEs.filter(byClassNameEl => byClassNameEl.nativeElement.className === "")[index];

        if ( !matrixByClassNameDE ) {

            return null;
        }

        const matrixByClassNameEl = matrixByClassNameDE.nativeElement;

        if ( !matrixByClassNameEl ) {

            return null;
        }

        return matrixByClassNameEl;
    }

    /**
     * Returns the href attribute for the matrix link, specified by matrix index.
     *
     * @param {number} index
     * @returns {string}
     */
    function getMatrixLinkHrefAttribute(index: number): string {

        const matrixLinkEl = getMatrixLinkElement(index);

        if ( !matrixLinkEl ) {

            return "";
        }

        return matrixLinkEl.getAttribute("href");
    }

    /**
     * Returns true if matrix label is displayed.
     *
     * @param {string} label
     * @returns {boolean}
     */
    function isMatrixLabelDisplayed(label: string): boolean {

        const matrixLabelEls = fixture.debugElement.queryAll(By.css(".file-format span"));

        if ( !matrixLabelEls ) {

            return false;
        }

        return matrixLabelEls.some(matrixLabelEl => matrixLabelEl.nativeElement.innerText === label);
    }
});
