/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying HCA project details.
 */

// Core dependencies
import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DeviceDetectorService } from "ngx-device-detector";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { HCAProjectState } from "./hca-project.state";
import { AppState } from "../../_ngrx/app.state";
import { selectSelectedProject } from "../_ngrx/file.selectors";
import { FetchProjectMatrixUrlsRequestAction } from "../_ngrx/matrix/fetch-project-matrix-urls-request.action";
import { selectProjectMatrixUrlsByProjectId } from "../_ngrx/matrix/matrix.selectors";
import { EntitySelectAction, FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { selectSelectedProjectSearchTerms } from "../_ngrx/search/search.selectors";
import { SelectProjectIdAction } from "../_ngrx/search/select-project-id.action";
import { ClearSelectedProjectAction } from "../_ngrx/table/clear-selected-project.action";
import { Contributor } from "../shared/contributor.model";
import EntitySpec from "../shared/entity-spec";
import { Project } from "../shared/project.model";
import { SearchTerm } from "../search/search-term.model";
import { EntityName } from "../shared/entity-name.model";
import { Publication } from "../shared/publication.model";
import {
    getColumnDescription,
    getColumnDisplayName
} from "../table/table-methods";
import { CollaboratingOrganizationView } from "./collaborating-organization-view.model";
import { ContactView } from "./contact-view.model";
import { ContributorView } from "./contributor-view.model";
import { ProjectView } from "./project-view.model";

@Component({
    selector: "hca-project",
    templateUrl: "./hca-project.component.html",
    styleUrls: ["./hca-project.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HCAProjectComponent implements OnDestroy, OnInit {

    // Template variables
    public analysisToolsAvailable: false; // TODO remove
    public getColumnDescription = getColumnDescription;
    public getColumnDisplayName = getColumnDisplayName;
    public state$: Observable<HCAProjectState>;

    // Locals
    private deviceInfo = null;

    /**
     * @param {ActivatedRoute} activatedRoute
     * @param {DeviceDetectorService} deviceService
     * @param {Router} router
     * @param {Store<AppState>} store
     * @param {ConfigService} configService
     */
    public constructor(private activatedRoute: ActivatedRoute,
                       private deviceService: DeviceDetectorService,
                       private router: Router,
                       private store: Store<AppState>,
                       private configService: ConfigService) {
    }

    /**
     * Returns null value for EntitySpec, no need for an active tab.
     *
     * @returns {EntitySpec}
     */
    public getActiveTab(): EntitySpec {

        return {key: "", displayName: ""};
    }

    /**
     * Returns the distinct list of collaborating organizations of the project.
     * Will exclude corresponding contributors and any contributor with role "data curator".
     *
     * @param {Contributor[]} contributors
     * @returns {string[]}
     */
    public getDistinctListOfCollaboratingOrganizations(contributors: Contributor[]): string[] {

        return this.getProjectContributors(contributors)
            .map(contributor => contributor.institution)
            .filter((o, i, a) => a.indexOf(o) === i);
    }

    /**
     * Returns formatted name from "firstName,middleName,lastName" to "firstName middleName lastName".
     *
     * @param {string} commaDelimitedName
     * @returns {string}
     */
    public getFormattedContributorName(commaDelimitedName: string): string {

        return commaDelimitedName.split(/[ ,]+/).join(" ");
    }

    /**
     * Return the inline style configuration for the chart legend, for the specified project.
     *
     * @param {boolean} selected
     * @returns {any}
     */
    public getLegendStyle(selected: boolean): any {

        // If term is selected, set the background color as well
        if ( selected ) {

            return {
                "border-color": "#1F6B9A",
                "background-color": "#1C7CC7"
            };
        }
    }

    /**
     * Returns the list of contributors for the project.
     * Will exclude corresponding contributors and any contributor with role "data curator".
     *
     * @param {Contributor[]} contributors
     * @returns {Contributor[]}
     */
    public getProjectContributors(contributors: Contributor[]): Contributor[] {

        return contributors
            .filter(contributor => !contributor.correspondingContributor)
            .filter(contributor => !this.isContributorDataCurator(contributor.projectRole));
    }

    /**
     * Tab provides opportunity to return back to Project table.
     *
     * @returns {EntitySpec[]}
     */
    public getProjectDetailTabs(): EntitySpec[] {

        return [{key: EntityName.PROJECTS, displayName: "Back"}];
    }

    /**
     * Returns publication title with a link to the publication URL, if it exists.
     *
     * @param {Publication} publication
     * @returns {string}
     */
    public getProjectPublication(publication: Publication): string {

        return publication.publicationUrl ?
            `<a href=${publication.publicationUrl} target="_blank" rel="noopener noreferrer">${publication.publicationTitle}</a>` :
            publication.publicationTitle;
    }


    /**
     * Returns true if at least one data curator has been specified for this project.
     *
     * @param {string[]} curators
     * @returns {boolean}
     */
    public isAnyDataCuratorAssociated(curators: string[]): boolean {
        return curators.length > 0;
    }

    /**
     * Returns true if project collaborating organizations exist.
     *
     * @param {CollaboratingOrganizationView[]} collaboratingOrganzations
     * @returns {boolean}
     */
    public isAnyCollaboratingOrganizationAssociated(collaboratingOrganzations: CollaboratingOrganizationView[]): boolean {
        return collaboratingOrganzations.length > 0;
    }

    /**
     * Returns true if project contributors exist.
     *
     * @param {ContributorView[]} contributors
     * @returns {boolean}
     */
    public isAnyContributorAssociated(contributors: ContributorView[]): boolean {
        return contributors.length > 0;
    }

    /**
     * Returns true if project publications exist.
     *
     * @param {Publication[]} publications
     * @returns {boolean}
     */
    public isAnyPublicationAssociated(publications: Publication[]): boolean {
        return publications.length > 0;
    }

    /**
     * Returns true if device is either mobile or tablet.
     *
     * @returns {boolean}
     */
    public isDeviceHandheld(): boolean {

        this.deviceInfo = this.deviceService.getDeviceInfo();
        const isMobile = this.deviceService.isMobile();
        const isTablet = this.deviceService.isTablet();

        return (isMobile || isTablet);
    }

    /**
     * Returns true if project contacts exist.
     *
     * @param {ContactView[]} contacts
     * @returns {boolean}
     */
    public isAnyContactAssociated(contacts: ContactView[]): boolean {
        return contacts.length > 0;
    }

    /**
     * Returns true if project is a selected facet.
     *
     * @param {string[]} selectedProjectIds
     * @param {string} projectId
     * @returns {boolean}
     */
    public isProjectSelected(selectedProjectIds: string[], projectId: string): boolean {

        return selectedProjectIds.indexOf(projectId) >= 0;
    }

    /**
     * Handle click on term in list of terms - update store with selected / unsselected project and return user back to
     * project table.
     *
     * @param {string[]} selectedProjectIds
     * @param {string} projectId
     * @param {string} projectShortname
     */
    public onProjectSelected(selectedProjectIds: string[], projectId: string, projectShortname: string) {

        const selected = this.isProjectSelected(selectedProjectIds, projectId);
        this.store.dispatch(new SelectProjectIdAction(projectId, projectShortname, !selected));
        this.router.navigate(["/projects"]);
    }

    /**
     * Handle click on tab - update selected entity in state and return user back to project table.
     *
     * @param {EntitySpec} tab
     */
    public onTabSelected(tab: EntitySpec) {

        this.store.dispatch(new EntitySelectAction(tab.key));
        this.router.navigate(["/projects"]);
    }

    /**
     * Return string-concat'ed version of the specified array.
     *
     * @param {any[]} values
     * @param {string} valueIfNull
     * @returns {string}
     */
    public stringifyValues(values: any[], valueIfNull: string): string {

        const linkedValue = "Smart-seq2";

        if ( !values ) {
            return valueIfNull;
        }

        if ( !Array.isArray(values) ) {
            return values;
        }

        if ( values.length === 0 ) {
            return valueIfNull;
        }

        if ( values.includes(linkedValue) ) {
            return this.stringifyAndLinkValues(values, linkedValue);
        }

        return values.join(", ");
    }

    /**
     * Returns string-concat'ed version of the array,
     * with the value of interest "Smart-seq2" linked to a page in the Data Portal.
     *
     * @param {any[]} values
     * @param {string} linkedValue
     * @returns {string}
     */
    public stringifyAndLinkValues(values: any[], linkedValue: string): string {

        const posOfValue = values.indexOf(linkedValue);

        const portalURL = this.configService.getPortalURL();
        const hrefOfValue = `${portalURL}/pipelines/hca-pipelines/data-processing-pipelines/smart-seq2-workflow`;
        const innerHTMLOfValue = `<a href=${hrefOfValue} target="_blank" rel="noopener noreferrer">${linkedValue}</a>`;

        return `${values.slice(0, posOfValue).concat(innerHTMLOfValue).concat(values.slice(posOfValue + 1, values.length)).join(", ")}`;
    }

    /**
     * Returns project related information, including formatted contact, contributor and organizations lists.
     *
     * @param {Project} project
     * @returns {ProjectView}
     */
    private buildProjectView(project: Project): ProjectView {
        return {
            collaboratingOrganizations: this.getCollaboratingOrganizations(project.contributors),
            contacts: this.getContacts(project.contributors),
            contributors: this.getContributors(project.contributors),
            dataCurators: this.getDataCurators(project.contributors),
            project: project
        };
    }

    /**
     * Returns formatted name from "firstName,middleName,lastName" to "firstName middleName lastName".
     *
     * @param {string} commaDelimitedName
     * @returns {string}
     */
    public formatContributor(commaDelimitedName: string): string {

        return commaDelimitedName.split(/[ ,]+/).join(" ");
    }

    /**
     * Returns the project contributor's list of organizations with their corresponding citation.
     *
     * @param {Contributor[]} contributors
     * @returns {CollaboratingOrganizationView[]}
     */
    private getCollaboratingOrganizations(contributors: Contributor[]): CollaboratingOrganizationView[] {

        const projectContributors = this.getProjectContributors(contributors),
            projectDistinctListOfContributorOrganizations = this.getDistinctListOfCollaboratingOrganizations(projectContributors);

        return projectDistinctListOfContributorOrganizations.map((organization, i) => {

            return {
                citation: i + 1,
                name: organization,
            };
        });
    }

    /**
     * Returns formatted project contacts.
     *
     * @param {Contributor[]} contributors
     * @returns {ContactView[]}
     */
    private getContacts(contributors: Contributor[]): ContactView[] {

        return contributors
            .filter(contributor => contributor.correspondingContributor)
            .map(correspondingContributor => {

                return {
                    name: this.getFormattedContributorName(correspondingContributor.contactName),
                    email: correspondingContributor.email,
                    institution: correspondingContributor.institution
                };
            });
    }

    /**
     * Returns formatted project contributors with their corresponding [organization] citation number.
     *
     * @param {Contributor[]} contributors
     * @returns {ContributorView[]}
     */
    private getContributors(contributors: Contributor[]): ContributorView[] {

        const projectContributors = this.getProjectContributors(contributors);
        const projectDistinctListOfContributorOrganizations = this.getDistinctListOfCollaboratingOrganizations(projectContributors);

        return projectContributors.map(projectContributor => {

            return {
                citation: projectDistinctListOfContributorOrganizations.indexOf(projectContributor.institution) + 1,
                name: this.getFormattedContributorName(projectContributor.contactName),
                role: projectContributor.projectRole
            };
        });
    }

    /**
     * Returns formatted data curators.
     *
     * @param {Contributor[]} contributors
     * @returns {ContributorView[]}
     */
    private getDataCurators(contributors: Contributor[]): string[] {

        return contributors
            .filter(contributor => this.isContributorDataCurator(contributor.projectRole))
            .map(contributor => contributor.contactName)
            .map(name => this.formatContributor(name));

    }

    /**
     * Returns true if the contributor's projectRole is "data curator".
     *
     * @param {string} projectRole
     * @returns {boolean}
     */
    private isContributorDataCurator(projectRole: string): boolean {

        return projectRole && projectRole.toLowerCase() === "data curator";
    }

    /**
     * Transform selected project search term set into set of selected project IDs.
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {string[]}
     */
    private mapSearchTermsToProjectIds(searchTerms: SearchTerm[]): string[] {

        return searchTerms.map((searchTerm: SearchTerm) => {
            return searchTerm.getSearchValue();
        });
    }

    /**
     * Clear out the selected project when the user navigates away from project detail page.
     */
    public ngOnDestroy() {

        this.store.dispatch(new ClearSelectedProjectAction());
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

        // Determine which matrix formats, if any, are available for download for this project
        this.store.dispatch(new FetchProjectMatrixUrlsRequestAction(projectId));

        // Grab the project matrix URLs, if any, for this project
        const projectMatrixUrls$ = this.store.pipe(
            select(selectProjectMatrixUrlsByProjectId),
            map(projectMatrixUrlsByProjectId => projectMatrixUrlsByProjectId.get(projectId))
        );

        // Grab the ID's of the current set of selected projects, if any
        const selectedProjectIds$ = this.store.pipe(
            select(selectSelectedProjectSearchTerms),
            map(this.mapSearchTermsToProjectIds)
        );

        this.state$ = combineLatest(
            project$,
            projectMatrixUrls$,
            selectedProjectIds$
        )
            .pipe(
                filter(([project]) => !!project),
                map(([project, projectMatrixUrls, selectedProjectIds]) => {

                    const projectView = this.buildProjectView(project);
                    return {
                        project: projectView,
                        projectMatrixUrls: projectMatrixUrls,
                        selectedProjectIds
                    };
                })
            );
    }
}
