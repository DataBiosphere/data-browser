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
import { SearchTermHttpService } from "../search/http/search-term-http.service";
import { SearchTerm } from "../search/search-term.model";

@Injectable()
export class ProjectAnalyticsService {
    
    constructor(private searchTermHttpService: SearchTermHttpService,
                private store: Store<AppState>,
                @Inject("Window") private window: Window) {}

    /**
     * Set up tracking of view of project tab (eg project overview, project metadata etc). Dispatches project tab action
     * on view of tab.
     * 
     * @param {GAAction} tabName
     * @param {string} projectShortname
     * @param {SearchTerm[]} selectedSearchTerms
     */
    public trackTabView(tabName: GAAction, projectShortname: string, selectedSearchTerms: SearchTerm[]) {

        const url = window.location.href;
        const query = this.searchTermHttpService.marshallSearchTerms(selectedSearchTerms);
        const action =
            new ViewProjectTabAction(tabName, projectShortname, url, query);
        this.store.dispatch(action);
    }
}
