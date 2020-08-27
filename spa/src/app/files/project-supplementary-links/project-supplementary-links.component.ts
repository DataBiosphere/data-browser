/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying supplementary integrations for a specific project.
 */

// Core dependencies
import { Component, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { selectSelectedProject } from "../_ngrx/file.selectors";
import { FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { ViewProjectSupplementaryLinkAction } from "../_ngrx/table/view-project-supplementary-link.action";
import { ProjectSupplementaryLinksState } from "./project-supplementary-links.state";
import { Project } from "../shared/project.model";

@Component({
    selector: "project-supplementary-links",
    templateUrl: "./project-supplementary-links.component.html",
    styleUrls: ["./project-supplementary-links.component.scss"]
})

export class ProjectSupplementaryLinksComponent implements OnDestroy, OnInit {

    // Locals
    private ngDestroy$ = new Subject();
    
    // Template variables
    public state$ = new BehaviorSubject<ProjectSupplementaryLinksState>({
        loaded: false
    });

    // Inputs
    @Input() supplementaryLinks: string[];

    /**
     * @param {ActivatedRoute} activatedRoute
     * @param {Store<AppState>} store
     * @param {Window} window
     */
    constructor(private activatedRoute: ActivatedRoute,
                private store: Store<AppState>,
                @Inject("Window") private window: Window) {}

    /**
     * Returns true if project has at least on supplementary link associated with it.
     *
     * @param {string[]} supplementaryLinks
     * @returns {boolean}
     */
    public isAnySupplementaryLinkAssociated(supplementaryLinks: string[]): boolean {

        return supplementaryLinks && supplementaryLinks.length > 0;
    }

    /**
     * Returns true if the link is a valid url.
     *
     * @param {string} link
     * @returns {boolean}
     */
    public isValidUrl(link: string): boolean {

        try {
            new URL(link);
            return true;
        }
        catch (_) {
            return false;
        }
    }

    /**
     * Dispatch event to trigger track view of integration.
     *
     * @param {string} supplementaryLink
     * @param {Project} project
     */
    onSupplementaryLinkClicked(supplementaryLink: string, project: Project) {

        const action = new ViewProjectSupplementaryLinkAction(
            supplementaryLink,
            project.entryId,
            project.projectShortname,
            this.window.location.href
        );
        this.store.dispatch(action);
    }

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Update state with selected project.
     */
    public ngOnInit() {

        // Add selected project to state - grab the project ID from the URL.
        const projectId = this.activatedRoute.parent.snapshot.paramMap.get("id");

        this.store.dispatch(new FetchProjectRequestAction(projectId));

        // Grab reference to selected project
        this.store.pipe(
            select(selectSelectedProject),
            filter(project => !!project),
            takeUntil(this.ngDestroy$)
        ).subscribe(project => {
            this.state$.next({
                loaded: true,
                project
            })
        });
    }
}
