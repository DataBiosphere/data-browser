/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Support request-related effects, including posting support request.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import {
    concatMap,
    map,
    switchMap,
    take,
    withLatestFrom,
} from "rxjs/operators";

// App dependencies
import { AttachmentResponse } from "../attachment-response.model";
import { CreateSupportRequestErrorAction } from "./create-support-request-error.action";
import { CreateSupportRequestRequestAction } from "./create-support-request-request.action";
import { CreateSupportRequestSuccessAction } from "./create-support-request-success.action";
import { selectCatalog } from "../../files/_ngrx/catalog/catalog.selectors";
import { AppState } from "../../_ngrx/app.state";
import { GTMService } from "../../shared/analytics/gtm.service";
import { SupportRequestService } from "../support-request.service";
import { UploadAttachmentRequestAction } from "./upload-attachment-request.action";
import { UploadAttachmentErrorAction } from "./upload-attachment-error.action";
import { UploadAttachmentSuccessAction } from "./upload-attachment-success.action";
import { GACategory } from "../../shared/analytics/ga-category.model";
import { GAAction } from "../../shared/analytics/ga-action.model";
import { GADimension } from "../../shared/analytics/ga-dimension.model";
import { selectSupportRequestSource } from "./support-request.selectors";

@Injectable()
export class SupportRequestEffects {
    /**
     * @param {GTMService} gtmService
     * @param {SupportRequestService} supportRequestService
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     */
    constructor(
        private gtmService: GTMService,
        private supportRequestService: SupportRequestService,
        private store: Store<AppState>,
        private actions$: Actions
    ) {}

    /**
     * Create support request.
     */

    createSupportRequest$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(CreateSupportRequestRequestAction.ACTION_TYPE),
            concatMap((action) =>
                of(action).pipe(
                    withLatestFrom(
                        this.store.pipe(select(selectCatalog), take(1)),
                        this.store.pipe(
                            select(selectSupportRequestSource),
                            take(1)
                        )
                    )
                )
            ),
            switchMap(([action, catalog, source]) => {
                const supportRequest = (
                    action as CreateSupportRequestRequestAction
                ).supportRequest;
                return this.supportRequestService
                    .createSupportRequest(supportRequest)
                    .pipe(map((response) => ({ response, catalog, source })));
            }),
            map(({ response, catalog, source }) => {
                if (response.error) {
                    return new CreateSupportRequestErrorAction(
                        response.errorMessage
                    );
                }

                // Track successful submit of support request
                this.gtmService.trackEvent({
                    category: GACategory.SUPPORT_REQUEST,
                    action: GAAction.CREATE,
                    label: "",
                    dimensions: {
                        [GADimension.CATALOG]: catalog,
                        [GADimension.SOURCE]: source,
                    },
                });

                return new CreateSupportRequestSuccessAction(response);
            })
        )
    );

    /**
     * Upload attachment to a support request.
     */

    uploadAttachment$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UploadAttachmentRequestAction.ACTION_TYPE),
            switchMap((action: UploadAttachmentRequestAction) => {
                return this.supportRequestService.uploadAttachment(action.file);
            }),
            map((response: AttachmentResponse) => {
                if (response.error) {
                    return new UploadAttachmentErrorAction(
                        response.errorMessage
                    );
                }
                return new UploadAttachmentSuccessAction(response);
            })
        )
    );
}
