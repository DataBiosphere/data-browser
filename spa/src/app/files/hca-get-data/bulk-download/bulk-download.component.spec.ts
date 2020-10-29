/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for HCAGetManifest.
 */

// Core dependencies
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Store } from "@ngrx/store";
import { ClipboardModule } from "ngx-clipboard";

// App dependencies
import { ConfigService } from "../../../config/config.service";
import { BulkDownloadComponent } from "./bulk-download.component";
import { DisplayDataLinkComponent } from "../display-data-link/display-data-link.component";
import { FileTypeSummaryListComponent } from "../../file-type-summary-list/file-type-summary-list.component";
import { HCAGetDataPanelComponent } from "../hca-get-data-panel/hca-get-data-panel.component";
import { PipeModule } from "../../../pipe/pipe.module";
import { SearchTermHttpService } from "../../search/http/search-term-http.service";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { CopyToClipboardComponent } from "../../../shared/copy-to-clipboard/copy-to-clipboard.component";
import { FileManifestService } from "../../shared/file-manifest.service";
import { TermSortService } from "../../sort/term-sort.service";

describe("BulkDownloadComponent", () => {

    let component: BulkDownloadComponent;
    let fixture: ComponentFixture<BulkDownloadComponent>;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    /**
     * Setup before each test.
     */
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent,
                DisplayDataLinkComponent,
                FileTypeSummaryListComponent,
                HCAGetDataPanelComponent,
                BulkDownloadComponent
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

        fixture = TestBed.createComponent(BulkDownloadComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Confirm "Select Manifest File Types" is displayed when download status is not started.
     */
    it(`generates curl`, () => {
        
        const url = "http://test.com";
        const curl = component.getUrlCommand(url);
        expect(curl).toEqual(`curl "${url}" | curl -K -`);
    });
});
