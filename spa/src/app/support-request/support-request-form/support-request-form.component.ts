/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component handling support request form functionality.
 */

// Core dependencies
import {
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, interval, Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";

// App dependencies
import { DropError } from "../../dropzone/drop-error.model";
import { DropzoneComponent } from "../../dropzone/dropzone.component";
import { AppState } from "../../_ngrx/app.state";
import { AttachmentDropRejectAction } from "../_ngrx/attachment-drop-reject.action";
import { CreateSupportRequestRequestAction } from "../_ngrx/create-support-request-request.action";
import { DeleteAttachmentAction } from "../_ngrx/delete-attachment.action";
import { ResetSupportRequestAction } from "../_ngrx/reset-support-request.action";
import { selectSupportRequestSupportRequest } from "../_ngrx/support-request.selectors";
import { UploadAttachmentRequestAction } from "../_ngrx/upload-attachment-request.action";
import { SupportRequestFormState } from "./support-request-form.state";
import { SupportRequestPost } from "../support-request-post.model";
import { SupportRequestType } from "../support-request-type.model";

@Component({
    selector: "support-request-form",
    templateUrl: "support-request-form.component.html",
    styleUrls: ["support-request-form.component.scss"]
})
export class SupportRequestFormComponent implements OnDestroy, OnInit {

    // Template variables
    public maxAttachmentSize = 20 * 1024 * 1024;
    public state$ = new BehaviorSubject<SupportRequestFormState>({
        attachmentRejected: false,
        attachmentUploadError: false,
        attachmentUploading: false,
        submitError: false,
        submitted: false,
        submitting: false
    });
    public supportRequestGroup: FormGroup;
    public typeOptions: any[];

    // Locals
    private ngDestroy$ = new Subject();
    
    // View child/ren
    @ViewChild(DropzoneComponent) dropzoneComponent: DropzoneComponent;
    
    // Output
    @Output() formDismissed = new EventEmitter<boolean>();

    /**
     * @param {Store<AppState>} store
     * @param {ElementRef} elementRef
     * @param {Window} window
     */
    constructor(private store: Store<AppState>,  private elementRef: ElementRef, @Inject("Window") private window: Window) {
        
        const descriptionFormControl = new FormControl("", Validators.required);
        const emailFormControl  = new FormControl("", [Validators.email, Validators.required]);
        const nameFormControl = new FormControl("", Validators.required);
        const subjectFormControl = new FormControl("", Validators.required);
        const typeFormControl = new FormControl(SupportRequestType.QUESTION);

        this.supportRequestGroup = new FormGroup({
            description: descriptionFormControl,
            email: emailFormControl,
            name: nameFormControl,
            subject: subjectFormControl,
            type: typeFormControl
        });
        
        this.typeOptions = [
            {value: "question", label: "Question"},
            {value: "bug", label: "Bug"},
            {value: "feature_request", label: "Feature Request"}
        ];
    }

    /**
     * Returns the value of the current selected type drop down option.
     * 
     * @param {FormGroup} formGroup
     * @returns {string}
     */
    public getSelectedTypeValue(formGroup: FormGroup): string {

        const type = formGroup.get("type").value;
        const selectedOption = this.typeOptions.find(option => option.value === type);
        return selectedOption.label;
    }

    /**
     * Remove attachment from form.
     */
    public onAttachmentDeleted() {

        this.store.dispatch(new DeleteAttachmentAction());
    }

    /**
     * Handle drop of attachment.
     * 
     * @param {FileList} files
     */
    public onAttachmentDropped(files: FileList) {

        this.store.dispatch(new UploadAttachmentRequestAction(files[0]));
    }

    /**
     * Handle error on drop of attachment.
     *
     * @param {DropError} error
     */
    public onAttachmentRejected(error: DropError) {
        
        this.store.dispatch(new AttachmentDropRejectAction(error));
    }

    /**
     * Handle click on cancel button - hide form.
     */
    public onCancelClicked() {

        this.formDismissed.emit(true);
    }

    /**
     * Handle dismiss of form.
     */
    public onFormDismissed() {

        this.formDismissed.emit(true);
    }

    /**
     * Handle submit of support request form.
     * 
     * @param {FormGroup} formGroup
     * @param {string} attachmentToken
     */
    public onSupportRequestSubmitted(formGroup: FormGroup, attachmentToken: string) {

        const supportRequest = this.buildSupportRequest(formGroup, attachmentToken, this.window.location.href);
        this.store.dispatch(new CreateSupportRequestRequestAction(supportRequest));
    }

    /**
     * Build up model of support request.
     * 
     * @param {FormGroup} formGroup
     * @param {string} attachmentToken
     * @param {string} requestedFromUrl
     * @returns {SupportRequestPost}
     */
    private buildSupportRequest(formGroup: FormGroup, attachmentToken: string, requestedFromUrl: string): SupportRequestPost {

        return {
            attachmentToken,
            ...formGroup.value,
            requestedFromUrl
        };
    }

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        this.store.dispatch(new ResetSupportRequestAction());
        
        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Grab current state of support request.
     */
    ngOnInit() {

        this.store.pipe(select(selectSupportRequestSupportRequest))
            .pipe(
                takeUntil(this.ngDestroy$)
            ).subscribe((supportRequest) => {

                this.state$.next({
                    attachmentRejected: supportRequest.attachmentRejected,
                    attachmentRejection: supportRequest.attachmentRejection,
                    attachmentName: supportRequest.attachmentName,
                    attachmentToken: supportRequest.attachmentToken,
                    attachmentUploadError: supportRequest.attachmentUploadError,
                    attachmentUploading: supportRequest.attachmentUploading,
                    submitError: supportRequest.submitError,
                    submitted: supportRequest.submitted,
                    submitting: supportRequest.submitting
                });

                // If form has successfully been submitted, show thank you (potentially scrolling to top of popup)
                // and then hide the form on a timer. 
                if ( supportRequest.submitted ) {
                    const scrollToEl = this.elementRef.nativeElement.querySelector("div");
                    if ( scrollToEl ) {
                        scrollToEl.scrollTo(0, 0);
                    }
                    interval(3000)
                        .pipe(
                            takeUntil(this.ngDestroy$),
                            take(1)
                        )
                        .subscribe(() => this.onFormDismissed())
                }
            });
    }
}
