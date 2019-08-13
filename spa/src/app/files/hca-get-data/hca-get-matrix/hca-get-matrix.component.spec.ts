/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing HCA matrix modal component.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
    MatChipsModule,
    MatRadioModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule
} from "@angular/material";
import { ClipboardModule } from "ngx-clipboard";
import { Store } from "@ngrx/store";
import { RouterModule } from "@angular/router";
import { of } from "rxjs";

// App components
import { CcPipeModule } from "../../../cc-pipe";
import { ConfigService } from "../../../config/config.service";
import { FileTypeSummaryListComponent } from "../../file-type-summary-list/file-type-summary-list.component";
import { HCAExportToTerraComponent } from "../hca-export-to-terra/hca-export-to-terra.component";
import { HCAFileFilterResultComponent } from "../../hca-file-filter-result/hca-file-filter-result.component";
import { HCAFileSummaryComponent } from "../../hca-file-summary/hca-file-summary.component";
import { HCAGetManifestComponent } from "../hca-get-manifest/hca-get-manifest.component";
import { HCAGetMatrixComponent } from "./hca-get-matrix.component";
import { HCATooltipComponent } from "../../hca-tooltip/hca-tooltip.component";
import { FileFacetDisplayService } from "../../shared/file-facet-display.service";
import { FileManifestService } from "../../shared/file-manifest.service";
import { DEFAULT_FILE_SUMMARY } from "../../shared/file-summary.mock";
import { MatrixResponse } from "../../shared/matrix-response.model";
import { MatrixService } from "../../shared/matrix.service";
import { MatrixStatus } from "../../shared/matrix-status.model";
import { SearchTermService } from "../../shared/search-term.service";
import { TermResponseService } from "../../shared/term-response.service";
import { HCAGetDataPanelComponent } from "../hca-get-data-panel/hca-get-data-panel.component";
import { CopyToClipboardComponent } from "../copy-to-clipboard/copy-to-clipboard.component";
import { WarningComponent } from "../../../shared/warning/warning.component";
import { WarningContentComponent } from "../../../shared/warning/warning-content.component";
import { WarningTitleComponent } from "../../../shared/warning/warning-title.component";

describe("HCAGetMatrixComponent", () => {

    let component: HCAGetMatrixComponent;
    let fixture: ComponentFixture<HCAGetMatrixComponent>;
    let matrixService: MatrixService;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                HCAGetDataPanelComponent,
                CopyToClipboardComponent,
                HCAGetMatrixComponent,
                HCAExportToTerraComponent,
                HCAFileFilterResultComponent,
                HCAFileSummaryComponent,
                FileTypeSummaryListComponent,
                HCAGetManifestComponent,
                HCATooltipComponent,
                WarningComponent,
                WarningContentComponent,
                WarningTitleComponent
            ],
            imports: [
                BrowserAnimationsModule,
                CcPipeModule,
                ClipboardModule,
                FormsModule,
                MatChipsModule,
                MatIconModule,
                MatProgressSpinnerModule,
                MatRadioModule,
                MatTooltipModule,
                RouterModule
            ],
            providers: [
                MatrixService,
                ConfigService,
                SearchTermService,
                TermResponseService,
                {
                    provide: HttpClient,
                    useValue: jasmine.createSpyObj("HttpClient", [
                        "get"
                    ])
                }, {
                provide: FileFacetDisplayService,
                    useValue: jasmine.createSpyObj("FileFacetDisplayService", [
                        "getFileFacetDisplayName"
                    ])
                }, {
                    provide: FileManifestService,
                    useValue: jasmine.createSpyObj("FileManifestService", [
                        "requestFileManifestUrl"
                    ])
                }, {
                    provide: Store,
                    useValue: testStore
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HCAGetMatrixComponent);
        component = fixture.componentInstance;
        matrixService = fixture.debugElement.injector.get(MatrixService);
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm file summary is displayed on init of state
     */
    it("should display output type on init of state", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY),
            of([]),
            of(["csv", "loom", "mtx"]),
            of({
                eta: "",
                matrixUrl: "",
                message: "",
                requestId: "",
                status: MatrixStatus.NOT_STARTED
            } as MatrixResponse),
            of(false)
        );

        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.querySelector("mat-radio-group")).not.toBe(null);
    });
});
