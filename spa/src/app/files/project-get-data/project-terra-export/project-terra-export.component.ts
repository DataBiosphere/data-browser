/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying project-specific export to Terra component, and handling the corresponding
 * functionality.
 * 
 *  * Example Hierarchy:
 * ------------------
 * ProjectTerraExportComponent
 *   - Dispatch
 *     - fetch project
 *     - fetch project-specific summary (required for right side stats)
 *     - fetch project-specific file type summaries excluding file types (required for file type form, requires update on select of file type)
 *     - fetch project-specific file facets (requires update on select of file type)
 *   - Select
 *     - select project
 *     - project-specific file type summaries excluding file types (required for file type form)
  *     - select project-specific file facets (requires update on select of file type)
 *     - select project-specific summary (required for right side stats)
 *   - Renders
 *     - different states of download (file type summary form, in progress, completed)
 * 
 * ProjectLayoutComponent
 *   - Renders
 *     - general layout and right side states
 */

// Core dependencies
import { Component, OnDestroy, OnInit  } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, combineLatest, Subject } from "rxjs";
import { filter, map, take, takeUntil } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../../config/config.service";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { FacetTermSelectedEvent } from "../../facet/file-facet/facet-term-selected.event";
import { Facet } from "../../facet/facet.model";
import { ManifestDownloadFormat } from "../../file-manifest/manifest-download-format.model";
import { ManifestResponse } from "../../file-manifest/manifest-response.model";
import { BulkDownloadExecutionEnvironment } from "../../get-data/bulk-download/bulk-download-execution-environment.model";
import { AppState } from "../../../_ngrx/app.state";
import { ClearFileManifestFileTypeSummaries } from "../../_ngrx/file-manifest/clear-file-manifest-file-type.summaries";
import { ClearFilesFacetsAction } from "../../_ngrx/facet/clear-files-facets.action";
import { selectFilesFacets } from "../../_ngrx/facet/facet.selectors";
import { FetchProjectFilesFacetsRequestAction } from "../../_ngrx/facet/fetch-project-files-facets-request.action";
import { FetchFileManifestProjectFileTypeSummariesRequestAction } from "../../_ngrx/file-manifest/fetch-file-manifest-project-file-type-summaries-request.action";
import { FetchProjectFileSummaryRequestAction } from "../../_ngrx/file-manifest/fetch-project-file-summary-request.actions";
import { selectSelectedProject } from "../../_ngrx/files.selectors";
import {
    selectFileManifestFileTypeSummaries,
    selectProjectFileSummary
} from "../../_ngrx/file-manifest/file-manifest.selectors";
import { CopyToClipboardProjectTerraUrlAction } from "../../_ngrx/project/copy-to-clipboard-project-terra-url.action";
import { LaunchProjectTerraAction } from "../../_ngrx/project/launch-project-terra.action";
import { FetchProjectRequestAction } from "../../_ngrx/table/table.actions";
import { ExportToTerraProjectRequestAction } from "../../_ngrx/project/export-to-terra-project-request.action";
import { ResetExportToTerraStatusAction } from "../../_ngrx/terra/reset-export-to-terra-status.action";
import { selectExportToTerra } from "../../_ngrx/terra/terra.selectors";
import { ProjectTerraExportState } from "./project-terra-export.state";
import { SearchFacetTerm } from "../../search/search-facet-term.model";
import { SearchTerm } from "../../search/search-term.model";
import EntitySpec from "../../shared/entity-spec";
import { ExportToTerraStatus } from "../../shared/export-to-terra-status.model";
import { Project } from "../../shared/project.model";
import { TerraService } from "../../shared/terra.service";
import { ProjectDetailService } from "../../project-detail/project-detail.service";
import { ProjectTab } from "../../project-detail/project-tab.model";

@Component({
    selector: "project-terra-export",
    templateUrl: "./project-terra-export.component.html",
    styleUrls: ["./project-terra-export.component.scss"]
})
export class ProjectTerraExportComponent implements OnDestroy, OnInit {

    // Template variables
    public manifestDownloadFormat = ManifestDownloadFormat.TERRA_BDBAG;
    public portalURL: string;
    public selectedSearchTermNames: string[] = [];
    public selectedSearchTerms: SearchTerm[] = [];
    public state$ = new BehaviorSubject<ProjectTerraExportState>({
        loaded: false
    });

    // Locals
    private ngDestroy$ = new Subject<boolean>();

    /**
     * @param {ConfigService} configService
     * @param {ProjectDetailService} projectDetailService
     * @param {TerraService} terraService
     * @param {Store<AppState>} store
     * @param {ActivatedRoute} activatedRoute
     * @param {Router} router
     */
    constructor(
        private configService: ConfigService,
        private projectDetailService: ProjectDetailService,
        private terraService: TerraService,
        private store: Store<AppState>,
        private activatedRoute: ActivatedRoute,
        private router: Router) {

        this.portalURL = this.configService.getPortalUrl();
    }

    /**
     * Return the curl command for the generated manifest.
     *
     * @param {ManifestResponse} manifestResponse
     * @param {BulkDownloadExecutionEnvironment} executionEnvironment
     * @returns {string}
     */
    public getCurlCommand(manifestResponse: ManifestResponse, executionEnvironment: BulkDownloadExecutionEnvironment): string {

        return manifestResponse.commandLine[executionEnvironment];
    }

    /**
     * Return user to project overview
     */
    public getBackButtonTab(): EntitySpec[] {

        const key = "Project Overview";
        return [{
            key,
            displayName: key
        }];
    }

    /**
     * Return set of possible manifest download formats.
     */
    public getManifestDownloadFormats(): ManifestDownloadFormat[] {

        return [ManifestDownloadFormat.TERRA_BDBAG, ManifestDownloadFormat.TERRA_PFB];
    }

    /**
     * Returns the terra workspace URL.
     *
     * @param exportToTerraUrl
     * @returns {string}
     */
    public getTerraServiceUrl(exportToTerraUrl): string {

        return this.terraService.buildExportToTerraWorkspaceUrl(exportToTerraUrl);
    }

    /**
     * Returns true if any "fileFormat" facet terms are selected.
     * @param {SearchTerm[]} selectedSearchTerms
     * @returns {boolean}
     */
    public isAnyFileFormatSelected(selectedSearchTerms: SearchTerm[]): boolean {

        return selectedSearchTerms.some(selectedSearchTerm =>
            selectedSearchTerm.getSearchKey() === FileFacetName.FILE_FORMAT);
    }

    /**
     * Returns true if current environment is dev.
     *
     * @returns {boolean}
     */
    public isManifestDownloadFormatEnabled(): boolean {

        return this.configService.isEnvCGLDev();
    }

    /**
     * Returns true if export to Terra request has been completed.
     *
     * @param {ExportToTerraStatus} status
     * @returns {boolean}
     */
    public isRequestComplete(status: ExportToTerraStatus): boolean {

        return this.terraService.isExportToTerraRequestComplete(status);
    }

    /**
     * Returns true if an error occurred during the export to Terra request.
     *
     * @param {ExportToTerraStatus} status
     * @returns {boolean}
     */
    public isRequestFailed(status: ExportToTerraStatus): boolean {

        return this.terraService.isExportToTerraRequestFailed(status);
    }

    /**
     * Returns true if export to Terra request is in progress.
     *
     * @param {ExportToTerraStatus} status
     * @returns {boolean}
     */
    public isRequestInProgress(status: ExportToTerraStatus): boolean {

        return (this.terraService.isExportToTerraRequestInitiated(status) ||
            this.terraService.isExportToTerraRequestInProgress(status));
    }

    /**
     * Returns true if export to Terra request has not yet been started.
     *
     * @param {ExportToTerraStatus} status
     * @returns {boolean}
     */
    public isRequestNotStarted(status: ExportToTerraStatus): boolean {

        return this.terraService.isExportToTerraRequestNotStarted(status);
    }

    /**
     * Track click on Terra data link.
     *
     * @param {Project} project
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {string} exportToTerraUrl
     */
    public onDataLinkClicked(project: Project, selectedSearchTerms: SearchTerm[], exportToTerraUrl: string) {

        this.store.dispatch(new LaunchProjectTerraAction(project, selectedSearchTerms, exportToTerraUrl));
    }


    /**
     * Track click on copy of Terra data link.
     *
     * @param {Project} project
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {string} exportToTerraUrl
     */
    public onDataLinkCopied(project: Project, selectedSearchTerms: SearchTerm[], exportToTerraUrl: string) {

        this.store.dispatch(new CopyToClipboardProjectTerraUrlAction(project, selectedSearchTerms, exportToTerraUrl));
    }

    /**
     * Dispatch action to export to Terra.
     * 
     * @param {Project} project
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {Facet[]} filesFacet
     * @param {ManifestDownloadFormat} manifestDownloadFormat
     */
    public onExportToTerra(project: Project,
                           selectedSearchTerms: SearchTerm[],
                           filesFacet: Facet[], 
                           manifestDownloadFormat: ManifestDownloadFormat) {

        const fileFormatFacet = filesFacet.find(facet => facet.name === FileFacetName.FILE_FORMAT);
        this.store.dispatch(new ExportToTerraProjectRequestAction(project, selectedSearchTerms, fileFormatFacet, manifestDownloadFormat));
    }

    /**
     * Handle click on term in list of terms; toggle selected value of term.
     *
     * @param {string} projectId
     * @param facetTermSelectedEvent {FacetTermSelectedEvent}
     */
    public onFacetTermSelected(projectId: string, facetTermSelectedEvent: FacetTermSelectedEvent) {

        // Determine the set of selected file formats
        const { termName, selected } = facetTermSelectedEvent;
        const index = this.selectedSearchTermNames.indexOf(termName);
        const currentlySelected = index >= 0;
        if ( selected && !currentlySelected ) {
            this.selectedSearchTermNames.push(termName);
        }
        else if ( !selected && currentlySelected ) {
            this.selectedSearchTermNames.splice(index, 1);
        }

        // Build up the set of search terms for the set of selected file formats
        this.selectedSearchTerms = this.selectedSearchTermNames.map(searchTermName => {
            return new SearchFacetTerm(FileFacetName.FILE_FORMAT, searchTermName);
        });

        // Kick off request for project-specific summary including any selected file types. Required for updating
        // right side stats on select of file type.
        this.store.dispatch(new FetchProjectFileSummaryRequestAction(projectId, this.selectedSearchTerms));

        // Get the list of facets to display. Must pull these from the files endpoint and specific to this project.
        //  Required for updating right side stats on select of file type.
        this.store.dispatch(new FetchProjectFilesFacetsRequestAction(projectId, this.selectedSearchTerms));
    }

    /**
     * Handle select on manifest download format radio button.
     */
    public onManifestDownloadFormat(manifestDownloadFormat: ManifestDownloadFormat) {

        this.manifestDownloadFormat = manifestDownloadFormat;
    }

    /**
     * Handle click on back button.
     * 
     * @param {string} projectId
     */
    public onTabSelected(projectId: string): void {

        this.router.navigate(["/projects", projectId]);
    }

    /**
     * Open new window on completion of export to Terra request.
     */
    private initRequestCompleteSubscriber() {

        this.state$
            .pipe(
                takeUntil(this.ngDestroy$),
                filter(({exportToTerraStatus}) => this.isRequestComplete(exportToTerraStatus))
            )
            .subscribe((state) => {

                window.open(this.terraService.buildExportToTerraWorkspaceUrl(state.exportToTerraUrl));
            });
    }

    /**
     * Clear summary and kill subscriptions on exit of component.
     */
    public ngOnDestroy() {

        // Clear project-specific:
        // - file type summaries
        // - project file summary
        this.store.dispatch(new ClearFileManifestFileTypeSummaries());

        // Clear project-specific files facets.
        this.store.dispatch(new ClearFilesFacetsAction());

        // Reset export to Terra request status
        this.store.dispatch(new ResetExportToTerraStatusAction());

        // Remove project description meta
        this.projectDetailService.removeProjectMeta();

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Set up selectors and request initial data set.
     */
    public ngOnInit() {

        // Add selected project to state - grab the project ID from the URL.
        const projectId = this.activatedRoute.parent.snapshot.paramMap.get("id");
        this.store.dispatch(new FetchProjectRequestAction(projectId));

        // Kick off request for project-specific file type summaries. Required for populating file type form.
        this.store.dispatch(new FetchFileManifestProjectFileTypeSummariesRequestAction(projectId));

        // Kick off request for project-specific summary including any selected file types. Required for populating
        // right side stats.
        this.store.dispatch(new FetchProjectFileSummaryRequestAction(projectId, this.selectedSearchTerms));

        // Get the list of facets to display. Must pull these from the files endpoint and specific to this project.
        this.store.dispatch(new FetchProjectFilesFacetsRequestAction(projectId, this.selectedSearchTerms));

        // Grab reference to selected project
        const project$ = this.store.pipe(
            select(selectSelectedProject),
            takeUntil(this.ngDestroy$),
            filter(project => !!project),
            take(1)
        );

        // Grab file summary for displaying file types form. 
        const fileTypeSummaries$ = this.store.pipe(select(selectFileManifestFileTypeSummaries));

        // Grab file facets, required for right side stats. Files facets are project-specific (on dispatch) but share
        // the same slot in the store as the general "filesFacets" for selected data download.
        const filesFacets$ = this.store.pipe(select(selectFilesFacets));

        // Grab project-specific file summary, required for right side stats.
        const projectFileSummary$ = this.store.pipe(select(selectProjectFileSummary));

        // Update the UI with any changes in the Terra export request status and URL
        const exportToTerra$ = this.store.pipe(select(selectExportToTerra));

        combineLatest([
            project$,
            fileTypeSummaries$,
            filesFacets$,
            projectFileSummary$,
            exportToTerra$
        ]).pipe(
            filter(([, , filesFacets, fileSummary]) => {
                return filesFacets.length && Object.keys(fileSummary).length > 0
            }),
            map(([project, fileTypeSummaries, filesFacets, fileSummary, exportToTerra]) => {

                return {
                    filesFacets,
                    fileSummary,
                    fileTypeSummaries,
                    loaded: true,
                    project,
                    ...exportToTerra
                };
            }),
            takeUntil(this.ngDestroy$)
        ).subscribe(state => {

            this.state$.next(state);

            // Update description meta for this project
            this.projectDetailService.addProjectMeta(state.project.projectTitle, ProjectTab.PROJECT_TERRA_EXPORT);
        });

        this.initRequestCompleteSubscriber();
    }
}
