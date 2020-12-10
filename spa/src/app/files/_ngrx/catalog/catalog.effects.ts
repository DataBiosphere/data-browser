/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Coordination of side effects of catalog-related actions.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";

// App dependencies
import { GTMService } from "../../../shared/analytics/gtm.service";
import { ViewCatalogAction } from "./view-catalog.action";

@Injectable()
export class CatalogEffects {

    /**
     * @param {GTMService} gtmService
     * @param {Actions} actions$
     */
    constructor(private gtmService: GTMService, private actions$: Actions) {
    }

    /**
     * Track view of catalog from announcement.
     */
    @Effect({dispatch: false})
    viewCatalog$ = this.actions$.pipe(
        ofType(ViewCatalogAction.ACTION_TYPE),
        tap((action) => {
            this.gtmService.trackEvent((action as ViewCatalogAction).asEvent());
        })
    );
}
