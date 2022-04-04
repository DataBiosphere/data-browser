/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for GetDataOptions.
 */

// Core dependencies
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatTooltipModule } from "@angular/material/tooltip";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";

// App dependencies
import { ConfigService } from "../../../config/config.service";
import { FacetDisplayService } from "../../facet/facet-display.service";
import { FileFacet } from "../../facet/file-facet/file-facet.model";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { GetDataPanelComponent } from "../get-data-panel/get-data-panel.component";
import { GetDataOptionsComponent } from "./get-data-options.component";
import { GetDataLayoutComponent } from "../get-data-layout/get-data-layout.component";
import { GetDataSummaryComponent } from "../get-data-summary/get-data-summary.component";
import { selectFilesFacets } from "../../_ngrx/file-manifest/file-manifest.selectors";
import { FileSummaryState } from "../../_ngrx/file-summary/file-summary.state";
import {
    selectFileSummary,
    selectSelectedEntitySpec,
} from "../../_ngrx/files.selectors";
import { selectSelectedSearchTerms } from "../../_ngrx/search/search.selectors";
import { PipeModule } from "../../../pipe/pipe.module";
import { SelectedSearchTermsComponent } from "../../search/selected-search-terms/selected-search-terms.component";
import { SelectedDataSummaryComponent } from "../selected-data-summary/selected-data-summary.component";
import { GenusSpecies } from "../../shared/genus-species.model";
import { HCASectionTitleComponent } from "../../../shared/hca-section-title/hca-section-title.component";
import { HCATabComponent } from "../../../shared/hca-tab/hca-tab.component";
import { HCATooltipComponent } from "../../../shared/hca-tooltip/hca-tooltip.component";
import { PopLayoutComponent } from "../../../shared/pop-layout/pop-layout.component";
import { Term } from "../../shared/term.model";

describe("GetDataOptionsComponent", () => {
    let component: GetDataOptionsComponent;
    let fixture: ComponentFixture<GetDataOptionsComponent>;
    let store: MockStore;

    const DOWNLOAD_DISPLAY_ORDER = ["BULK_DOWNLOAD", "MANIFEST", "TERRA"];

    /**
     * Setup before each test.
     */
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                GetDataLayoutComponent,
                GetDataOptionsComponent,
                GetDataPanelComponent,
                GetDataSummaryComponent,
                HCASectionTitleComponent,
                HCATabComponent,
                HCATooltipComponent,
                PopLayoutComponent,
                SelectedDataSummaryComponent,
                SelectedSearchTermsComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                MatTooltipModule,
                PipeModule,
                RouterTestingModule,
            ],
            providers: [
                {
                    provide: ConfigService,
                    useValue: jasmine.createSpyObj("ConfigService", [
                        "getPortalUrl",
                    ]),
                },
                FacetDisplayService,
                provideMockStore({
                    initialState: {},
                }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(GetDataOptionsComponent);
        component = fixture.componentInstance;

        // Set up selectors for children components
        store = TestBed.inject(Store) as MockStore;
        store.overrideSelector(selectFilesFacets, [
            new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
                new Term(GenusSpecies.HOMO_SAPIENS, 100, false),
            ]),
        ]);
        store.overrideSelector(
            selectFileSummary,
            FileSummaryState.getDefaultState()
        );
        store.overrideSelector(selectSelectedSearchTerms, []);

        // Set up selector for fixture
        store.overrideSelector(selectSelectedEntitySpec, {
            key: "key",
            displayName: "Key",
        });
    }));

    // Reset selectors after each test
    afterEach(() => {
        store?.resetSelectors();
    });

    /**
     * Confirm "Bulk Download" is displayed.
     */
    it(`displays "Bulk Download"`, () => {
        fixture.detectChanges();

        expect(
            isPanelHeaderDisplayed(`Download Selected Data Using "curl"`)
        ).toEqual(true);
    });

    /**
     * Confirm "Request a File Manifest (for downloading files via the HCA CLI)" is displayed.
     */
    it(`displays "Download a File Manifest with Metadata for the Selected Data"`, () => {
        fixture.detectChanges();

        // Confirm "Request a File Manifest (for downloading files via the HCA CLI)" is displayed
        expect(
            isPanelHeaderDisplayed(
                "Download a File Manifest with Metadata for the Selected Data"
            )
        ).toEqual(true);
    });

    /**
     * Confirm "Analyze in Terra" is displayed
     */
    it(`displays "Analyze in Terra"`, () => {
        fixture.detectChanges();

        // Confirm "Export to Terra" is displayed
        expect(isPanelHeaderDisplayed("Analyze in Terra")).toEqual(true);
    });

    /**
     * Returns button element for specified panel download type.
     *
     * @param {string} panelDownloadType
     * @returns {DebugElement}
     */
    function getButtonEl(panelDownloadType: string): DebugElement {
        const buttonEls = fixture.debugElement.queryAll(By.css("button"));
        const buttonIndex = DOWNLOAD_DISPLAY_ORDER.indexOf(panelDownloadType);

        return buttonEls[buttonIndex];
    }

    /**
     * Returns true if panel header is displayed.
     *
     * @param {string} panelHeaderHeading
     * @returns {boolean}
     */
    function isPanelHeaderDisplayed(panelHeaderHeading: string): boolean {
        const panelHeaderEls = fixture.debugElement.queryAll(
            By.css("get-data-panel h4")
        );

        return panelHeaderEls.some(
            (panelHeader) =>
                panelHeader.nativeElement.innerHTML === panelHeaderHeading
        );
    }

    /**
     * Returns true if panel text is displayed.
     *
     * @param {string} panelText
     * @returns {boolean}
     */
    function isPanelTextDisplayed(panelText: string): boolean {
        const panelTextEls = fixture.debugElement.queryAll(
            By.css("get-data-panel p")
        );

        return panelTextEls
            .map((panelTextEl) => panelTextEl.nativeElement.innerHTML)
            .some((panelTextHTML) => panelTextHTML === panelText);
    }
});
