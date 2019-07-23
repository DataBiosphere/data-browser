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
import {
    getColumnDescription,
    getColumnDisplayName
} from "../table/table-methods";
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";

@Component({
    selector: "hca-project",
    templateUrl: "./hca-project.component.html",
    styleUrls: ["./hca-project.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HCAProjectComponent implements OnDestroy, OnInit {

    // Template variables
    analysisToolsAvailable: false; // TODO remove
    getColumnDescription = getColumnDescription;
    getColumnDisplayName = getColumnDisplayName;
    state$: Observable<HCAProjectState>;

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
                       private configService: ConfigService) {}

    /**
     * Public API
     */

    /**
     * Returns formatted name from "firstName,middleName,lastName" to "firstName middleName lastName"
     * @param {string} commaDelimitedName
     * @returns {string}
     */
    public formatContributor(commaDelimitedName: string): string {

        return commaDelimitedName.split(/[ ,]+/).join(" ");
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
     * Return the inline style configuration for the chart legend, for the specified project.
     * @param {boolean} selected
     * @returns {any}
     */
    public getLegendStyle(selected: boolean): any {

        // If term is selected, set the background color as well
        if ( selected ) {

            let style = {
                "border-color": "#1F6B9A",
                "background-color": "#1C7CC7"
            };

            return style;
        }
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
     * Return the URL to the meta TSV for the specified project.
     *
     * @param {Project} project
     * @returns {string}
     */
    public getProjectMetaURL(project: Project): string {

        return this.configService.getProjectMetaDownloadURL(project.entryId);
    }

    /**
     * Return the list of authors of the project, or "None" if not specified.
     * Will exclude corresponding contributors and any contributor with role "Human Cell Atlas wrangler".
     * @param contributors
     * @returns {string}
     */
    public listAuthors(contributors: Contributor[]): string {

        let listOfAuthors = contributors.filter((contributor) => {

            if ( contributor.correspondingContributor ) {

                return false;
            }

            return !this.isHCAWrangler(contributor.projectRole);

        }).map(contributor => contributor.contactName);

        return this.stringifyValues((listOfAuthors.map(name => this.formatContributor(name))), "None");
    }

    /**
     * Return the distinct list of collaborating organizations of the project, or "None" if not specified.
     * Will exclude corresponding contributors and any contributor with role "Human Cell Atlas wrangler".
     * @param contributors
     * @returns {string}
     */
    public listCollaboratingOrganizations(contributors): string {

        let listOfCollaboratingOrganizations = contributors.filter(contributor => contributor.correspondingContributor != true && !this.isHCAWrangler(contributor.projectRole)).map(contributor => contributor.institution);

        // Find the distinct list of collaborating organisations
        let uniqueListOfCollaboratingOrganizations = listOfCollaboratingOrganizations.filter((o, i, a) => a.indexOf(o) === i);

        return this.stringifyValues(uniqueListOfCollaboratingOrganizations, "None");
    }

    /**
     * Returns the list of contributors of the project
     * @param contributors
     * @returns {Contributor[]}
     */
    public listContributors(contributors: Contributor[]): Contributor[] {

        return contributors.filter(contributor => contributor.correspondingContributor);
    }

    /**
     * Returns true if device is either mobile or tablet.
     * @returns {boolean}
     */
    public isDeviceHandheld(): boolean {

        this.deviceInfo = this.deviceService.getDeviceInfo();
        const isMobile = this.deviceService.isMobile();
        const isTablet = this.deviceService.isTablet();

        return (isMobile || isTablet);
    }

    /**
     * Returns true if the projectRole is "Human Cell Atlas wrangler".
     * @param {string} projectRole
     * @returns {boolean}
     */
    public isHCAWrangler(projectRole: string): boolean {

        return projectRole && projectRole.toLowerCase() === "human cell atlas wrangler";
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
     * @param {string} projectShortName
     */
    public onProjectSelected(selectedProjectIds: string[], projectId: string, projectShortName: string) {

        const selected = this.isProjectSelected(selectedProjectIds, projectId);
        this.store.dispatch(new SelectProjectIdAction(projectId, projectShortName, !selected));
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
    ngOnDestroy() {

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
                return {
                    project,
                    projectMatrixUrls: projectMatrixUrls,
                    selectedProjectIds
                };
            })
        );
    }
}
