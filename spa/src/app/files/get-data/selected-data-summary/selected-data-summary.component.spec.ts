/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for SelectedDataSummary.
 */

// Core dependencies
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatTooltipModule } from "@angular/material/tooltip";
import { By, HAMMER_LOADER } from "@angular/platform-browser";

// App dependencies
import { SelectedDataSummaryComponent } from "./selected-data-summary.component";
import { CountSizePipe } from "../../../pipe/count-size/count-size.pipe";
import { FileSizePipe } from "../../../pipe/file-size/file-size.pipe";
import { PipeModule } from "../../../pipe/pipe.module";
import { DEFAULT_FILE_SUMMARY } from "../../shared/file-summary.mock";
import { HCATooltipComponent } from "../../../shared/hca-tooltip/hca-tooltip.component";
import { Term } from "../../shared/term.model";

describe("SelectedDataSummary", () => {

    let component: SelectedDataSummaryComponent;
    let fixture: ComponentFixture<SelectedDataSummaryComponent>;

    const SUMMARY_DISPLAY_ORDER = [
        "Estimated Cells", "File Size", "Files","Projects", "Species", "Donors", "Disease Status (Donor)",
        "Specimens", "Disease Status (Specimen)", "Organ", "Organ Part", "Library Construction Method","Paired End"  
    ];

    // Summary order by index
    const INDEX_ESTIMATED_CELLS_COUNT = 0;
    const INDEX_FILE_SIZE_COUNT = 1;
    const INDEX_FILES_COUNT = 2;
    const INDEX_PROJECT_COUNT = 3;
    const INDEX_GENUS_SPECIES = 4;
    const INDEX_DONORS_COUNT = 5;
    const INDEX_DONOR_DISEASE_COUNT = 6;
    const INDEX_SPECIMENS_COUNT = 7;
    const INDEX_DISEASE_COUNT = 8;
    const INDEX_ORGAN = 9;
    const INDEX_ORGAN_PART = 10;
    const INDEX_LIBRARY_CONSTRUCTION_METHOD = 11;
    const INDEX_PAIRED_END = 12;

    beforeEach(waitForAsync(() => {

        TestBed.configureTestingModule({
            declarations: [
                SelectedDataSummaryComponent,
                HCATooltipComponent
            ],
            imports: [
                MatTooltipModule,
                PipeModule
            ],
            providers: [{
                provide: HAMMER_LOADER, // https://github.com/angular/components/issues/14668#issuecomment-450474862
                useValue: () => new Promise(() => {
                })
            }]
        }).compileComponents();

        fixture = TestBed.createComponent(SelectedDataSummaryComponent);
        component = fixture.componentInstance;
        component.summary = DEFAULT_FILE_SUMMARY;
    }));

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
     * Confirm all summary labels are displayed.
     */
    it(`should display all summary labels`, () => {

        // Confirm all summary labels are displayed - first execute a query
        // to find all the elements with the class "summary" and then for each element find the element
        // with the class "label" then confirm the label is displayed in the correct order.
        getSummaryEls().forEach((el, index) => {
            expect(getSummaryLabelInnerHTML(el)).toEqual((SUMMARY_DISPLAY_ORDER[index]));
        });
    });

    /**
     * Confirm summary project count is displayed.
     */
    it(`should display summary project count`, () => {

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm project count value is displayed - first execute a query
        // to find the element with the class "count" where the element with the class "label" is "Projects"
        // and confirm the value is equal to project count.
        expect(getCountInnerHTML(INDEX_PROJECT_COUNT)).toEqual(component.summary.projectCount.toLocaleString());
    });

    /**
     * Confirm summary donor count is displayed.
     */
    it(`should display summary donor count when view mode is "NONE"`, () => {

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm donor count value is displayed, when view mode is "NONE" - first execute a query
        // to find the element with the class "count" where the element with the class "label" is "Donors"
        // and confirm the value is equal to donor count.
        expect(getCountInnerHTML(INDEX_DONORS_COUNT)).toEqual(new CountSizePipe().transform(component.summary.donorCount));
    });

    /**
     * Confirm summary specimen count is displayed.
     */
    it(`should display summary specimen count`, () => {

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm specimen count value is displayed - first execute a query
        // to find the element with the class "count" where the element with the class "label" is "Specimens"
        // and confirm the value is equal to specimen count.
        expect(getCountInnerHTML(INDEX_SPECIMENS_COUNT)).toEqual(new CountSizePipe().transform(component.summary.specimenCount));
    });

    /**
     * Confirm summary total cell count is displayed.
     */
    it(`should display summary total cell count`, () => {

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm total cell count value is displayed - first execute a query
        // to find the element with the class "count" where the element with the class "label" is "Estimated Cells"
        // and confirm the value is equal to total cell count.
        expect(getCountInnerHTML(INDEX_ESTIMATED_CELLS_COUNT)).toEqual(new CountSizePipe().transform(component.summary.totalCellCount));
    });

    /**
     * Confirm summary file count is displayed.
     */
    it(`should display summary file count`, () => {

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm file count value is displayed - first execute a query
        // to find the element with the class "count" where the element with the class "label" is "Files"
        // and confirm the value is equal to file count.
        expect(getCountInnerHTML(INDEX_FILES_COUNT)).toEqual(new CountSizePipe().transform(component.summary.fileCount));
    });

    /**
     * Confirm summary file size count is displayed.
     */
    it(`should display summary file size count`, () => {

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm file size count value is displayed - first execute a query
        // to find the element with the class "count" where the element with the class "label" is "File Size"
        // and confirm the value is equal to file size count.
        expect(getCountInnerHTML(INDEX_FILE_SIZE_COUNT)).toEqual(new FileSizePipe().transform(component.summary.totalFileSize));
    });

    /**
     * Confirm selected genus species is displayed.
     */
    it(`should display selected genus species`, () => {

        const selectedTerms = [
            new Term("Homo sapiens", 22, true),
            new Term("Mus musculus", 123, true)
        ];

        // Set up initial component state
        component.selectedGenusSpecies = selectedTerms;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm selected genus species is displayed - first execute a query
        // to find the element with the class "terms" where the element with the class "label" is "Species"
        // and confirm the value is equal to the concatenated term names.
        expect(getTermInnerHTML(INDEX_GENUS_SPECIES)).toEqual(component.displayTerms(selectedTerms));
    });

    /**
     * Confirm selected library construction approaches is displayed.
     */
    it(`should display selected library construction approaches`, () => {

        const selectedTerms = [
            new Term("Drop-seq", 22, true),
            new Term("10x 3' v3 sequencing", 22, true),
            new Term("Smart-seq2", 22, true),
        ];

        // Set up initial component state
        component.selectedLibraryConstructionApproaches = selectedTerms;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm selected library construction approaches is displayed - first execute a query
        // to find the element with the class "terms" where the element with the class "label" is "Library Construction Method"
        // and confirm the value is equal to the concatenated term names.
        expect(getTermInnerHTML(INDEX_LIBRARY_CONSTRUCTION_METHOD)).toEqual(component.displayTerms(selectedTerms));
    });

    /**
     * Confirm selected organs is displayed.
     */
    it(`should display selected organs`, () => {

        const selectedTerms = [
            new Term("blood", 22, true),
            new Term("lung", 22, true)
        ];

        // Set up initial component state
        component.selectedOrgans = selectedTerms;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm selected organs is displayed - first execute a query
        // to find the element with the class "terms" where the element with the class "label" is "Organ"
        // and confirm the value is equal to the concatenated term names.
        expect(getTermInnerHTML(INDEX_ORGAN)).toEqual(component.displayTerms(selectedTerms));
    });

    /**
     * Confirm selected organ parts is displayed.
     */
    it(`should display selected organ parts`, () => {

        const selectedTerms = [
            new Term("amygdala", 22, true),
            new Term("islet of Langerhans", 22, true)
        ];

        // Set up initial component state
        component.selectedOrganParts = selectedTerms;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm selected organ parts is displayed - first execute a query
        // to find the element with the class "terms" where the element with the class "label" is "Organ Parts"
        // and confirm the value is equal to the concatenated term names.
        expect(getTermInnerHTML(INDEX_ORGAN_PART)).toEqual(component.displayTerms(selectedTerms));
    });

    /**
     * Confirm selected paired ends is displayed.
     */
    it(`should display selected paired ends`, () => {

        const selectedTerms = [
            new Term("true", 234, true)
        ];

        // Set up initial component state
        component.selectedPairedEnds = selectedTerms;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm selected paired Ends is displayed - first execute a query
        // to find the element with the class "terms" where the element with the class "label" is "Paired End"
        // and confirm the value is equal to the concatenated term names.
        expect(getTermInnerHTML(INDEX_PAIRED_END)).toEqual(component.displayTerms(selectedTerms));
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
