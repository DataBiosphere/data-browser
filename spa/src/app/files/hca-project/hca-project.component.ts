/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying HCA project table details.
 */

// Core dependencies
import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { AppState } from "../../_ngrx/app.state";
import { selectSelectedProject } from "../_ngrx/file.selectors";
import { EntitySelectAction, FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { selectSelectedProjectSearchTerms } from "../_ngrx/search/search.selectors";
import { Contributor } from "../shared/contributor.model";
import EntitySpec from "../shared/entity-spec";
import { Project } from "../shared/project.model";
import { SearchTerm } from "../search/search-term.model";
import { SelectProjectIdAction } from "../_ngrx/search/select-project-id.action";
import { EntityName } from "../shared/entity-name.model";

@Component({
    selector: "hca-project",
    templateUrl: "./hca-project.component.html",
    styleUrls: ["./hca-project.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HCAProjectComponent implements OnInit {

    // Public variables
    public selectedProjectIds$: Observable<string[]>;

    // Template variables
    public project$: Observable<Project>;

    /**
     * @param {ActivatedRoute} activatedRoute
     * @param {Router} router
     * @param {Store<AppState>} store
     */
    public constructor(private activatedRoute: ActivatedRoute,
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
     * Tab provides opportunity to return back to Project table.
     *
     * @returns {EntitySpec[]}
     */
    public getProjectDetailTabs(): EntitySpec[] {

        return [{key: EntityName.PROJECTS, displayName: "Projects"}];
    }

    /**
     * Return the URL to the meta TSV for the specified project.
     *
     * @param {Project} project
     * @returns {string}
     */
    public getProjectMetaURL(project: Project): string {

        const metaURL = this.configService.getProjectMetaURL();
        return `${metaURL}/projects/${project.entryId}.tsv`;
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
     * Handle click on term in list of terms - update store with selected / unsselected project and return user back to
     * project table.
     *
     * @param {string} projectId
     * @param {string} projectShortName
     * @param {boolean} select
     */
    public onProjectSelected(projectId: string, projectShortName: string, select: boolean) {

        this.store.dispatch(new SelectProjectIdAction(projectId, projectShortName, select));
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
     * @param {any} project
     * @returns {boolean}
     */
    public isProjectSelected(selectedProjectIds: string[], project: any): boolean {

        return selectedProjectIds.indexOf(project.entryId) >= 0;
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

        const portalURL =  this.configService.getPortalURL();
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
     * Life cycle hooks
     */

    /**
     * Update state with selected project.
     */
    public ngOnInit() {

        // Add selected project to state - grab the project ID from the URL.
        const projectId = this.activatedRoute.snapshot.paramMap.get("id");
        this.store.dispatch(new FetchProjectRequestAction(projectId));

        // Grab reference to selected project
        this.project$ = this.store.pipe(select(selectSelectedProject));

        // Grab the ID's of the current set of selected projects, if any
        this.selectedProjectIds$ = this.store.pipe(
            select(selectSelectedProjectSearchTerms),
            map(this.mapSearchTermsToProjectIds)
        );
    }
}
