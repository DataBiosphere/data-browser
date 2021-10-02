/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for GetDataSummary.
 */

// Core dependencies
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatTooltipModule } from "@angular/material/tooltip";
import { By } from "@angular/platform-browser";
import { provideMockStore } from "@ngrx/store/testing";

// App dependencies
import { FacetDisplayService } from "../../facet/facet-display.service";
import { SelectedDataSummaryComponent } from "../selected-data-summary/selected-data-summary.component";
import { GetDataSummaryComponent } from "./get-data-summary.component";
import { PipeModule } from "../../../pipe/pipe.module";
import { SearchTermHttpService } from "../../search/http/search-term-http.service";
import { SearchFacetTerm } from "../../search/search-facet-term.model";
import { SelectedSearchTermsComponent } from "../../search/selected-search-terms/selected-search-terms.component";
import { DEFAULT_FILE_SUMMARY } from "../../shared/file-summary.mock";
import { HCATooltipComponent } from "../../../shared/hca-tooltip/hca-tooltip.component";

describe("GetDataSummaryComponent", () => {

    let component: GetDataSummaryComponent;
    let fixture: ComponentFixture<GetDataSummaryComponent>;

    // Search terms with file format selected
    const SEARCH_TERMS = [
        new SearchFacetTerm("fileFormat", "fastq", 123),
        new SearchFacetTerm("disease", "ESRD", 8),
        new SearchFacetTerm("genusSpecies", "Homo sapiens", 20)
    ];

    beforeEach(waitForAsync(() => {

        TestBed.configureTestingModule({
            declarations: [
                SelectedDataSummaryComponent,
                SelectedSearchTermsComponent,
                GetDataSummaryComponent,
                HCATooltipComponent
            ],
            imports: [
                MatTooltipModule,
                PipeModule
            ],
            providers: [
                {
                    provide: FacetDisplayService,
                    useValue: jasmine.createSpyObj("FacetDisplayService", ["getFacetDisplayName"])
                },
                {
                    provide: SearchTermHttpService,
                    useValue: jasmine.createSpyObj("SearchTermHttpService", ["bindSearchTerms", "marshallSearchTerms"])
                },
                provideMockStore({
                    initialState: {}
                })
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(GetDataSummaryComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Confirm selected search terms <hca-file-filter-result> is displayed on init of state
     */
    it("should display selected search terms on init of state", () => {

        component.filesFacets = [];
        component.fileSummary = DEFAULT_FILE_SUMMARY;
        component.selectedSearchTerms = [];
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.querySelector("selected-search-terms")).not.toBe(null);
    });

    /**
     * Confirm file summary <selected-data-summary> is displayed on init of state
     */
    it("should display file summary on init of state", () => {

        // Set up initial component state
        component.filesFacets = [];
        component.fileSummary = DEFAULT_FILE_SUMMARY;
        component.selectedSearchTerms = [];
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.querySelector("selected-data-summary")).not.toBe(null);
    });

    /**
     * Confirm "No query applied to data" is displayed when selected search terms is empty.
     */
    it(`should display "All Data" when selected search terms is empty`, () => {

        // Set up initial component state
        component.filesFacets = [];
        component.fileSummary = DEFAULT_FILE_SUMMARY;
        component.selectedSearchTerms = [];
        fixture.detectChanges();

        const noQueryText = fixture.debugElement.query(By.css(".data-query p")).nativeElement.innerHTML;

        // Confirm "No query applied to data" is displayed
        expect(noQueryText).toEqual("All Data");
    });

    /**
     * Confirm "No query applied to data" is not displayed when selected search terms is not empty.
     */
    it(`should not display "No query applied to data" when selected search terms is not empty`, () => {

        // Set up initial component state
        component.filesFacets = [];
        component.fileSummary = DEFAULT_FILE_SUMMARY;
        component.selectedSearchTerms = SEARCH_TERMS;
        fixture.detectChanges();

        const noQueryTextEl = fixture.debugElement.query(By.css(".data-query p"));

        // Confirm "No query applied to data" is not displayed
        expect(noQueryTextEl).toEqual(null);
    });
});
