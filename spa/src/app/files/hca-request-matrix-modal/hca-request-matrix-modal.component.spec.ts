/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing HCA matrix modal component.
 */

// Core dependencies
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {
    MatChipsModule,
    MatDialogModule,
    MatDialogRef,
    MatRadioModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule
} from "@angular/material";
import { ClipboardModule } from "ngx-clipboard";
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Store } from "@ngrx/store";
import { of } from "rxjs";

// App components
import { CcPipeModule } from "../../cc-pipe";
import { ConfigService } from "../../config/config.service";
import { FileTypeSummaryListComponent } from "../file-type-summary-list/file-type-summary-list.component";
import { HCARequestMatrixModalComponent } from "./hca-request-matrix-modal.component";
import { HCAFileSummaryComponent } from "../hca-file-summary/hca-file-summary.component";
import { HCAFileFilterResultComponent } from "../hca-file-filter-result/hca-file-filter-result.component";
import { HCATooltipComponent } from "../hca-tooltip/hca-tooltip.component";
import { HCADownloadManifestComponent } from "../hca-download-manifest/hca-download-manifest.component";
import { HCAExportToTerraModalComponent } from "../hca-export-to-terra-modal/hca-export-to-terra-modal.component";
import { HCAExportToTerraComponent } from "../hca-export-to-terra/hca-export-to-terra.component";
import { HCARequestMatrixComponent } from "../hca-request-matrix/hca-request-matrix.component";
import { MatrixService } from "../shared/matrix.service";
import { DEFAULT_FILE_SUMMARY } from "../shared/file-summary.mock";
import { FileFacetDisplayService } from "../shared/file-facet-display.service";
import { MatrixStatus } from "../shared/matrix-status.model";
import { SearchTermService } from "../shared/search-term.service";
import { TermResponseService } from "../shared/term-response.service";
import { FileManifestService } from "../shared/file-manifest.service";
import { MatrixResponse } from "../shared/matrix-response.model";

describe("HCARequestMatrixModalComponent", () => {

    let component: HCARequestMatrixModalComponent;
    let fixture: ComponentFixture<HCARequestMatrixModalComponent>;
    let matrixService: MatrixService;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                HCARequestMatrixModalComponent,
                HCAExportToTerraComponent,
                HCAExportToTerraModalComponent,
                HCAFileFilterResultComponent,
                HCAFileSummaryComponent,
                FileTypeSummaryListComponent,
                HCADownloadManifestComponent,
                HCARequestMatrixComponent,
                HCARequestMatrixModalComponent,
                HCATooltipComponent
            ],
            imports: [
                ClipboardModule,
                FormsModule,
                MatDialogModule,
                MatRadioModule,
                BrowserAnimationsModule,
                CcPipeModule,
                MatChipsModule,
                MatIconModule,
                MatProgressSpinnerModule,
                MatTooltipModule
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
                }, {
                    provide: MatDialogRef,
                    useValue: {}
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HCARequestMatrixModalComponent);
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
    it("should display file summary on init of state", () => {

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
            } as MatrixResponse)
        );

        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.querySelector("hca-file-summary")).not.toBe(null);
    });

    /**
     * Confirm action buttons are displayed on completion of matrix request
     */
    it("should display action buttons on completion of matrix request", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY),
            of([]),
            of(["csv", "loom", "mtx"]),
            of({
                eta: "",
                matrixUrl: "http://matrix-url.com",
                message: "matrix message",
                requestId: "123abc",
                status: MatrixStatus.COMPLETE
            } as MatrixResponse)
        );

        fixture.detectChanges();

        // Update matrix service to indicate response is complete
        spyOn(matrixService, "isMatrixUrlRequestCompleted").and.returnValue(true);

        fixture.detectChanges();

        // Confirm there are three action buttons - Download, Download As, Copy
        const buttonDEs = fixture.debugElement.queryAll(
            By.css("button")
        );
        expect(buttonDEs.length).toEqual(3);
    });

    /**
     * Confirm copy button is set up with copy to clipboard functionality.
     */
    it("should be able to copy to clipboard", () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY),
            of([]),
            of(["csv", "loom", "mtx"]),
            of({
                eta: "",
                matrixUrl: "http://matrix-url.com",
                message: "matrix message",
                requestId: "123abc",
                status: MatrixStatus.COMPLETE
            } as MatrixResponse)
        );

        fixture.detectChanges();

        // Update matrix service to indicate response is complete
        spyOn(matrixService, "isMatrixUrlRequestCompleted").and.returnValue(true);

        fixture.detectChanges();

        const copyButtonDE = fixture.debugElement.query(
            By.css("[ngxclipboard]")
        );
        expect(copyButtonDE).toBeTruthy();
    });

    /**
     * Confirm matrix URL is contained in the copy button.
     */
    it("should contain matrix URL in copy button", () => {

        // Set up initial component state
        const matrixUrl = "http://matrix-url.com";
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY),
            of([]),
            of(["csv", "loom", "mtx"]),
            of({
                eta: "",
                matrixUrl: matrixUrl,
                message: "matrix message",
                requestId: "123abc",
                status: MatrixStatus.COMPLETE
            } as MatrixResponse)
        );

        fixture.detectChanges();

        // Update matrix service to indicate response is complete
        spyOn(matrixService, "isMatrixUrlRequestCompleted").and.returnValue(true);

        fixture.detectChanges();

        const copyButtonDE = fixture.debugElement.query(
            By.css("[ngxclipboard]")
        );
        expect(copyButtonDE.nativeElement.getAttribute("ng-reflect-cb-content")).toEqual(matrixUrl);
    });

    /**
     * Confirm only matrix URL is returned when requesting the matrix link for the copy button.
     */
    it("should contain only contain matrix URL in copy link", () => {

        // Update state of matrix request to complete
        const matrixResponse = {
            eta: "",
            matrixUrl: "http://matrix-url.com",
            message: "matrix message",
            requestId: "123abc",
            status: MatrixStatus.COMPLETE
        };
        const copyLink = component.getCopyToClipboardValue(matrixResponse);
        expect(copyLink).toEqual(matrixResponse.matrixUrl);
    });
});
