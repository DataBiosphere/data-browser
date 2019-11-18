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
import { CopyToClipboardComponent } from "../../shared/copy-to-clipboard/copy-to-clipboard.component";
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";
import { ProjectPreparedMatrixDownloadsComponent } from "./project-prepared-matrix-downloads.component";
import { GenusSpecies } from "../shared/genus-species.model";
import { SpeciesMatrixUrls } from "../shared/species-matrix-urls.model";

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
    const SPECIES_URLS_HOMO_SAPIENS = new SpeciesMatrixUrls(
        "1234",
        "https://test.com/1234.homo_sapiens.csv.zip",
        "https://test.com/1234.homo_sapiens.loom",
        "https://test.com/1234.homo_sapiens.mtx.zip"
    );
    const SPECIES_URLS_MUS_MUSCULUS = new SpeciesMatrixUrls(
        "4321",
        "https://test.com/4321.mus_musculus.csv.zip",
        "https://test.com/4321.mus_musculus.loom",
        "https://test.com/4321.mus_musculus.mtx.zip"
    );
    
    const PROJECT_MATRIX_URLS_SINGLE_SPECIES = new ProjectMatrixUrls("1234", new Map([
        [GenusSpecies.HOMO_SAPIENS, SPECIES_URLS_HOMO_SAPIENS]
    ]));
    const PROJECT_MATRIX_URLS_MULTI_SPECIES = new ProjectMatrixUrls("4321", new Map([
        [GenusSpecies.HOMO_SAPIENS, SPECIES_URLS_HOMO_SAPIENS],
        [GenusSpecies.MUS_MUSCULUS, SPECIES_URLS_MUS_MUSCULUS]
    ]));

    // Example of project matrix urls with no values
    const PROJECT_MATRIX_URLS_EMPTY = new ProjectMatrixUrls("1111", new Map());


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
    xit("TBD - methods, host listener and lifecycle hooks", () => {

        // TODO - methods, host listener and lifecycle hooks
    });

    /**
     * Confirm heading for single species is displayed for project matrix URLS for a single species.
     */
    it("displays single species heading for project that has prepared matrix for one species", () => {

            component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_SPECIES;
            fixture.detectChanges();
            
            // Grab the species headers - there should only be one, and that one should be homo sapiens
            const speciesDebugEls = getElementBySelector("h5");
            expect(speciesDebugEls.length).toBe(1);
            const homoSapiensDebugEl = speciesDebugEls[0];
            expect(homoSapiensDebugEl.nativeElement.innerHTML).toBe(GenusSpecies.HOMO_SAPIENS);
    });

    /**
     * Confirm headings for all species is displayed for project matrix URLS for multi species. 
     */
    it("displays headings for all species for project that has prepared matrix for multiple species", () => {

        component.projectURLs = PROJECT_MATRIX_URLS_MULTI_SPECIES;
        fixture.detectChanges();

        // Grab the species headers
        const speciesDebugEls = getElementBySelector("h5");
        
        // There should be a header for every species in the project matrix URLs
        const species = Array.from(component.projectURLs.urlsBySpecies.keys());
        expect(speciesDebugEls.length).toBe(species.length);
        const headings = speciesDebugEls.map(debugEl => {
            return debugEl.nativeElement.innerHTML;
        });
        species.forEach(s => {
            expect(headings.indexOf(s)).not.toBe(-1);
        });
    });

    // /**
    //  * Confirm "mtx" is displayed when project matrix mtx is available.
    //  */
    // it(`should display "mtx" when project matrix mtx is available`, () => {
    //
    //     component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_SPECIES;
    //
    //     fixture.detectChanges();
    //
    //     // Confirm label is displayed
    //     expect(isMatrixLabelDisplayed(LABEL_MTX)).toEqual(true);
    // });
    //
    // /**
    //  * Confirm "mtx" is not displayed when project matrix mtx is not available.
    //  */
    // it(`should not display "mtx" when project matrix mtx is not available`, () => {
    //
    //     component.projectURLs = PROJECT_MATRIX_URLS_EMPTY;
    //
    //     fixture.detectChanges();
    //
    //     // Confirm label is not displayed
    //     expect(isMatrixLabelDisplayed(LABEL_MTX)).toEqual(false);
    // });
    //
    // /**
    //  * Confirm matrix mtx link is added to href attribute.
    //  */
    // it("should add mtx link to href", () => {
    //
    //     // Set up initial component state
    //     component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_SPECIES;
    //
    //     // Trigger change detection so template updates accordingly
    //     fixture.detectChanges();
    //
    //     // Confirm link is added to href attribute
    //     expect(getMatrixLinkHrefAttribute(INDEX_MTX)).toEqual(component.projectURLs.mtxUrl);
    // });
    //
    // /**
    //  * Confirm <copy-to-clipboard> is displayed when project matrix mtx is available.
    //  */
    // it("should display component copy-to-clipboard when project matrix mtx is available", () => {
    //
    //     component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_SPECIES;
    //
    //     fixture.detectChanges();
    //
    //     // Confirm <copy-to-clipboard> is displayed
    //     expect(getCopyToClipboardElement(INDEX_MTX)).not.toBe(null);
    // });
    //
    // /**
    //  * Confirm <copy-to-clipboard> is not displayed when project matrix mtx is empty.
    //  */
    // it("should not display component copy-to-clipboard when project matrix mtx is empty", () => {
    //
    //     component.projectURLs = PROJECT_MATRIX_URLS_EMPTY;
    //
    //     fixture.detectChanges();
    //
    //     // Confirm <copy-to-clipboard> is not displayed
    //     expect(getCopyToClipboardElement(INDEX_MTX)).toBe(null);
    // });
    //
    // /**
    //  * Confirm "csv" is displayed when project matrix csv is available.
    //  */
    // it(`should display "csv" when project matrix csv is available`, () => {
    //
    //     component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_SPECIES;
    //
    //     fixture.detectChanges();
    //
    //     // Confirm label is displayed
    //     expect(isMatrixLabelDisplayed(LABEL_CSV)).toEqual(true);
    // });
    //
    // /**
    //  * Confirm "csv" is not displayed when project matrix csv is not available.
    //  */
    // it(`should not display "csv" when project matrix csv is not available`, () => {
    //
    //     component.projectURLs = PROJECT_MATRIX_URLS_EMPTY;
    //
    //     fixture.detectChanges();
    //
    //     // Confirm label is not displayed
    //     expect(isMatrixLabelDisplayed(LABEL_CSV)).toEqual(false);
    // });
    //
    // /**
    //  * Confirm matrix csv link is added to href attribute.
    //  */
    // it("should add csv link to href", () => {
    //
    //     // Set up initial component state
    //     component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_SPECIES;
    //
    //     // Trigger change detection so template updates accordingly
    //     fixture.detectChanges();
    //
    //     // Confirm link is added to href attribute
    //     expect(getMatrixLinkHrefAttribute(INDEX_CSV)).toEqual(component.projectURLs.csvUrl);
    // });
    //
    // /**
    //  * Confirm <copy-to-clipboard> is displayed when project matrix csv is available.
    //  */
    // it("should display component copy-to-clipboard when project matrix csv is available", () => {
    //
    //     component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_SPECIES;
    //
    //     fixture.detectChanges();
    //
    //     // Confirm <copy-to-clipboard> is displayed
    //     expect(getCopyToClipboardElement(INDEX_CSV)).not.toBe(null);
    // });
    //
    // /**
    //  * Confirm <copy-to-clipboard> is not displayed when project matrix csv is empty.
    //  */
    // it("should not display component copy-to-clipboard when project matrix csv is empty", () => {
    //
    //     component.projectURLs = PROJECT_MATRIX_URLS_EMPTY;
    //
    //     fixture.detectChanges();
    //
    //     // Confirm <copy-to-clipboard> is not displayed
    //     expect(getCopyToClipboardElement(INDEX_CSV)).toBe(null);
    // });
    //
    //
    // /**
    //  * Confirm "loom" is displayed when project matrix loom is available.
    //  */
    // it(`should display "loom" when project matrix loom is available`, () => {
    //
    //     component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_SPECIES;
    //
    //     fixture.detectChanges();
    //
    //     // Confirm label is displayed
    //     expect(isMatrixLabelDisplayed(LABEL_LOOM)).toEqual(true);
    // });
    //
    // /**
    //  * Confirm "loom" is not displayed when project matrix loom is not available.
    //  */
    // it(`should not display "loom" when project matrix loom is not available`, () => {
    //
    //     component.projectURLs = PROJECT_MATRIX_URLS_EMPTY;
    //
    //     fixture.detectChanges();
    //
    //     // Confirm label is not displayed
    //     expect(isMatrixLabelDisplayed(LABEL_LOOM)).toEqual(false);
    // });
    //
    // /**
    //  * Confirm matrix loom link is added to href attribute.
    //  */
    // it("should add loom link to href", () => {
    //
    //     // Set up initial component state
    //     component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_SPECIES;
    //
    //     // Trigger change detection so template updates accordingly
    //     fixture.detectChanges();
    //
    //     // Confirm link is added to href attribute
    //     expect(getMatrixLinkHrefAttribute(INDEX_LOOM)).toEqual(component.projectURLs.loomUrl);
    // });
    //
    // /**
    //  * Confirm <copy-to-clipboard> is displayed when project matrix loom is available.
    //  */
    // it("should display component copy-to-clipboard when project matrix loom is available", () => {
    //
    //     component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_SPECIES;
    //
    //     fixture.detectChanges();
    //
    //     // Confirm <copy-to-clipboard> is displayed
    //     expect(getCopyToClipboardElement(INDEX_LOOM)).not.toBe(null);
    // });
    //
    // /**
    //  * Confirm <copy-to-clipboard> is not displayed when project matrix loom is empty.
    //  */
    // it("should not display component copy-to-clipboard when project matrix loom is empty", () => {
    //
    //     component.projectURLs = PROJECT_MATRIX_URLS_EMPTY;
    //
    //     fixture.detectChanges();
    //
    //     // Confirm <copy-to-clipboard> is not displayed
    //     expect(getCopyToClipboardElement(INDEX_LOOM)).toBe(null);
    // });
    //
    // /**
    //  * Confirm method click inside card is called on click of mtx download.
    //  */
    // it("should method click inside card is called on click of mtx download", () => {
    //
    //     component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_SPECIES;
    //     fixture.detectChanges();
    //
    //     const matrixLinkEl = getMatrixLinkElement(INDEX_MTX);
    //     matrixLinkEl.addEventListener("click", (event) => {event.preventDefault()});
    //     const onClickCard = spyOn(component, "onClickCard");
    //
    //     // Execute click on mtx download
    //     matrixLinkEl.click();
    //
    //     expect(onClickCard).toHaveBeenCalled();
    // });
    //
    // /**
    //  * Confirm method click inside card is not called on click of close image.
    //  */
    // it("should method click inside card is not called on click of close image", () => {
    //
    //     component.projectURLs = PROJECT_MATRIX_URLS_SINGLE_SPECIES;
    //     fixture.detectChanges();
    //
    //     const closeImageDE = getElementByClassName(".close");
    //     const onClickCard = spyOn(component, "onClickCard");
    //
    //     // Execute click on close image
    //     closeImageDE.triggerEventHandler("click", null);
    //
    //     expect(onClickCard).not.toHaveBeenCalled();
    // });
    //
    // /**
    //  * Confirm method prepared matrix downloads opened is called on click of close image.
    //  */
    // it("should method prepared matrix downloads opened is called on click of close image", () => {
    //
    //     const onPreparedMatrixDownloadsOpened = spyOn(component, "onPreparedMatrixDownloadsOpened");
    //     const closeImageDE = getElementByClassName(".close");
    //
    //     // Execute click on close image
    //     closeImageDE.triggerEventHandler("click", null);
    //
    //     expect(onPreparedMatrixDownloadsOpened).toHaveBeenCalled();
    // });
    //
    // /**
    //  * Returns the corresponding element when specified by selector and index.
    //  *
    //  * @param {number} index
    //  * @returns {HTMLElement}
    //  */
    // function getCopyToClipboardElement(index: number): HTMLElement {
    //
    //     const copyToClipboardNodeLists = fixture.debugElement.nativeElement.querySelectorAll("copy-to-clipboard");
    //
    //     if ( !copyToClipboardNodeLists ) {
    //
    //         return null;
    //     }
    //
    //     const copyToClipboardEl = copyToClipboardNodeLists[index];
    //
    //     if ( !copyToClipboardEl ) {
    //
    //         return null;
    //     }
    //
    //     return copyToClipboardEl;
    // }

    /**
     * Returns debug element for the specified class name.
     *
     * @param {string} selector
     * @returns {DebugElement[]}
     */
    function getElementBySelector(selector: string): DebugElement[] {

        return fixture.debugElement.queryAll(By.css(selector));
    }

    // /**
    //  * Returns the matrix link element, specified by matrix index.
    //  *
    //  * @param {number} index
    //  * @returns {HTMLElement}
    //  */
    // function getMatrixLinkElement(index: number): HTMLElement {
    //
    //     const matrixByClassNameDEs = fixture.debugElement.queryAll(By.css(".file-format a"));
    //
    //     if ( !matrixByClassNameDEs ) {
    //
    //         return null;
    //     }
    //
    //     const matrixByClassNameDE = matrixByClassNameDEs.filter(byClassNameEl => byClassNameEl.nativeElement.className === "")[index];
    //
    //     if ( !matrixByClassNameDE ) {
    //
    //         return null;
    //     }
    //
    //     const matrixByClassNameEl = matrixByClassNameDE.nativeElement;
    //
    //     if ( !matrixByClassNameEl ) {
    //
    //         return null;
    //     }
    //
    //     return matrixByClassNameEl;
    // }
    //
    // /**
    //  * Returns the href attribute for the matrix link, specified by matrix index.
    //  *
    //  * @param {number} index
    //  * @returns {string}
    //  */
    // function getMatrixLinkHrefAttribute(index: number): string {
    //
    //     const matrixLinkEl = getMatrixLinkElement(index);
    //
    //     if ( !matrixLinkEl ) {
    //
    //         return "";
    //     }
    //
    //     return matrixLinkEl.getAttribute("href");
    // }
    //
    // /**
    //  * Returns true if matrix label is displayed.
    //  *
    //  * @param {string} label
    //  * @returns {boolean}
    //  */
    // function isMatrixLabelDisplayed(label: string): boolean {
    //
    //     const matrixLabelEls = fixture.debugElement.queryAll(By.css(".file-format span"));
    //
    //     if ( !matrixLabelEls ) {
    //
    //         return false;
    //     }
    //
    //     return matrixLabelEls.some(matrixLabelEl => matrixLabelEl.nativeElement.innerText === label);
    // }
});
