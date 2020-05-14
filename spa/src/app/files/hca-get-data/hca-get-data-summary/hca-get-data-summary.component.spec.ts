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
import { of } from "rxjs";

// App dependencies
import { CcPipeModule } from "../../../cc-pipe/cc-pipe.module";
import { HCATooltipComponent } from "../../../shared/hca-tooltip/hca-tooltip.component";
import { HCAGetDataFileSummaryComponent } from "../hca-get-data-file-summary/hca-get-data-file-summary.component";
import { HCAGetDataSummaryComponent } from "./hca-get-data-summary.component";
import { SearchFacetTerm } from "../../search/search-facet-term.model";
import { SelectedSearchTermsComponent } from "../../search/selected-search-terms/selected-search-terms.component";
import { DEFAULT_FILE_SUMMARY } from "../../shared/file-summary.mock";
import { FacetDisplayService } from "../../facet/facet-display.service";
import { SearchTermHttpService } from "../../search/http/search-term-http.service";

describe("HCAGetDataSummaryComponent", () => {

    let component: HCAGetDataSummaryComponent;
    let fixture: ComponentFixture<HCAGetDataSummaryComponent>;

    const testStore = jasmine.createSpyObj("Store", ["pipe"]);

    // Search terms with file format selected
    const SEARCH_TERMS = [
        new SearchFacetTerm("fileFormat", "fastq", 123),
        new SearchFacetTerm("disease", "ESRD", 8),
        new SearchFacetTerm("genusSpecies", "Homo sapiens", 20)
    ];

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                SelectedSearchTermsComponent,
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
                    provide: FacetDisplayService,
                    useValue: jasmine.createSpyObj("FacetDisplayService", ["getFacetDisplayName"])
                },
                {
                    provide: SearchTermHttpService,
                    useValue: jasmine.createSpyObj("SearchTermHttpService", ["bindSearchTerms", "marshallSearchTerms"])
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

        expect(fixture.debugElement.nativeElement.querySelector("selected-search-terms")).not.toBe(null);
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
