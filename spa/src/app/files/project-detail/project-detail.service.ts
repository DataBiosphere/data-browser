/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service specific to project detail functionality. For example, tracking of project tab views or setting/clearing
 * project meta tags.
 */

// Core dependencies
import { Inject, Injectable } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { Store } from "@ngrx/store";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { ViewProjectTabAction } from "../_ngrx/table/view-project-tab.action";
import { GAAction } from "../../shared/analytics/ga-action.model";

@Injectable()
export class ProjectDetailService {

    /**
     * @param {Store<AppState>} store
     * @param {Meta} meta
     * @param {Window} window
     */
    constructor(private store: Store<AppState>,
                private meta: Meta,
                @Inject("Window") private window: Window) {
    }

    /**
     * Update meta tags with project details.
     * 
     * @param {string} projectTitle
     * @param {string} tabName
     */
    public addProjectMeta(projectTitle: string, tabName?: string) {

        const metaDescription = tabName ? `${tabName}: ${projectTitle}` : projectTitle;
        this.meta.addTag({
            name: "description",
            content: metaDescription
        });
    }

    /**
     * Remove project detail meta tags.
     */
    public removeProjectMeta() {

        this.meta.removeTag(`name="description"`);
    }

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
