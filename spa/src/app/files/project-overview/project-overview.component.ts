/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying basic project information (description, contributors, publications etc).
 */

// Core dependencies
import { Component, Inject, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable, Subject } from "rxjs";
import { filter, map, take, takeUntil } from "rxjs/operators";

// App dependencies
import { AnalysisProtocolViewedEvent } from "../analysis-protocol-pipeline-linker/analysis-protocol-viewed.event";
import { ViewAnalysisProtocolAction } from "../_ngrx/analysis-protocol/view-analysis-protocol.action";
import { AppState } from "../../_ngrx/app.state";
import { selectCatalog } from "../_ngrx/catalog/catalog.selectors";
import { selectSelectedProject } from "../_ngrx/files.selectors";
import { ViewProjectAccessionAction } from "../_ngrx/project/view-project-accession.action";
import { FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { ViewProjectSupplementaryLinkAction } from "../_ngrx/table/view-project-supplementary-link.action";
import { ProjectOverviewComponentState } from "./project-overview.component.state";
import { ProjectDetailService } from "../project-detail/project-detail.service";
import { CollaboratingOrganizationView } from "../project-view/collaborating-organization-view.model";
import { ContactView } from "../project-view/contact-view.model";
import { ContributorView } from "../project-view/contributor-view.model";
import { ProjectViewFactory } from "../project-view/project-view.factory";
import { GAAction } from "../../shared/analytics/ga-action.model";
import { Publication } from "../shared/publication.model";
import { GASource } from "../../shared/analytics/ga-source.model";
import { KeyValuePair } from "../../shared/key-value-pair/key-value-pair.model";

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
     * @param {ProjectDetailService} projectDetailService
     * @param {ProjectViewFactory} projectFactory
     * @param {Store<AppState>} store
     * @param {ActivatedRoute} activatedRoute
     * @param {Window} window
     */
    constructor(private projectDetailService: ProjectDetailService, 
                private projectFactory: ProjectViewFactory,
                private store: Store<AppState>, 
                private activatedRoute: ActivatedRoute,
                @Inject("Window") private window: Window) {}

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
     * Dispatch action to track view of analysis protocol.
     *
     * @param {AnalysisProtocolViewedEvent} event
     */
    public onAnalysisProtocolViewed(event: AnalysisProtocolViewedEvent) {

        const action =
            new ViewAnalysisProtocolAction(event.analysisProtocol, event.url, GASource.PROJECT);
        this.store.dispatch(action);
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
     * Set up tracking of tab as well as project meta tags.
     */
    private initTab() {

        this.state$.pipe(
            take(1)
        ).subscribe((state) => {

            this.projectDetailService.addProjectMeta(state.projectTitle);
            this.projectDetailService.trackTabView(GAAction.VIEW_OVERVIEW, state.projectId, state.projectShortname);
        });
    }

    /**
     * Track click on accession.
     * 
     * @param {string} projectId
     * @param {string} projectTitle
     * @param {KeyValuePair} pair
     */
    public onAccessionClicked(projectId: string, projectTitle: string, pair: KeyValuePair) {

        this.store.dispatch(new ViewProjectAccessionAction(projectId, projectTitle, pair.key, pair.value));
    }

    /**
     * Dispatch event to trigger track view of integration.
     *
     * @param {string} projectId
     * @param {string} projectShortname
     * @param {string} supplementaryLink
     */
    onSupplementaryLinkClicked(projectId: string, projectShortname: string, supplementaryLink: string) {

        const action = new ViewProjectSupplementaryLinkAction(
            supplementaryLink,
            projectId,
            projectShortname,
            this.window.location.href
        );
        this.store.dispatch(action);
    }

    /**
     * Kill subscriptions on destroy of component. Clear project meta.
     */
    public ngOnDestroy() {
        
        // Clear meta tag
        this.projectDetailService.removeProjectMeta();

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Update state with selected project. Set project meta.
     */
    public ngOnInit() {

        // Add selected project to state - grab the project ID from the URL.
        const projectId = this.activatedRoute.snapshot.paramMap.get("id");
        this.store.dispatch(new FetchProjectRequestAction(projectId));

        // Grab the current and default catalog values - we need these for the citation link.
        const catalog$ = this.store.pipe(
            select(selectCatalog),
            takeUntil(this.ngDestroy$)
        );

        // Grab reference to selected project
        const project$ = this.store.pipe(
            select(selectSelectedProject),
            filter(project => !!project)
        );
        
        this.state$ = combineLatest(project$, catalog$).pipe(
            takeUntil(this.ngDestroy$),
            map(([project, catalog]) => {

                const projectView = this.projectFactory.getProjectView(catalog, project);

                return {
                    project: projectView,
                    projectId: project.entryId,
                    projectShortname: project.projectShortname,
                    projectTitle: project.projectTitle
                };
            })
        );

        this.initTab();
    }
}
