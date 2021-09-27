/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service specific to project detail functionality. For example, updating description meta for each project-specific
 * view or download.
 */

// Core dependencies
import { Inject, Injectable } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { Store } from "@ngrx/store";

// App dependencies
import { AppState } from "../../_ngrx/app.state";

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
}
