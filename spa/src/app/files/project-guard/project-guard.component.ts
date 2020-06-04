/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for determining if project ID has been deprecated and if so, displays the deprecated component.
 * If project ID is valid, display the project detail component.
 */

// Core dependencies
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { ProjectStatus } from "./project-status.model";

@Component({
    selector: "project-guard",
    templateUrl: "./project-guard.component.html",
    styleUrls: ["./project-guard.component.scss"]
})
export class ProjectGuardComponent implements OnInit {

    private PROJECT_IDS_BY_DEPRECATED_ID = new Map<string, string>([
        ["29f53b7e-071b-44b5-998a-0ae70d0229a4", "091cf39b-01bc-42e5-9437-f419a66c8a45"] // https://app.zenhub.com/workspaces/orange-5d680d7e3eeb5f1bbdf5668f/issues/humancellatlas/data-browser/865
    ]);

    private PROJECT_IDS_INGEST_IN_PROGRESS = [
        // "abe1a013-af7a-45ed-8c26-f3793c24a1f4" // https://app.zenhub.com/workspaces/orange-5d680d7e3eeb5f1bbdf5668f/issues/humancellatlas/data-browser/944, https://app.zenhub.com/workspaces/orange-5d680d7e3eeb5f1bbdf5668f/issues/humancellatlas/data-browser/948
    ];

    private PROJECT_IDS_WITHDRAWN = [
        "008e40e8-66ae-43bb-951c-c073a2fa6774" // https://app.zenhub.com/workspaces/orange-5d680d7e3eeb5f1bbdf5668f/issues/humancellatlas/data-browser/1209
    ];

    public projectId$: Observable<string>;

    /**
     * @param {ActivatedRoute} route
     */
    constructor(private route: ActivatedRoute) {
    }

    /**
     * Return the view mode for the project, depending on its current status.
     * 
     * @param {string} projectId
     * @returns {string}
     */
    public getProjectViewMode(projectId): string {

        if ( this.isProjectDeprecated(projectId) ) {
            return ProjectStatus.DEPRECATED;
        }
        else if ( this.isProjectIngestInProgress(projectId) ) {
            return ProjectStatus.INGEST_IN_PROGRESS;
        }
        else if ( this.isProjectWithdrawn(projectId) ) {
            return ProjectStatus.WITHDRAWN;
        }

        return ProjectStatus.LIVE;
    }

    /**
     * Returns true the updated project ID for the specified deprecated project ID.
     *
     * @param {string} deprecatedProjectId
     * @returns {string}
     */
    public getUpdatedProjectId(deprecatedProjectId: string): string {

        return this.PROJECT_IDS_BY_DEPRECATED_ID.get(deprecatedProjectId);
    }

    /**
     * Returns true if project has been deprecated and there is a new version of the project.
     *
     * @param {string} projectIdToCheck
     * @returns {boolean}
     */
    public isProjectDeprecated(projectIdToCheck: string): boolean {

        return this.PROJECT_IDS_BY_DEPRECATED_ID.has(projectIdToCheck);
    }

    /**
     * Returns true if project ingest is currently in progress.
     *
     * @param {string} projectIdToCheck
     * @returns {boolean}
     */
    public isProjectIngestInProgress(projectIdToCheck: string): boolean {

        return this.PROJECT_IDS_INGEST_IN_PROGRESS.indexOf(projectIdToCheck) >= 0;
    }

    /**
     * Returns true if project has been withdrawn.
     *
     * @param {string} projectIdToCheck
     * @returns {boolean}
     */
    public isProjectWithdrawn(projectIdToCheck: string): boolean {

        return this.PROJECT_IDS_WITHDRAWN.indexOf(projectIdToCheck) >= 0;
    }
    
    /**
     *
     */
    ngOnInit() {

        this.projectId$ = this.route.params
            .pipe(
                map(params => params["id"])
            );
    }
}
