/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for HCAGetDataSummary.
 */

// Core dependencies
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatTooltipModule } from "@angular/material";
import { By } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { of } from "rxjs/index";

// App dependencies
import { CcPipeModule } from "../../../cc-pipe/cc-pipe.module";
import { HCAFileFilterResultComponent } from "../../hca-file-filter-result/hca-file-filter-result.component";
import { HCAGetDataFileSummaryComponent } from "../hca-get-data-file-summary/hca-get-data-file-summary.component";
import { HCATooltipComponent } from "../../hca-tooltip/hca-tooltip.component";
import { SearchFileFacetTerm } from "../../search/search-file-facet-term.model";
import { FileFacetDisplayService } from "../../shared/file-facet-display.service";
import { DEFAULT_FILE_SUMMARY } from "../../shared/file-summary.mock";
import { HCAGetDataSummaryComponent } from "./hca-get-data-summary.component";

// App components

describe("HCAGetDataSummaryComponent", () => {

    let component: HCAGetDataSummaryComponent;
    let fixture: ComponentFixture<HCAGetDataSummaryComponent>;

    const testStore = jasmine.createSpyObj("Store", ["pipe"]);

    // Search terms with file format selected
    const SEARCH_TERMS = [
        new SearchFileFacetTerm("fileFormat", "fastq", 123),
        new SearchFileFacetTerm("disease", "ESRD", 8),
        new SearchFileFacetTerm("genusSpecies", "Homo sapiens", 20)
    ];

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                HCAFileFilterResultComponent,
                HCAGetDataFileSummaryComponent,
                HCAGetDataSummaryComponent,
                HCATooltipComponent
            ],
            imports: [
                CcPipeModule,
                MatTooltipModule
            ],
            providers: [
                {
                    provide: Store,
                    useValue: testStore
                },
                {
                    provide: FileFacetDisplayService,
                    useValue: jasmine.createSpyObj("FileFacetDisplayService", ["getFileFacetDisplayName"])
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HCAGetDataSummaryComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm selected search terms <hca-file-filter-result> is displayed on init of state
     */
    it("should display selected search terms on init of state", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of([]) // search terms
        );

        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.querySelector("hca-file-filter-result")).not.toBe(null);
    });

    /**
     * Confirm file summary <hca-get-data-file-summary> is displayed on init of state
     */
    it("should display file summary on init of state", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of([]) // search terms
        );

        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.querySelector("hca-get-data-file-summary")).not.toBe(null);
    });

    /**
     * Confirm "No query applied to data" is displayed when selected search terms is empty.
     */
    it(`should display "No query applied to data" when selected search terms is empty`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of([]) // search terms
        );

        fixture.detectChanges();

        const noQueryText = fixture.debugElement.query(By.css(".data-query p")).nativeElement.innerHTML;

        // Confirm "No query applied to data" is displayed
        expect(noQueryText).toEqual("No query applied to data");
    });

    /**
     * Confirm "No query applied to data" is not displayed when selected search terms is not empty.
     */
    it(`should not display "No query applied to data" when selected search terms is not empty`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of(SEARCH_TERMS) // search terms
        );

        fixture.detectChanges();

        const noQueryTextEl = fixture.debugElement.query(By.css(".data-query p"));

        // Confirm "No query applied to data" is not displayed
        expect(noQueryTextEl).toEqual(null);
    });
});
