/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying basic project information (description, contributors, publications etc).
 */

// Core dependencies
import {
    Component,
    Inject,
    Input,
    OnChanges,
    SimpleChanges,
} from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { AnalysisProtocolViewedEvent } from "../analysis-protocol-pipeline-linker/analysis-protocol-viewed.event";
import { Catalog } from "../catalog/catalog.model";
import { ViewAnalysisProtocolAction } from "../_ngrx/analysis-protocol/view-analysis-protocol.action";
import { AppState } from "../../_ngrx/app.state";
import { ViewProjectAccessionAction } from "../_ngrx/project/view-project-accession.action";
import { ViewProjectSupplementaryLinkAction } from "../_ngrx/table/view-project-supplementary-link.action";
import { CollaboratingOrganizationView } from "../project-view/collaborating-organization-view.model";
import { ContactView } from "../project-view/contact-view.model";
import { ProjectView } from "../project-view/project-view.model";
import { ContributorView } from "../project-view/contributor-view.model";
import { ProjectViewFactory } from "../project-view/project-view.factory";
import { GASource } from "../../shared/analytics/ga-source.model";
import { Publication } from "../shared/publication.model";
import { KeyValuePair } from "../../shared/key-value-pair/key-value-pair.model";
import { Project } from "../shared/project.model";

@Component({
    selector: "project-overview",
    templateUrl: "./project-overview.component.html",
    styleUrls: ["./project-overview.component.scss"],
})
export class ProjectOverviewComponent implements OnChanges {
    // Template variables
    public projectView: ProjectView;

    // Inputs
    @Input() catalog: Catalog;
    @Input() project: Project;

    /**
     * @param {ProjectViewFactory} projectFactory
     * @param {Store<AppState>} store
     * @param {Window} window
     */
    constructor(
        private projectFactory: ProjectViewFactory,
        private store: Store<AppState>,
        @Inject("Window") private window: Window
    ) {}

    /**
     * Returns publication title with a link to the publication URL, if it exists.
     *
     * @param {Publication} publication
     * @returns {string}
     */
    public getProjectPublication(publication: Publication): string {
        const url = publication.publicationUrl;
        const title = publication.publicationTitle;

        if (url) {
            return `<a href=${url} target="_blank" rel="noopener">${title}</a>`;
        }

        return title;
    }

    /**
     * Returns true if project collaborating organizations exist.
     *
     * @param {CollaboratingOrganizationView[]} collaboratingOrganizations
     * @returns {boolean}
     */
    public isAnyCollaboratingOrganizationAssociated(
        collaboratingOrganizations: CollaboratingOrganizationView[]
    ): boolean {
        return (
            collaboratingOrganizations && collaboratingOrganizations.length > 0
        );
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
    public isAnyContributorAssociated(
        contributors: ContributorView[]
    ): boolean {
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
        const action = new ViewAnalysisProtocolAction(
            event.analysisProtocol,
            event.url,
            GASource.PROJECT
        );
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
     * Track click on accession.
     *
     * @param {string} projectId
     * @param {string} projectTitle
     * @param {KeyValuePair} pair
     */
    public onAccessionClicked(
        projectId: string,
        projectTitle: string,
        pair: KeyValuePair
    ) {
        this.store.dispatch(
            new ViewProjectAccessionAction(
                projectId,
                projectTitle,
                pair.key,
                pair.value
            )
        );
    }

    /**
     * Dispatch event to trigger track view of integration.
     *
     * @param {string} projectId
     * @param {string} projectShortname
     * @param {string} supplementaryLink
     */
    onSupplementaryLinkClicked(
        projectId: string,
        projectShortname: string,
        supplementaryLink: string
    ) {
        const action = new ViewProjectSupplementaryLinkAction(
            supplementaryLink,
            projectId,
            projectShortname,
            this.window.location.href
        );
        this.store.dispatch(action);
    }

    /**
     * Update state with selected project.
     */
    ngOnChanges(changes: SimpleChanges) {
        if (changes.project) {
            this.projectView = this.projectFactory.getProjectView(
                this.catalog,
                changes.project.currentValue
            );
        }
    }
}
