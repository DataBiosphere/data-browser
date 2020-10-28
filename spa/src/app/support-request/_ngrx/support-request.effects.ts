/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Support request-related effects, including posting support request.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";

// App dependencies
import { CreateSupportRequestErrorAction } from "./create-support-request-error.action";
import { CreateSupportRequestSuccessAction } from "./create-support-request-success.action";
import { AppState } from "../../_ngrx/app.state";
import { SupportRequestService } from "../support-request.service";
import { SupportRequestResponse } from "../support-request-response.model";
import { AttachmentResponse } from "../attachment-response.model";
import { UploadAttachmentRequestAction } from "./upload-attachment-request.action";
import { UploadAttachmentErrorAction } from "./upload-attachment-error.action";
import { UploadAttachmentSuccessAction } from "./upload-attachment-success.action";
import { CreateSupportRequestRequestAction } from "./create-support-request-request.action";

@Injectable()
export class SupportRequestEffects {

    /**
     * @param {SupportRequestService} supportRequestService
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     */
    constructor(private supportRequestService: SupportRequestService,
                private store: Store<AppState>,
                private actions$: Actions) {
    }

    /**
     * Upload attachment to a support request.
     */
    @Effect()
    uploadAttachment$: Observable<Action> = this.actions$
        .pipe(
            ofType(UploadAttachmentRequestAction.ACTION_TYPE),
            switchMap((action: UploadAttachmentRequestAction) => {

                return this.supportRequestService.uploadAttachment(action.file);
            }),
            map((response: AttachmentResponse) => {

                if ( response.error ) {
                    return new UploadAttachmentErrorAction(response.errorMessage);
                }
                return new UploadAttachmentSuccessAction(response);
            })
        );

    /**
     * Create support request.
     */
    @Effect()
    createSupportRequest$: Observable<Action> = this.actions$
        .pipe(
            ofType(CreateSupportRequestRequestAction.ACTION_TYPE),
            switchMap((action: CreateSupportRequestRequestAction) => {

                return this.supportRequestService.createSupportRequest(action.supportRequest);
            }),
            map((response: SupportRequestResponse) => {
              
                if ( response.error ) {
                    return new CreateSupportRequestErrorAction(response.errorMessage);
                }
                return new CreateSupportRequestSuccessAction(response);
            })
        )
}
