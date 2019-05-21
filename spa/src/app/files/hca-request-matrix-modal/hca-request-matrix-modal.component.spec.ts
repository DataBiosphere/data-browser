/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing HCA matrix modal component.
 */

// Core dependencies
import { FormsModule } from "@angular/forms";
import { async, ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
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
import { HCARequestMatrixModalComponent } from "./hca-request-matrix-modal.component";
import { HCAFileSummaryComponent } from "../hca-file-summary/hca-file-summary.component";
import { HCAFileFilterResultComponent } from "../hca-file-filter-result/hca-file-filter-result.component";
import { HCATooltipComponent } from "../hca-tooltip/hca-tooltip.component";
import { HCADownloadManifestComponent } from "../hca-download-manifest/hca-download-manifest.component";
import { HCARequestMatrixComponent } from "../hca-request-matrix/hca-request-matrix.component";
import { MatrixService } from "../shared/matrix.service";
import { DEFAULT_FILE_SUMMARY } from "../shared/file-summary.mock";
import { FileFacetDisplayService } from "../shared/file-facet-display.service";
import { MatrixStatus } from "../shared/matrix-status.model";
import { MatrixDAO } from "../shared/matrix.dao";

describe("HCARequestMatrixModalComponent", () => {

    let component: HCARequestMatrixModalComponent;
    let fixture: ComponentFixture<HCARequestMatrixModalComponent>;
    let matrixService: MatrixService;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                HCARequestMatrixModalComponent,
                HCAFileFilterResultComponent,
                HCAFileSummaryComponent,
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
            {
                provide: MatrixDAO,
                useValue: jasmine.createSpyObj("MatrixDAO", [
                    "fetchFileFormats"
                ])
            }, {
                provide: FileFacetDisplayService,
                useValue: jasmine.createSpyObj("FileFacetDisplayService", [
                    "getFileFacetDisplayName"
                ])
            }, {
                provide: Store,
                useValue: testStore
            }, {
                provide: MatDialogRef,
                useValue: {}
            }]
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
            of(["csv", "loom", "mtx"])
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
            of(["csv", "loom", "mtx"])
        );

        fixture.detectChanges();

        // Update state of matrix request to complete
        const matrixResponse = {
            eta: "",
            matrixUrl: "http://matrix-url.com",
            message: "matrix message",
            requestId: "123abc",
            status: MatrixStatus.COMPLETE
        };
        component.matrixResponse$.next(matrixResponse);

        // Update matrix service to indicate response is complete 
        const spy = spyOn(matrixService, "isMatrixRequestCompleted").and.returnValue(true);
        
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
            of(["csv", "loom", "mtx"])
        );

        fixture.detectChanges();

        // Update state of matrix request to complete
        const matrixResponse = {
            eta: "",
            matrixUrl: "http://matrix-url.com",
            message: "matrix message",
            requestId: "123abc",
            status: MatrixStatus.COMPLETE
        };
        component.matrixResponse$.next(matrixResponse);

        // Update matrix service to indicate response is complete 
        const spy = spyOn(matrixService, "isMatrixRequestCompleted").and.returnValue(true);

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
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY),
            of([]),
            of(["csv", "loom", "mtx"])
        );

        fixture.detectChanges();

        // Update state of matrix request to complete
        const matrixResponse = {
            eta: "",
            matrixUrl: "http://matrix-url.com",
            message: "matrix message",
            requestId: "123abc",
            status: MatrixStatus.COMPLETE
        };
        component.matrixResponse$.next(matrixResponse);

        // Update matrix service to indicate response is complete 
        const spy = spyOn(matrixService, "isMatrixRequestCompleted").and.returnValue(true);

        fixture.detectChanges();

        const copyButtonDE = fixture.debugElement.query(
            By.css("[ngxclipboard]")
        );
        expect(copyButtonDE.nativeElement.getAttribute("ng-reflect-cb-content")).toEqual(matrixResponse.matrixUrl);
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
