/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for FileLocationDownloadComponent.
 */

// Core dependencies
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
    waitForAsync,
} from "@angular/core/testing";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { By } from "@angular/platform-browser";
import { ClipboardModule } from "ngx-clipboard";
import { filter } from "rxjs/operators";

// App dependencies
import { FileLocationStatus } from "../file-location-status.model";
import { FileLocationDownloadComponent } from "./file-location-download.component";

describe("FileLocationDownloadComponent", () => {
    let component: FileLocationDownloadComponent;
    let fixture: ComponentFixture<FileLocationDownloadComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [FileLocationDownloadComponent],
            imports: [
                BrowserAnimationsModule,
                ClipboardModule,
                MatProgressSpinnerModule,
            ],
            providers: [],
        }).compileComponents();

        fixture = TestBed.createComponent(FileLocationDownloadComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Confirm click handler is on click of download.
     */
    it("triggers click handler on click of download", () => {
        component.fileUrl = "fileUrl";
        fixture.detectChanges();

        const onFileLocationRequested = spyOn(
            component,
            "onFileLocationRequested"
        );
        const downloadDE = fixture.debugElement.query(
            By.css(".download-not-started")
        );

        // Execute click on link
        downloadDE.triggerEventHandler("click", null);
        expect(onFileLocationRequested).toHaveBeenCalled();
    });

    /**
     * Confirm output is emitted on click of download.
     */
    it("emits request output on click of download", () => {
        component.fileUrl = "fileUrl";
        fixture.detectChanges();

        spyOn(component.fileLocationRequested, "emit");
        const downloadDE = fixture.debugElement.query(
            By.css(".download-not-started")
        );

        // Execute click on link
        downloadDE.triggerEventHandler("click", null);
        expect(component.fileLocationRequested.emit).toHaveBeenCalled();
    });

    /**
     * Confirm spinner is displayed if file location is in progress.
     */
    it("displays spinner when file location is in progress", () => {
        const viewState$ = component.viewState$;
        viewState$.next(FileLocationStatus.IN_PROGRESS);
        fixture.detectChanges();

        const spinnerDE = fixture.debugElement.query(
            By.css(".download-in-progress")
        );
        expect(spinnerDE).toBeTruthy();
    });

    /**
     * Confirm error image is displayed if file location has failed.
     */
    it("displays error if file location failed", () => {
        const viewState$ = component.viewState$;
        viewState$.next(FileLocationStatus.FAILED);
        fixture.detectChanges();

        const failedDE = fixture.debugElement.query(By.css(".download-error"));
        expect(failedDE).toBeTruthy();
    });

    /**
     * Confirm check mark is displayed on file location completed..
     */
    it("displays check mark when file location completes", () => {
        component["downloadFile"] = jasmine.createSpy().and.callFake((_) => {}); // Work around for spy on private method
        component.fileLocation = {
            fileUrl: "fileUrl",
            status: FileLocationStatus.COMPLETED,
        };
        const viewState$ = component.viewState$;
        viewState$.next(FileLocationStatus.COMPLETED);
        fixture.detectChanges();

        const completeDE = fixture.debugElement.query(
            By.css(".download-complete")
        );
        expect(completeDE).toBeTruthy();
    });

    /**
     * Confirm download is triggered once file location is completed.
     */
    it("download when file location completes", fakeAsync(() => {
        component["downloadFile"] = jasmine.createSpy().and.callFake((_) => {}); // Work around for spy on private method
        component.fileLocation = {
            fileUrl: "fileUrl",
            status: FileLocationStatus.COMPLETED,
        };
        const viewState$ = component.viewState$;
        viewState$.next(FileLocationStatus.COMPLETED);
        fixture.detectChanges();

        // Simulate wait for async to complete
        tick(2000);

        expect(component["downloadFile"]).toHaveBeenCalled();
    }));

    /**
     * Confirm component view state is reset after file location is completed.
     */
    it("resets view state after file location is downloaded", fakeAsync(() => {
        component["downloadFile"] = jasmine.createSpy().and.callFake((_) => {}); // Work around for spy on private method
        spyOn<any>(component, "resetViewState").and.callThrough();
        component.fileLocation = {
            fileUrl: "fileUrl",
            status: FileLocationStatus.COMPLETED,
        };
        const viewState$ = component.viewState$;
        viewState$.next(FileLocationStatus.COMPLETED);
        fixture.detectChanges();

        // Simulate wait for async to complete
        tick(2000);

        expect(component["resetViewState"]).toHaveBeenCalled();
    }));

    /**
     * Confirm component is reset after file location is completed.
     */
    it("resets view state to NOT_STARTED", (doneFn: DoneFn) => {
        component["downloadFile"] = jasmine.createSpy().and.callFake((_) => {}); // Work around for spy on private method
        component.fileLocation = {
            fileUrl: "fileUrl",
            status: FileLocationStatus.COMPLETED,
        };
        const viewState$ = component.viewState$;
        viewState$.next(FileLocationStatus.COMPLETED);
        fixture.detectChanges();

        viewState$
            .pipe(
                filter(
                    (viewState) => viewState !== FileLocationStatus.COMPLETED
                )
            )
            .subscribe((viewState) => {
                expect(viewState).toEqual(FileLocationStatus.NOT_STARTED);
                doneFn();
            });
    });
});
