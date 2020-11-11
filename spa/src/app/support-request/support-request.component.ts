/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Top-level support request component.
 */

// Core dependencies
import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

// App dependencies 
import { AppState } from "../_ngrx/app.state";
import { selectSupportRequestActive } from "./_ngrx/support-request.selectors";
import { UpdateSupportRequestActiveAction } from "./_ngrx/update-support-request-active.action";
import { SupportRequestState } from "./support-request.state";
import { UrlService } from "../files/url/url.service";

@Component({
    selector: "support-request",
    templateUrl: "support-request.component.html",
    styleUrls: ["support-request.component.scss"]
})
export class SupportRequestComponent implements OnInit {

    // Template variables
    public state$ = new BehaviorSubject<SupportRequestState>({
        active: false
    });

    // Locals
    private ngDestroy$ = new Subject();

    /**
     * @param {UrlService} urlService
     * @param {Store<AppState>} store
     */
    constructor(private urlService: UrlService, private store: Store<AppState>) {}

    /**
     * Feedback button is not visible on data table pages.
     */
    public isButtonVisible(): boolean {

        return !this.urlService.isViewingEntities();
    }

    /**
     * Handle click on support request button - display support request form.
     */
    public onButtonClicked() {

        this.store.dispatch(new UpdateSupportRequestActiveAction(true));
    }

    /**
     * Handle dismiss of form - hide support request form.
     */
    public onFormDismissed() {

        this.store.dispatch(new UpdateSupportRequestActiveAction(false));
    }

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Determine if support request is currently active.
     */
    public ngOnInit() {

        this.store.pipe(
            select(selectSupportRequestActive),
            takeUntil(this.ngDestroy$)
        ).subscribe(active => this.state$.next({active}));
    }
}
