/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying supplementary integrations for a specific project.
 */

// Core dependencies
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { selectSelectedProject } from "../_ngrx/file.selectors";
import { FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { ProjectSupplementaryLinksState } from "./project-supplementary-links.state";

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
     */
    constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>) {}

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
