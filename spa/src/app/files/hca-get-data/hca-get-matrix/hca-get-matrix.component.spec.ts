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
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ClipboardModule } from "ngx-clipboard";
import { Store } from "@ngrx/store";
import { RouterModule } from "@angular/router";
import { of } from "rxjs";

// App components
import { ConfigService } from "../../../config/config.service";
import { CopyToClipboardComponent } from "../copy-to-clipboard/copy-to-clipboard.component";
import { HCAGetDataPanelComponent } from "../hca-get-data-panel/hca-get-data-panel.component";
import { HCAGetMatrixComponent } from "./hca-get-matrix.component";
import { MatrixUrlRequestFormComponent } from "../matrix-url-request-form/matrix-url-request-form.component";
import { MatrixUrlRequestProgressComponent } from "../matrix-url-request-progress/matrix-url-request-progress.component";
import { MatrixPartialQueryMatchWarningComponent } from "../matrix-partial-query-match-warning/matrix-partial-query-match-warning.component";
import { FileManifestService } from "../../shared/file-manifest.service";
import { MatrixService } from "../../shared/matrix.service";
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
                // HCAExportToTerraComponent,
                // HCAFileFilterResultComponent,
                // HCAFileSummaryComponent,
                // FileTypeSummaryListComponent,
                MatrixPartialQueryMatchWarningComponent,
                MatrixUrlRequestFormComponent,
                MatrixUrlRequestProgressComponent,
                // HCAGetManifestComponent,
                // HCATooltipComponent,
                WarningComponent,
                WarningContentComponent,
                WarningTitleComponent
            ],
            imports: [
                // BrowserAnimationsModule,
                // CcPipeModule,
                ClipboardModule,
                FormsModule,
                // MatChipsModule,
                MatIconModule,
                // MatProgressSpinnerModule,
                MatRadioModule,
                // MatTooltipModule,
                // RouterModule
            ],
            providers: [
                MatrixService,
                ConfigService,
                {
                    provide: HttpClient,
                    useValue: jasmine.createSpyObj("HttpClient", [
                        "get"
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
});
