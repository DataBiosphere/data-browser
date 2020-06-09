/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service specific to tracking project-related functionality.
 */

// Core dependencies
import { Inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { ViewProjectTabAction } from "../_ngrx/table/view-project-tab.action";
import { GAAction } from "../../shared/analytics/ga-action.model";

@Injectable()
export class ProjectAnalyticsService {
    
    constructor(private store: Store<AppState>,
                @Inject("Window") private window: Window) {}

    /**
     * Set up tracking of view of project tab (eg project overview, project metadata etc). Dispatches project tab action
     * on view of tab.
     * 
     * @param {GAAction} tabName
     * @param {string} projectId
     * @param {string} projectShortname
     */
    public trackTabView(tabName: GAAction, projectId: string, projectShortname: string) {

        const url = window.location.href;
        const action =
            new ViewProjectTabAction(tabName, projectId, projectShortname, url);
        this.store.dispatch(action);
    }
}
