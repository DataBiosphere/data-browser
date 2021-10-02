/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for FileLocationCopyComponent.
 */

// Core dependencies
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from "@angular/core/testing";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTooltipModule } from "@angular/material/tooltip";
import { By } from "@angular/platform-browser";
import { ClipboardModule } from "ngx-clipboard";
import { filter } from "rxjs/operators";

// App dependencies
import { FileLocationCopyComponent } from "./file-location-copy.component";
import { FileLocationStatus } from "../file-location-status.model";

describe("FileLocationCopyComponent", () => {

    let component: FileLocationCopyComponent;
    let fixture: ComponentFixture<FileLocationCopyComponent>;

    beforeEach(waitForAsync(() => {

        TestBed.configureTestingModule({
            declarations: [
                FileLocationCopyComponent
            ],
            imports: [
                BrowserAnimationsModule,
                ClipboardModule,
                MatProgressSpinnerModule,
                MatTooltipModule
            ],
            providers: []
        }).compileComponents();

        fixture = TestBed.createComponent(FileLocationCopyComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Confirm click handler is on click of copy icon.
     */
    it("triggers click handler on click of copy icon", () => {

        component.fileUrl = "fileUrl";
        fixture.detectChanges();
        
        const onFileLocationRequested = spyOn(component, "onFileLocationRequested");
        const copyDE = fixture.debugElement.query(By.css(".copy-not-started"));

        // Execute click on link
        copyDE.triggerEventHandler("click", null);
        expect(onFileLocationRequested).toHaveBeenCalled();
    });

    /**
     * Confirm output is emitted on click of copy icon.
     */
    it("emits request output on click of copy icon", () => {

        component.fileUrl = "fileUrl";
        fixture.detectChanges();

        spyOn(component.fileLocationRequested, "emit");
        const copyDE = fixture.debugElement.query(By.css(".copy-not-started"));

        // Execute click on link
        copyDE.triggerEventHandler("click", null);
        expect(component.fileLocationRequested.emit).toHaveBeenCalled();
    });
    
    /**
     * Confirm spinner is displayed if file location is in progress.
     */
    it("displays spinner when file location is in progress", () => {

        const viewState$ = component.viewState$;
        viewState$.next(FileLocationStatus.IN_PROGRESS);
        fixture.detectChanges();

        const spinnerDE = fixture.debugElement.query(By.css(".copy-in-progress"));
        expect(spinnerDE).toBeTruthy();
    });

    /**
     * Confirm error image is displayed if file location has failed.
     */
    it("displays error if file location failed", () => {

        const viewState$ = component.viewState$;
        viewState$.next(FileLocationStatus.FAILED);
        fixture.detectChanges();

        const failedDE = fixture.debugElement.query(By.css(".copy-error"));
        expect(failedDE).toBeTruthy();
    });

    /**
     * Confirm check mark is displayed on file location completed..
     */
    it("displays check mark when file location completes", () => {

        component.fileLocation = {
            fileUrl: "fileUrl",
            status: FileLocationStatus.COMPLETED
        };
        const viewState$ = component.viewState$;
        viewState$.next(FileLocationStatus.COMPLETED);
        fixture.detectChanges();

        const completeDE = fixture.debugElement.query(By.css(".copy-complete"));
        expect(completeDE).toBeTruthy();
    });

    /**
     * Confirm file location is copied to clipboard once file location is completed.
     */
    it("copies to clipboard when file location completes", fakeAsync(() => {

        spyOn(component["copyToClipboardService"], "copy").and.callThrough();
        component.fileLocation = {
            fileUrl: "fileUrl",
            status: FileLocationStatus.COMPLETED
        };
        const viewState$ = component.viewState$;
        viewState$.next(FileLocationStatus.COMPLETED);
        fixture.detectChanges();

        // Simulate wait for async to complete
        tick(2000);

        expect(component["copyToClipboardService"].copy).toHaveBeenCalled();
    }));

    /**
     * Confirm copied tooltip is displayed once file location is completed.
     */
    it("displays to copied tooltip when file location completes", fakeAsync(() => {

        component.fileLocation = {
            fileUrl: "fileUrl",
            status: FileLocationStatus.COMPLETED
        };
        const viewState$ = component.viewState$;
        viewState$.next(FileLocationStatus.COMPLETED);
        fixture.detectChanges();

        // Tooltip should now be visible
        spyOn(component["matTooltip"], "show").and.callThrough();

        // Simulate wait for async to complete
        tick(2000);

        expect(component["matTooltip"].show).toHaveBeenCalled();
    }));

    /**
     * Confirm component view state is reset after file location is completed.
     */
    it("resets view state after file location is copied", fakeAsync(() => {

        spyOn<any>(component, "resetViewState").and.callThrough();
        component.fileLocation = {
            fileUrl: "fileUrl",
            status: FileLocationStatus.COMPLETED
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

        component.fileLocation = {
            fileUrl: "fileUrl",
            status: FileLocationStatus.COMPLETED
        };
        const viewState$ = component.viewState$;
        viewState$.next(FileLocationStatus.COMPLETED);
        fixture.detectChanges();

        viewState$.pipe(
            filter(viewState => viewState !== FileLocationStatus.COMPLETED)
        ).subscribe((viewState) => {
            
            expect(viewState).toEqual(FileLocationStatus.NOT_STARTED);
            doneFn();
        });
    });
});
