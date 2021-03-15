/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing support request form.
 */

// Core dependencies
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { By } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { of } from "rxjs";

// App dependencies
import { AttachmentErrorComponent } from "../attachment-error/attachment-error.component";
import { DropzoneComponent } from "../../dropzone/dropzone.component";
import { DropErrorCode } from "../../dropzone/drop-error-code.model";
import { DropzoneModule } from "../../dropzone/dropzone.module";
import { AttachmentDropRejectAction } from "../_ngrx/attachment-drop-reject.action";
import { CreateSupportRequestRequestAction } from "../_ngrx/create-support-request-request.action";
import { DeleteAttachmentAction } from "../_ngrx/delete-attachment.action";
import { ResetSupportRequestAction } from "../_ngrx/reset-support-request.action";
import { SupportRequestState } from "../_ngrx/support-request.state";
import { UploadAttachmentRequestAction } from "../_ngrx/upload-attachment-request.action";
import { SharedModule } from "../../shared/shared.module";
import { SupportRequestComponent } from "../support-request.component";
import { SupportRequestButtonComponent } from "../support-request-button/support-request-button.component";
import { SupportRequestErrorComponent } from "../support-request-error/support-request-error.component";
import { SupportRequestFormComponent } from "./support-request-form.component";
import { SupportRequestService } from "../support-request.service";
import { SupportRequestSubmittedComponent } from "../support-request-submitted/support-request-submitted.component";
import { SupportRequestType } from "../support-request-type.model";

describe("SupportRequestForm", () => {

    let component: SupportRequestFormComponent;
    let fixture: ComponentFixture<SupportRequestFormComponent>;
    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);
    const windowMock = {
        location: {
            href: "http://test.com"
        }
    };

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                AttachmentErrorComponent,
                DropzoneComponent,
                SupportRequestButtonComponent,
                SupportRequestComponent,
                SupportRequestErrorComponent,
                SupportRequestFormComponent,
                SupportRequestSubmittedComponent,
                SupportRequestFormComponent
            ],
            imports: [
                DropzoneModule,
                FormsModule,
                MatProgressSpinnerModule,
                MatSelectModule,
                ReactiveFormsModule,
                SharedModule
            ],
            providers: [
                {
                    provide: SupportRequestService,
                    userValue: jasmine.createSpyObj("SupportRequestService", ["createSupportRequest", "uploadAttachment"])
                },
                {
                    provide: Store,
                    useValue: testStore
                },
                {
                    provide: "Window",
                    useValue: windowMock
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SupportRequestFormComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Confirm subject field is required.
     */
    it ("marks empty subject field as invalid", () => {

        testStore.pipe.and.returnValues(of({
            ...SupportRequestState.getDefaultState().supportRequest
        }));

        const formGroup = component.supportRequestGroup;
        const control = formGroup.controls["subject"];
        control.setValue("");
        fixture.detectChanges();
        expect(control.hasError("required")).toBeTruthy();
    });

    /**
     * Confirm description field is required.
     */
    it ("marks empty description field as invalid", () => {

        testStore.pipe.and.returnValues(of({
            ...SupportRequestState.getDefaultState().supportRequest
        }));

        const formGroup = component.supportRequestGroup;
        const control = formGroup.controls["description"];
        control.setValue("");
        fixture.detectChanges();
        expect(control.hasError("required")).toBeTruthy();
    });

    /**
     * Confirm name field is required.
     */
    it ("marks empty name field as invalid", () => {

        testStore.pipe.and.returnValues(of({
            ...SupportRequestState.getDefaultState().supportRequest
        }));

        const formGroup = component.supportRequestGroup;
        const control = formGroup.controls["name"];
        control.setValue("");
        fixture.detectChanges();
        expect(control.hasError("required")).toBeTruthy();
    });

    /**
     * Confirm email field is required.
     */
    it ("marks empty email field as invalid", () => {

        testStore.pipe.and.returnValues(of({
            ...SupportRequestState.getDefaultState().supportRequest
        }));

        const formGroup = component.supportRequestGroup;
        const control = formGroup.controls["email"];
        control.setValue("");
        fixture.detectChanges();
        expect(control.hasError("required")).toBeTruthy();
    });

    /**
     * Send button is disabled if form is invalid.
     */
    it("disables send button if form is invalid", () => {

        testStore.pipe.and.returnValues(of({
            ...SupportRequestState.getDefaultState().supportRequest
        }));

        // Confirm subject field is empty (this is a required field)
        const formGroup = component.supportRequestGroup;
        const control = formGroup.controls["subject"];
        control.setValue("");
        fixture.detectChanges();

        const submitBtnDE = fixture.debugElement.query(By.css(".support-request-button-submit"));
        expect(submitBtnDE.nativeElement.disabled).toBeTruthy();
    });

    /**
     * Dispatches delete action on delete of attachment.
     */
    it("dispatches delete action on delete of attachment", () => {

        testStore.pipe.and.returnValues(of({
            ...SupportRequestState.getDefaultState().supportRequest
        }));

        component.onAttachmentDeleted();

        const expectedAction = new DeleteAttachmentAction();
        expect(testStore.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    /**
     * Dispatches upload action on drop of attachment.
     */
    it("dispatches upload action on drop of attachment", () => {

        testStore.pipe.and.returnValues(of({
            ...SupportRequestState.getDefaultState().supportRequest
        }));

        const files = [{} as File] as any;
        component.onAttachmentDropped(files);

        const expectedAction = new UploadAttachmentRequestAction(files[0]);
        expect(testStore.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    /**
     * Dispatches submit action on submit of form.
     */
    it("dispatches submit action on submit of form", () => {

        testStore.pipe.and.returnValues(of({
            ...SupportRequestState.getDefaultState().supportRequest
        }));

        const formGroup = component.supportRequestGroup;

        formGroup.setValue({
            description: "description",
            email: "first@last.com",
            name: "first last",
            subject: "subject",
            type: SupportRequestType.QUESTION
        });

        const formGroupValue = formGroup.value;
        const attachmentToken = "123";

        component.onSupportRequestSubmitted(formGroup, attachmentToken);

        const expectedAction = new CreateSupportRequestRequestAction({
            ...formGroupValue,
            attachmentToken,
            requestedFromUrl: windowMock.location.href
        }); 
        expect(testStore.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    /**
     * Check support request post model is built correctly.
     */
    it("builds support request model", () => {

        testStore.pipe.and.returnValues(of({
            ...SupportRequestState.getDefaultState().supportRequest
        }));

        const formGroup = component.supportRequestGroup;
        formGroup.setValue({
            description: "description",
            email: "first@last.com",
            name: "first last",
            subject: "subject",
            type: SupportRequestType.QUESTION
        });

        const formGroupValue = formGroup.value;
        const attachmentToken = "123";
        const requestedFromUrl = windowMock.location.href;
        const supportRequest = component["buildSupportRequest"](formGroup, attachmentToken, requestedFromUrl);
        expect(supportRequest).toEqual({
            ...formGroupValue,
            attachmentToken,
            requestedFromUrl
        });
    });

    /**
     * Dispatches rejected action if file is rejected on drop.
     */
    it("dispatches attachment rejected action on drop of file that is too large", () => {

        testStore.pipe.and.returnValues(of({
            ...SupportRequestState.getDefaultState().supportRequest
        }));

        const dropError = {
            code: DropErrorCode.FILE_TOO_LARGE,
            message: "File is larger than 2MB bytes"
        };

        component.onAttachmentRejected(dropError);
        fixture.detectChanges();
        
        const expectedAction = new AttachmentDropRejectAction(dropError);
        expect(testStore.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    /**
     * Displays error message on drop of file that is too large.
     */
    it("displays error message on drop of file that is too large", () => {

        const dropError = {
            code: DropErrorCode.FILE_TOO_LARGE,
            message: "File is larger than 2MB bytes"
        };

        testStore.pipe.and.returnValues(of({
            ...SupportRequestState.getDefaultState().supportRequest,
            attachmentRejected: true,
            attachmentRejection: dropError
        }));

        fixture.detectChanges();

        const submitBtnDEs = fixture.debugElement.queryAll(By.css(".support-request-error.field"));
        expect(submitBtnDEs.length).toEqual(1);
    });

    /**
     * Displays error message on upload error of attachment.
     */
    it("displays error message on upload error of file", () => {

        testStore.pipe.and.returnValues(of({
            ...SupportRequestState.getDefaultState().supportRequest,
            attachmentUploadError: true
        }));

        fixture.detectChanges();

        const submitBtnDEs = fixture.debugElement.queryAll(By.css(".support-request-error.field"));
        expect(submitBtnDEs.length).toEqual(1);
    });

    /**
     * Displays error message on error of submit.
     */
    it("displays error message on submit error", () => {

        testStore.pipe.and.returnValues(of({
            ...SupportRequestState.getDefaultState().supportRequest,
            submitError: true
        }));

        fixture.detectChanges();

        const submitBtnDEs = fixture.debugElement.queryAll(By.css(".support-request-error.submit"));
        expect(submitBtnDEs.length).toEqual(1);
    });

    /**
     * Displays thank you on successful submit.
     */
    it("displays thank you on successful submit", () => {

        testStore.pipe.and.returnValues(of({
            ...SupportRequestState.getDefaultState().supportRequest,
            submitted: true
        }));

        fixture.detectChanges();

        const submitBtnDEs = fixture.debugElement.queryAll(By.css("support-request-submitted"));
        expect(submitBtnDEs.length).toEqual(1);
    });

    /**
     * Dispatches reset action on destroy of form.
     */
    it("dispatches reset action on destroy of form", () => {

        testStore.pipe.and.returnValues(of({
            ...SupportRequestState.getDefaultState().supportRequest
        }));

        component.ngOnDestroy();

        const expectedAction = new ResetSupportRequestAction();
        expect(testStore.dispatch).toHaveBeenCalledWith(expectedAction);
    });
});
