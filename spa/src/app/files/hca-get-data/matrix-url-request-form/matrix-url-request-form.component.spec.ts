/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing HCA matrix URL request form.
 */

// Core dependencies
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatRadioModule } from "@angular/material/radio";
import { ClipboardModule } from "ngx-clipboard";

// App components
import { CopyToClipboardComponent } from "../copy-to-clipboard/copy-to-clipboard.component";
import { HCAGetDataPanelComponent } from "../hca-get-data-panel/hca-get-data-panel.component";
import { MatrixPartialQueryMatchWarningComponent } from "../matrix-partial-query-match-warning/matrix-partial-query-match-warning.component";
import { MatrixUrlRequestFormComponent } from "./matrix-url-request-form.component";
import { WarningComponent } from "../../../shared/warning/warning.component";
import { WarningContentComponent } from "../../../shared/warning/warning-content.component";
import { WarningTitleComponent } from "../../../shared/warning/warning-title.component";

describe("MatrixUrlRequestForm", () => {

    let component: MatrixUrlRequestFormComponent;
    let fixture: ComponentFixture<MatrixUrlRequestFormComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent,
                HCAGetDataPanelComponent,
                MatrixPartialQueryMatchWarningComponent,
                MatrixUrlRequestFormComponent,
                WarningComponent,
                WarningContentComponent,
                WarningTitleComponent
            ],
            imports: [
                ClipboardModule,
                FormsModule,
                MatIconModule,
                MatRadioModule
            ],
            providers: []
        }).compileComponents();

        fixture = TestBed.createComponent(MatrixUrlRequestFormComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm file format is displayed on init of state
     */
    it("should display matrix file formats on init of state", () => {

        component.fileFormats = ["csv", "loom", "mtx"];
        component.matrixPartialQueryMatchCompleted = true;
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.querySelector("mat-radio-group")).not.toBe(null);
    });
});
