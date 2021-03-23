/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for BaseManifestDownloadComponent.
 */

// Core dependencies
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Store } from "@ngrx/store";
import { ClipboardModule } from "ngx-clipboard";

// App dependencies
import { BaseManifestDownloadComponent } from "./base-manifest-download.component";
import { ConfigService } from "../../../config/config.service";
import { DataLinkComponent } from "../data-link/data-link.component";
import { FileTypeSummaryListComponent } from "../../file-type-summary-list/file-type-summary-list.component";
import { GetDataPanelComponent } from "../get-data-panel/get-data-panel.component";
import { PipeModule } from "../../../pipe/pipe.module";
import { SearchTermHttpService } from "../../search/http/search-term-http.service";
import { SearchFacetTerm } from "../../search/search-facet-term.model";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { CopyToClipboardComponent } from "../../../shared/copy-to-clipboard/copy-to-clipboard.component";
import { FileManifestService } from "../../shared/file-manifest.service";
import { DEFAULT_FILE_SUMMARY } from "../../shared/file-summary.mock";
import { TermSortService } from "../../sort/term-sort.service";

describe("BaseManifestDownloadComponent", () => {

    let component: BaseManifestDownloadComponent;
    let fixture: ComponentFixture<BaseManifestDownloadComponent>;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    // Search terms with file format selected
    const SEARCH_TERMS_WITH_FILE_FORMAT = [
        new SearchFacetTerm("fileFormat", "fastq", 123),
        new SearchFacetTerm("disease", "ESRD", 8),
        new SearchFacetTerm("genusSpecies", "Homo sapiens", 20)
    ];
    
    // Empty file summary
    const FILE_SUMMARY_EMPTY = {
        "donorCount": 0,
        "fileCount": 0,
        "fileTypeSummaries": [],
        "organTypes": [],
        "projectCount": 0,
        "specimenCount": 0,
        "totalCellCount": 0,
        "totalFileSize": 0
    };

    /**
     * Setup before each test.
     */
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent,
                DataLinkComponent,
                FileTypeSummaryListComponent,
                GetDataPanelComponent,
                BaseManifestDownloadComponent
            ],
            imports: [
                ClipboardModule,
                MatIconModule,
                MatTooltipModule,
                PipeModule
            ],
            providers: [
                {
                    provide: ConfigService,
                    useValue: jasmine.createSpyObj("ConfigService", ["getPortalUrl"])
                },
                {
                    provide: GTMService,
                    useValue: jasmine.createSpyObj("GTMService", [
                        "trackEvent"
                    ])
                },
                {
                    provide: FileManifestService,
                    useValue: jasmine.createSpyObj("FileManifestService", [
                        "trackRequestCohortManifest",
                        "trackDownloadCohortManifest",
                        "trackCopyToClipboardCohortManifestLink",
                        "trackDownloadProjectManifest",
                        "trackCopyToClipboardProjectManifestLink"
                    ])
                },
                {
                    provide: SearchTermHttpService,
                    useValue: jasmine.createSpyObj("SearchTermHttpService", ["bindSearchTerms", "marshallSearchTerms"])
                },
                {
                    provide: Store,
                    useValue: testStore
                },
                {
                    provide: TermSortService,
                    useValue: jasmine.createSpyObj("TermSortService", ["sortTerms"])
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(BaseManifestDownloadComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Confirm get file type summaries returns an empty array when file summaries is empty.
     */
    it("returns empty array of file type summaries when file summaries is empty", () => {

        // Confirm get file type summaries returns an empty array, when file summaries is empty - first execute the
        // method and then confirm the returned value is an empty array.
        const fileTypeSummaries = component.getFileTypeSummaries(FILE_SUMMARY_EMPTY);
        expect(fileTypeSummaries).toEqual([]);
    });

    /**
     * Confirm get file type summaries returns file type summaries when file summaries is not empty.
     */
    it("returns file type summaries array when file summaries is not empty", () => {

        // Confirm get file type summaries returns file type summaries, when file summaries is not empty - first execute the
        // method and then confirm the returned value is equal to the DEFAULT_FILE_SUMMARY file type summaries.
        const fileTypeSummaries = component.getFileTypeSummaries(DEFAULT_FILE_SUMMARY);
        expect(fileTypeSummaries).toEqual(DEFAULT_FILE_SUMMARY.fileTypeSummaries);
    });

    /**
     * Confirm any file format selected returns false when no "fileFormat" facet terms are selected.
     */
    it(`returns false when no "fileFormat" facet terms are selected`, () => {

        // Confirm any file format selected returns false, when no "fileFormat" facet terms are selected - first execute the
        // method and then confirm the returned value is false.
        const anyFormatSelected = component.isAnyFileFormatSelected([]);
        expect(anyFormatSelected).toEqual(false);
    });

    /**
     * Confirm any file format selected returns true when "fileFormat" facet terms are selected.
     */
    it(`returns true when "fileFormat" facet terms are selected`, () => {

        // Confirm any file format selected returns true, when "fileFormat" facet terms are selected - first execute the
        // method and then confirm the returned value is true.
        const anyFormatSelected = component.isAnyFileFormatSelected(SEARCH_TERMS_WITH_FILE_FORMAT);
        expect(anyFormatSelected).toEqual(true);
    });

    /**
     * Confirm file type summaries empty returns true when file summary is empty.
     */
    it("returns true when file summary is empty", () => {

        // Confirm file type summaries empty returns true, when file summary is empty - first execute the
        // method and then confirm the returned value is true.
        const fileTypeSummariesEmpty = component.isFileTypeSummariesEmpty(FILE_SUMMARY_EMPTY);
        expect(fileTypeSummariesEmpty).toEqual(true);
    });

    /**
     * Confirm file type summaries empty returns false when file summary is not empty.
     */
    it("returns false when file summary is not empty", () => {

        // Confirm file type summaries empty returns false, when file summary is not empty - first execute the
        // method and then confirm the returned value is false.
        const fileTypeSummariesEmpty = component.isFileTypeSummariesEmpty(DEFAULT_FILE_SUMMARY);
        expect(fileTypeSummariesEmpty).toEqual(false);
    });
});
