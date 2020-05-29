/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying basic project information (description, contributors, publications etc).
 */

// Core dependencies
import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable, Subject } from "rxjs";
import { filter, map, take, takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { selectSelectedProject } from "../_ngrx/file.selectors";
import { FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { selectSelectedSearchTerms } from "../_ngrx/search/search.selectors";
import { ProjectOverviewComponentState } from "./project-overview.component.state";
import { ProjectAnalyticsService } from "../project/project-analytics.service";
import { CollaboratingOrganizationView } from "../project-view/collaborating-organization-view.model";
import { ContactView } from "../project-view/contact-view.model";
import { ContributorView } from "../project-view/contributor-view.model";
import { ProjectViewFactory } from "../project-view/project-view.factory";
import { GAAction } from "../../shared/analytics/ga-action.model";
import { Publication } from "../shared/publication.model";

@Component({
    selector: "project-overview",
    templateUrl: "./project-overview.component.html",
    styleUrls: ["./project-overview.component.scss"]
})
export class ProjectOverviewComponent implements OnDestroy {

    // Template variables
    private ngDestroy$ = new Subject();
    public state$: Observable<ProjectOverviewComponentState>;

    /**
     * @param {ProjectAnalyticsService} projectAnalyticsService
     * @param {ProjectViewFactory} projectFactory
     * @param {Store<AppState>} store
     * @param {ActivatedRoute} activatedRoute
     */
    constructor(private projectAnalyticsService: ProjectAnalyticsService, 
                private projectFactory: ProjectViewFactory, 
                private store: Store<AppState>, 
                private activatedRoute: ActivatedRoute) {}

    /**
     * Returns publication title with a link to the publication URL, if it exists.
     *
     * @param {Publication} publication
     * @returns {string}
     */
    public getProjectPublication(publication: Publication): string {

        const url = publication.publicationUrl;
        const title = publication.publicationTitle;

        if ( url ) {

            return `<a href=${url} target="_blank" rel="noopener noreferrer">${title}</a>`;
        }

        return title;
    }

    /**
     * Returns true if project collaborating organizations exist.
     *
     * @param {CollaboratingOrganizationView[]} collaboratingOrganizations
     * @returns {boolean}
     */
    public isAnyCollaboratingOrganizationAssociated(collaboratingOrganizations: CollaboratingOrganizationView[]): boolean {

        return collaboratingOrganizations && collaboratingOrganizations.length > 0;
    }

    /**
     * Returns true if project contacts exist.
     *
     * @param {ContactView[]} contacts
     * @returns {boolean}
     */
    public isAnyContactAssociated(contacts: ContactView[]): boolean {

        return contacts && contacts.length > 0;
    }

    /**
     * Returns true if project contributors exist.
     *
     * @param {ContributorView[]} contributors
     * @returns {boolean}
     */
    public isAnyContributorAssociated(contributors: ContributorView[]): boolean {

        return contributors && contributors.length > 0;
    }

    /**
     * Returns true if at least one data curator has been specified for this project.
     *
     * @param {string[]} curators
     * @returns {boolean}
     */
    public isAnyDataCuratorAssociated(curators: string[]): boolean {

        return curators && curators.length > 0;
    }

    /**
     * Returns true if project publications exist.
     *
     * @param {Publication[]} publications
     * @returns {boolean}
     */
    public isAnyPublicationAssociated(publications: Publication[]): boolean {

        return publications && publications.length > 0;
    }

    /**
     * Set up tracking of tab.
     */
    private initTracking() {

        // Grab the current set of selected terms 
        const selectedSearchTerms$ = this.store.pipe(select(selectSelectedSearchTerms));

        combineLatest(this.state$, selectedSearchTerms$).pipe(
            take(1)
        ).subscribe(([state, selectedSearchTerms]) => {

            this.projectAnalyticsService.trackTabView(GAAction.VIEW_OVERVIEW, state.projectShortname, selectedSearchTerms);
        });
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
        const projectId = this.activatedRoute.snapshot.paramMap.get("id");
        this.store.dispatch(new FetchProjectRequestAction(projectId));

        // Grab reference to selected project
        const project$ = this.store.pipe(select(selectSelectedProject));

        this.state$ = project$
            .pipe(
                takeUntil(this.ngDestroy$),
                filter(project => !!project),
                map((project) => {

                    const projectView = this.projectFactory.getProjectView(project);

                    return {
                        projectShortname: project.projectShortname,
                        project: projectView
                    };
                })
            );

        // Set up tracking of project tab
        this.initTracking();
    }
}
