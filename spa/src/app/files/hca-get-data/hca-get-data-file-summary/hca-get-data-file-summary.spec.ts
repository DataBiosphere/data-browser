/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for HCAGetDataFileSummary.
 */

// Core dependencies
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatTooltipModule } from "@angular/material";
import { By } from "@angular/platform-browser";

// App dependencies
import { CcPipeModule } from "../../../cc-pipe/cc-pipe.module";
import { CountSizePipe } from "../../../cc-pipe/count-size/count-size.pipe";
import { FileSizePipe } from "../../../cc-pipe/file-size/file-size.pipe";
import { HCATooltipComponent } from "../../hca-tooltip/hca-tooltip.component";
import { DEFAULT_FILE_SUMMARY } from "../../shared/file-summary.mock";
import { DownloadViewState } from "../download-view-state.model";
import { HCAGetDataFileSummaryComponent } from "./hca-get-data-file-summary.component";
import { Term } from "../../shared/term.model";
import { DebugElement, ElementRef } from "@angular/core";

describe("HCAGetDataFileSummaryComponent", () => {

    let component: HCAGetDataFileSummaryComponent;
    let fixture: ComponentFixture<HCAGetDataFileSummaryComponent>;

    const SUMMARY_DISPLAY_ORDER = ["Projects", "Species", "Library Construction Method", "Paired End", "Donors", "Specimens", "Estimated Cells", "Files", "File Size"];

    // Summary order by index
    const PROJECT_COUNT_INDEX = 0;
    const SPECIES_COUNT_INDEX = 1;
    const LIBRARY_CONSTRUCTION_METHOD_COUNT_INDEX = 2;
    const PAIRED_END_COUNT_INDEX = 3;
    const DONORS_COUNT_INDEX = 4;
    const SPECIMENS_COUNT_INDEX = 5;
    const ESTIMATED_CELLS_COUNT_INDEX = 6;
    const FILES_COUNT_INDEX = 7;
    const FILE_SIZE_COUNT_INDEX = 8;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                HCAGetDataFileSummaryComponent,
                HCATooltipComponent
            ],
            imports: [
                CcPipeModule,
                MatTooltipModule
            ],
            providers: []
        }).compileComponents();

        fixture = TestBed.createComponent(HCAGetDataFileSummaryComponent);
        component = fixture.componentInstance;
        component.summary = DEFAULT_FILE_SUMMARY;
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm display terms method returns "Unspecified" when terms is undefined.
     */
    it(`should return "Unspecified" when terms is undefined`, () => {

        // Confirm "Unspecified" is displayed when terms is undefined - first execute the method
        // and then confirm the returned value is "Unspecified".
        const displayTerms = component.displayTerms([]);
        expect(displayTerms).toEqual("Unspecified");
    });

    /**
     * Confirm display terms method returns a concatenation of all term names.
     */
    it("should return a concatenation of all term names", () => {

        const selectedTerms = [
            new Term("Homo sapiens", 22, true),
            new Term("Mus musculus", 123, true),
            new Term("Fastq", 233, true)
        ];

        // Confirm term names are concatenated - first execute the method
        // and then confirm the returned value is a concatenation of all term names.
        const displayTerms = component.displayTerms(selectedTerms);
        expect(displayTerms).toEqual(getTermNames(selectedTerms));
    });

    /**
     * Confirm download view state matrix returns true, when view mode is "MATRIX".
     */
    it(`should return true when view mode is download view state "MATRIX"`, () => {

        // Confirm download view state matrix returns true when view mode is "MATRIX" - first execute the method
        // and then confirm the returned value is true.
        const downloadViewState = component.isDownloadViewStateMatrix(DownloadViewState.MATRIX);
        expect(downloadViewState).toEqual(true);
    });

    /**
     * Confirm download view state matrix returns false, when view mode is not "MATRIX".
     */
    it(`should return false when view mode is download view state is not "MATRIX"`, () => {

        // Confirm download view state matrix returns false when view mode is not "MATRIX" - first execute the method
        // and then confirm the returned value is false.
        const downloadViewState = component.isDownloadViewStateMatrix(DownloadViewState.TERRA);
        expect(downloadViewState).toEqual(false);
    });

    /**
     * Confirm tooltip disabled returns true, when count size pipe is the same value as locale string pipe.
     */
    it("should return true when count size pipe is the same value as locale string pipe", () => {

        // Confirm tooltip disabled returns true, when count size pipe is the same value as locale string pipe -
        // first execute the method and then confirm the returned value is true.
        const tooltipDisabled = component.isTooltipDisabled(component.summary.projectCount);
        expect(tooltipDisabled).toEqual(true);
    });

    /**
     * Confirm tooltip disabled returns false, where count size pipe is not the same value as locale string pipe.
     */
    it("should return false when count size pipe is not the same value as locale string pipe", () => {

        // Confirm tooltip disabled returns false, when count size pipe is not the same value as locale string pipe -
        // first execute the method and then confirm the returned value is false.
        const tooltipDisabled = component.isTooltipDisabled(component.summary.totalCellCount);
        expect(tooltipDisabled).toEqual(false);
    });

    /**
     * Confirm all summary labels are displayed, when view mode is "NONE".
     */
    it(`should display all summary labels when view mode is "NONE"`, () => {

        // Set up initial component state
        component.viewState = DownloadViewState.NONE;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm all summary labels are displayed, when view mode is "NONE" - first execute a query
        // to find all the elements with the class "summary" and then for each element find the element
        // with the class "label" then confirm the label is displayed in the correct order.
        getSummaryEls().forEach((el, index) => {
            expect(getSummaryLabelInnerHTML(el)).toEqual((SUMMARY_DISPLAY_ORDER[index]));
        });
    });

    /**
     * Confirm all summary labels are displayed, when view mode is "MANIFEST".
     */
    it(`should display all summary labels when view mode is "MANIFEST"`, () => {

        // Set up initial component state
        component.viewState = DownloadViewState.MANIFEST;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm all summary labels are displayed, when view mode is "MANIFEST" - first execute a query
        // to find all the elements with the class "summary" and then for each element find the element
        // with the class "label" then confirm the label is displayed in the correct order.
        getSummaryEls().forEach((el, index) => {
            expect(getSummaryLabelInnerHTML(el)).toEqual((SUMMARY_DISPLAY_ORDER[index]));
        });
    });

    /**
     * Confirm all summary labels are displayed, when view mode is "TERRA".
     */
    it(`should display all summary labels when view mode is "TERRA"`, () => {

        // Set up initial component state
        component.viewState = DownloadViewState.TERRA;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm all summary labels are displayed, when view mode is "TERRA" - first execute a query
        // to find all the elements with the class "summary" and then for each element find the element
        // with the class "label" then confirm the label is displayed in the correct order.
        getSummaryEls().forEach((el, index) => {
            expect(getSummaryLabelInnerHTML(el)).toEqual((SUMMARY_DISPLAY_ORDER[index]));
        });
    });

    /**
     * Confirm all summary labels are displayed, excluding files and file size, when view mode is "MATRIX".
     */
    it(`should display all summary labels when view mode is "MATRIX"`, () => {

        // Set up initial component state
        component.viewState = DownloadViewState.MATRIX;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm all summary labels are displayed, excluding files and file size, when view mode is "MATRIX" -
        // first execute a query to find all the elements with the class "summary" and then for each element find the element
        // with the class "label" then confirm the labels are displayed in the correct order and confirm the exclusion of
        // labels "Files" and "File Size".
        getSummaryEls().forEach((el, index) => {
            expect(getSummaryLabelInnerHTML(el)).toEqual((SUMMARY_DISPLAY_ORDER[index]));
            expect(getSummaryLabelInnerHTML(el)).not.toEqual(SUMMARY_DISPLAY_ORDER[FILES_COUNT_INDEX]);
            expect(getSummaryLabelInnerHTML(el)).not.toEqual(SUMMARY_DISPLAY_ORDER[FILE_SIZE_COUNT_INDEX]);
        });
    });

    /**
     * Confirm summary project count is displayed, when view mode is "NONE".
     */
    it(`should display summary project count when view mode is "NONE"`, () => {

        // Set up initial component state
        component.viewState = DownloadViewState.NONE;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm project count value is displayed, when view mode is "NONE" - first execute a query
        // to find the element with the class "count" where the element with the class "label" is "Projects"
        // and confirm the value is equal to project count.
        expect(getCountInnerHTML(PROJECT_COUNT_INDEX)).toEqual(component.summary.projectCount.toLocaleString());
    });

    /**
     * Confirm summary donor count is displayed, when view mode is "NONE".
     */
    it(`should display summary donor count when view mode is "NONE"`, () => {

        // Set up initial component state
        component.viewState = DownloadViewState.NONE;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm donor count value is displayed, when view mode is "NONE" - first execute a query
        // to find the element with the class "count" where the element with the class "label" is "Donors"
        // and confirm the value is equal to donor count.
        expect(getCountInnerHTML(DONORS_COUNT_INDEX)).toEqual(new CountSizePipe().transform(component.summary.donorCount));
    });

    /**
     * Confirm summary specimen count is displayed, when view mode is "NONE".
     */
    it(`should display summary specimen count when view mode is "NONE"`, () => {

        // Set up initial component state
        component.viewState = DownloadViewState.NONE;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm specimen count value is displayed, when view mode is "NONE" - first execute a query
        // to find the element with the class "count" where the element with the class "label" is "Specimens"
        // and confirm the value is equal to specimen count.
        expect(getCountInnerHTML(SPECIMENS_COUNT_INDEX)).toEqual(new CountSizePipe().transform(component.summary.specimenCount));
    });

    /**
     * Confirm summary total cell count is displayed, when view mode is "NONE".
     */
    it(`should display summary total cell count when view mode is "NONE"`, () => {

        // Set up initial component state
        component.viewState = DownloadViewState.NONE;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm total cell count value is displayed, when view mode is "NONE" - first execute a query
        // to find the element with the class "count" where the element with the class "label" is "Estimated Cells"
        // and confirm the value is equal to total cell count.
        expect(getCountInnerHTML(ESTIMATED_CELLS_COUNT_INDEX)).toEqual(new CountSizePipe().transform(component.summary.totalCellCount));
    });

    /**
     * Confirm summary file count is displayed, when view mode is "NONE".
     */
    it(`should display summary file count when view mode is "NONE"`, () => {

        // Set up initial component state
        component.viewState = DownloadViewState.NONE;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm file count value is displayed, when view mode is "NONE" - first execute a query
        // to find the element with the class "count" where the element with the class "label" is "Files"
        // and confirm the value is equal to file count.
        expect(getCountInnerHTML(FILES_COUNT_INDEX)).toEqual(new CountSizePipe().transform(component.summary.fileCount));
    });

    /**
     * Confirm summary file size count is displayed, when view mode is "NONE".
     */
    it(`should display summary file size count when view mode is "NONE"`, () => {

        // Set up initial component state
        component.viewState = DownloadViewState.NONE;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm file size count value is displayed, when view mode is "NONE" - first execute a query
        // to find the element with the class "count" where the element with the class "label" is "File Size"
        // and confirm the value is equal to file size count.
        expect(getCountInnerHTML(FILE_SIZE_COUNT_INDEX)).toEqual(new FileSizePipe().transform(component.summary.totalFileSize));
    });

    /**
     * Confirm selected genus species is displayed, when view mode is "NONE".
     */
    it(`should display selected genus species when view mode is "NONE"`, () => {

        const selectedTerms = [
            new Term("Homo sapiens", 22, true),
            new Term("Mus musculus", 123, true)
        ];

        // Set up initial component state
        component.viewState = DownloadViewState.NONE;
        component.selectedGenusSpecies = selectedTerms;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm selected genus species is displayed, when view mode is "NONE" - first execute a query
        // to find the element with the class "terms" where the element with the class "label" is "Species"
        // and confirm the value is equal to the concatenated term names.
        expect(getTermInnerHTML(SPECIES_COUNT_INDEX)).toEqual(component.displayTerms(selectedTerms));
    });

    /**
     * Confirm selected library construction approaches is displayed, when view mode is "NONE".
     */
    it(`should display selected library construction approaches when view mode is "NONE"`, () => {

        const selectedTerms = [
            new Term("Drop-seq", 22, true),
            new Term("10x 3' v3 sequencing", 22, true),
            new Term("Smart-seq2", 22, true),
        ];

        // Set up initial component state
        component.viewState = DownloadViewState.NONE;
        component.selectedLibraryConstructionApproaches = selectedTerms;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm selected library construction approaches is displayed, when view mode is "NONE" - first execute a query
        // to find the element with the class "terms" where the element with the class "label" is "Library Construction Method"
        // and confirm the value is equal to the concatenated term names.
        expect(getTermInnerHTML(LIBRARY_CONSTRUCTION_METHOD_COUNT_INDEX)).toEqual(component.displayTerms(selectedTerms));
    });

    /**
     * Confirm selected paired ends is displayed, when view mode is "NONE".
     */
    it(`should display selected paired ends when view mode is "NONE"`, () => {

        const selectedTerms = [
            new Term("true", 234, true)
        ];

        // Set up initial component state
        component.viewState = DownloadViewState.NONE;
        component.selectedPairedEnds = selectedTerms;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm selected paired Ends is displayed, when view mode is "NONE" - first execute a query
        // to find the element with the class "terms" where the element with the class "label" is "Paired End"
        // and confirm the value is equal to the concatenated term names.
        expect(getTermInnerHTML(PAIRED_END_COUNT_INDEX)).toEqual(component.displayTerms(selectedTerms));
    });

    /**
     * Return the inner HTML for the count for the specified summary.
     *
     * @param {number} countIndex
     * @returns {string}
     */
    function getCountInnerHTML(countIndex: number): string {

        const summaryByIndexEl = fixture.debugElement.queryAll(By.css(".summary"))[countIndex];

        return getInnerHTML(summaryByIndexEl, ".count");
    }

    /**
     * Return the inner HTML for the specified element and selector.
     *
     * @param {DebugElement} element
     * @param {string} selector
     * @returns {string}
     */
    function getInnerHTML(element: DebugElement, selector: string): string {

        return element.query(By.css(selector)).nativeElement.innerHTML;
    }

    /**
     * Return the inner HTML for the terms for the specified summary.
     *
     * @param {number} countIndex
     * @returns {string}
     */
    function getTermInnerHTML(countIndex: number): string {

        const summaryByIndexEl = fixture.debugElement.queryAll(By.css(".summary"))[countIndex];

        return getInnerHTML(summaryByIndexEl, ".terms");
    }

    /**
     * Return the concatenated term names.
     *
     * @param {Term[]} terms
     * @returns {string[]}
     */
    function getTermNames(terms: Term[]): string {

        return terms.map(term => term.name).join(", ");
    }

    /**
     * Return all the summary elements.
     *
     * @returns {DebugElement[]}
     */
    function getSummaryEls(): DebugElement[] {

        return fixture.debugElement.queryAll(By.css(".summary"));
    }

    /**
     * Return the label element for the specified summary element.
     * @param summaryEl
     * @returns {string}
     */
    function getSummaryLabelInnerHTML(summaryEl: DebugElement): string {

        return summaryEl.query(By.css(".label")).nativeElement.innerHTML;
    }
});
