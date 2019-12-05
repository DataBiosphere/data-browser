/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying basic project information (description, contributors, publications etc).
 */

// Core dependencies
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { selectSelectedProject } from "../_ngrx/file.selectors";
import { FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { CollaboratingOrganizationView } from "../project-view/collaborating-organization-view.model";
import { ContactView } from "../project-view/contact-view.model";
import { ContributorView } from "../project-view/contributor-view.model";
import { ProjectViewFactory } from "../project-view/project-view.factory";
import { Publication } from "../shared/publication.model";
import { ProjectOverviewState } from "./project-overview.state";

@Component({
    selector: "project-overview",
    templateUrl: "./project-overview.component.html",
    styleUrls: ["./project-overview.component.scss"]
})
export class ProjectOverviewComponent {

    // Template variables
    public state$: Observable<ProjectOverviewState>;

    /**
     * @param {ActivatedRoute} activatedRoute
     * @param {ProjectViewFactory} projectFactory
     * @param {Store<AppState>} store
     */
    public constructor(private activatedRoute: ActivatedRoute,
                       private projectFactory: ProjectViewFactory,
                       private store: Store<AppState>) {
    }

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
     * Update state with selected project.
     */
    public ngOnInit() {

        // Add selected project to state - grab the project ID from the URL.
        const projectId = this.activatedRoute.snapshot.paramMap.get("id");

        this.store.dispatch(new FetchProjectRequestAction(projectId));

        // Grab reference to selected project
        const project$ = this.store.pipe(select(selectSelectedProject));

        this.state$ = combineLatest(
            project$,
        )
            .pipe(
                filter(([project]) => !!project),
                map(([project]) => {

                    const projectView = this.projectFactory.getProjectView(project);

                    return {
                        project: projectView,
                    };
                })
            );
    }
}
