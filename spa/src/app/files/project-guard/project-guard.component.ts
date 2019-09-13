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

@Component({
    selector: "project-guard",
    templateUrl: "./project-guard.component.html",
    styleUrls: ["./project-guard.component.scss"]
})
export class ProjectGuardComponent implements OnInit {

    private PROJECT_IDS_BY_DEPRECATED_ID = new Map<string, string>([
        ["29f53b7e-071b-44b5-998a-0ae70d0229a4", "091cf39b-01bc-42e5-9437-f419a66c8a45"] // https://app.zenhub.com/workspaces/orange-5d680d7e3eeb5f1bbdf5668f/issues/humancellatlas/data-browser/865
    ]);

    public projectId$: Observable<string>;

    /**
     * @param {ActivatedRoute} route
     */
    constructor(private route: ActivatedRoute) {
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
     *
     */
    ngOnInit() {

        this.projectId$ = this.route.params
            .pipe(
                map(params => params["id"])
            );
    }
}
