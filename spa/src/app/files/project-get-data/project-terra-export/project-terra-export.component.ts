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
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, combineLatest, Subject } from "rxjs";
import { filter, map, skip, take, takeUntil, tap } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../../config/config.service";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { FacetTermSelectedEvent } from "../../facet/file-facet/facet-term-selected.event";
import { Facet } from "../../facet/facet.model";
import { FileFacet } from "../../facet/file-facet/file-facet.model";
import { ManifestDownloadFormat } from "../../file-manifest/manifest-download-format.model";
import { ManifestResponse } from "../../file-manifest/manifest-response.model";
import { BulkDownloadExecutionEnvironment } from "../../get-data/bulk-download/bulk-download-execution-environment.model";
import { AppState } from "../../../_ngrx/app.state";
import { FetchProjectFilesFacetsRequestAction } from "../../_ngrx/facet/fetch-project-files-facets-request.action";
import { ClearFilesFacetsAction } from "../../_ngrx/file-manifest/clear-files-facets.action";
import { ClearFileManifestFileTypeSummaries } from "../../_ngrx/file-manifest/clear-file-manifest-file-type.summaries";
import { FetchProjectFileSummaryRequestAction } from "../../_ngrx/file-manifest/fetch-project-file-summary-request.actions";
import { SelectProjectFileFacetTermAction } from "../../_ngrx/file-manifest/select-project-file-facet-term.action";
import { FetchProjectSpeciesFacetRequestAction } from "../../_ngrx/file-manifest/fetch-project-species-facet-request.action";
import { FetchFileManifestFileTypeSummariesRequestAction } from "../../_ngrx/file-manifest/fetch-file-manifest-file-type-summaries-request.action";
import { selectFileManifest } from "../../_ngrx/file-manifest/file-manifest.selectors";
import { selectSelectedProject } from "../../_ngrx/files.selectors";
import { CopyToClipboardProjectTerraUrlAction } from "../../_ngrx/project/copy-to-clipboard-project-terra-url.action";
import { LaunchProjectTerraAction } from "../../_ngrx/project/launch-project-terra.action";
import { ExportProjectToTerraRequestAction } from "../../_ngrx/project/export-project-to-terra-request.action";
import { FetchProjectRequestAction } from "../../_ngrx/table/table.actions";
import { ResetExportToTerraStatusAction } from "../../_ngrx/terra/reset-export-to-terra-status.action";
import { selectExportToTerra } from "../../_ngrx/terra/terra.selectors";
import { ProjectDetailService } from "../../project-detail/project-detail.service";
import { ProjectTab } from "../../project-detail/project-tab.model";
import { ProjectTerraExportState } from "./project-terra-export.state";
import { SearchTerm } from "../../search/search-term.model";
import EntitySpec from "../../shared/entity-spec";
import { ExportToTerraStatus } from "../../shared/export-to-terra-status.model";
import { Project } from "../../shared/project.model";
import { TerraService } from "../../shared/terra.service";

@Component({
    selector: "project-terra-export",
    templateUrl: "./project-terra-export.component.html",
    styleUrls: ["./project-terra-export.component.scss"],
})
export class ProjectTerraExportComponent implements OnDestroy, OnInit {
    // Template variables
    public manifestDownloadFormat = ManifestDownloadFormat.TERRA_BDBAG;
    public portalURL: string;
    public selectedSearchTermNames: string[] = [];
    public selectedSearchTerms: SearchTerm[] = [];
    public state$ = new BehaviorSubject<ProjectTerraExportState>({
        loaded: false,
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
        private router: Router
    ) {
        this.portalURL = this.configService.getPortalUrl();
    }

    /**
     * Return the curl command for the generated manifest.
     *
     * @param {ManifestResponse} manifestResponse
     * @param {BulkDownloadExecutionEnvironment} executionEnvironment
     * @returns {string}
     */
    public getCurlCommand(
        manifestResponse: ManifestResponse,
        executionEnvironment: BulkDownloadExecutionEnvironment
    ): string {
        return manifestResponse.commandLine[executionEnvironment];
    }

    /**
     * Return user to project overview
     */
    public getBackButtonTab(): EntitySpec[] {
        const key = "Project Overview";
        return [
            {
                key,
                displayName: key,
            },
        ];
    }

    /**
     * Returns the species facet, required for displaying species form.
     *
     * @param {Facet[]} filesFacets
     * @returns {Facet}
     */
    public getSpeciesFacet(filesFacets: Facet[]): Facet {
        return filesFacets.find(
            (facet) => facet.name === FileFacetName.GENUS_SPECIES
        ) as FileFacet;
    }

    /**
     * Return set of possible manifest download formats.
     */
    public getManifestDownloadFormats(): ManifestDownloadFormat[] {
        return [
            ManifestDownloadFormat.TERRA_BDBAG,
            ManifestDownloadFormat.TERRA_PFB,
        ];
    }

    /**
     * Returns the terra workspace URL.
     *
     * @param {ManifestDownloadFormat} format
     * @param {string} exportToTerraUrl
     * @returns {string}
     */
    public getTerraServiceUrl(
        format: ManifestDownloadFormat,
        exportToTerraUrl: string
    ): string {
        return this.terraService.buildExportToTerraWorkspaceUrl(
            format,
            exportToTerraUrl
        );
    }

    /**
     * Returns true if any terms in the given facet are selected.
     *
     * @param {FileFacetName} facetName
     * @param {SearchTerm[]} selectedSearchTerms
     * @returns {boolean}
     */
    public isAnyTermSelected(
        facetName: FileFacetName,
        selectedSearchTerms: SearchTerm[]
    ): boolean {
        return selectedSearchTerms.some(
            (selectedSearchTerm) =>
                selectedSearchTerm.getSearchKey() === facetName
        );
    }

    /**
     * Returns true if file type form field is valid. That is, at least one file type has been selected.
     *
     * @param {SearchTerm[]} selectedSearchTerms
     * @returns {boolean}
     */
    private isFileTypeValid(selectedSearchTerms: SearchTerm[]): boolean {
        return this.isAnyTermSelected(
            FileFacetName.FILE_FORMAT,
            selectedSearchTerms
        );
    }

    /**
     * Returns true if species form field is valid. That is, at least one species has been selected.
     *
     * @param {SearchTerm[]} selectedSearchTerms
     * @returns {boolean}
     */
    private isSpeciesValid(selectedSearchTerms: SearchTerm[]): boolean {
        return this.isAnyTermSelected(
            FileFacetName.GENUS_SPECIES,
            selectedSearchTerms
        );
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
     * Returns true if Terra export request form is valid. That is, at least one file format as well as species is
     * selected.
     *
     * @param {SearchTerm[]} selectedSearchTerms
     * @returns {boolean}
     */
    public isRequestFormValid(selectedSearchTerms: SearchTerm[]): boolean {
        return (
            this.isFileTypeValid(selectedSearchTerms) &&
            this.isSpeciesValid(selectedSearchTerms)
        );
    }

    /**
     * Returns true if export to Terra request is in progress.
     *
     * @param {ExportToTerraStatus} status
     * @returns {boolean}
     */
    public isRequestInProgress(status: ExportToTerraStatus): boolean {
        return (
            this.terraService.isExportToTerraRequestInitiated(status) ||
            this.terraService.isExportToTerraRequestInProgress(status)
        );
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
     * @param {string} exportToTerraUrl
     */
    public onDataLinkClicked(project: Project, exportToTerraUrl: string) {
        this.store.dispatch(
            new LaunchProjectTerraAction(project, exportToTerraUrl)
        );
    }

    /**
     * Track click on copy of Terra data link.
     *
     * @param {Project} project
     * @param {string} exportToTerraUrl
     */
    public onDataLinkCopied(project: Project, exportToTerraUrl: string) {
        this.store.dispatch(
            new CopyToClipboardProjectTerraUrlAction(project, exportToTerraUrl)
        );
    }

    /**
     * Dispatch action to export to Terra.
     *
     * @param {Project} project
     * @param {ManifestDownloadFormat} manifestDownloadFormat
     */
    public onExportToTerra(
        project: Project,
        manifestDownloadFormat: ManifestDownloadFormat
    ) {
        this.store.dispatch(
            new ExportProjectToTerraRequestAction(
                project,
                manifestDownloadFormat
            )
        );
    }

    /**
     * Handle click on term in list of selected file types; update store and toggle selected value of term.
     *
     * @param facetTermSelectedEvent {FacetTermSelectedEvent}
     */
    public onFacetTermSelected(facetTermSelectedEvent: FacetTermSelectedEvent) {
        // Dispatch action to update project download-specific facets
        const action = new SelectProjectFileFacetTermAction(
            facetTermSelectedEvent.facetName,
            facetTermSelectedEvent.termName,
            null, // Display value only required for project ID facet,
            facetTermSelectedEvent.selected
        );
        this.store.dispatch(action);

        // Kick off request for project-specific file type summaries. Required for populating file type form. Update
        // of file types summaries only required if change in species.
        if (facetTermSelectedEvent.facetName === FileFacetName.GENUS_SPECIES) {
            this.store.dispatch(
                new FetchFileManifestFileTypeSummariesRequestAction(true)
            );
        }

        // Kick off request for project-specific summary including any selected file types. Required for populating
        // right side stats.
        this.store.dispatch(new FetchProjectFileSummaryRequestAction());

        // Get the list of facets to display. Must pull these from the files endpoint and specific to this project.
        this.store.dispatch(new FetchProjectFilesFacetsRequestAction());
    }

    /**
     * Handle select on manifest download format radio button.
     */
    public onManifestDownloadFormat(
        manifestDownloadFormat: ManifestDownloadFormat
    ) {
        this.manifestDownloadFormat = manifestDownloadFormat;
    }

    /**
     * Handle click on back button.
     *
     * @param {string} projectId
     */
    public onTabSelected(projectId: string): void {
        this.router.navigate(["/projects", projectId], {
            queryParamsHandling: "preserve",
        });
    }

    /**
     * Open new window on completion of export to Terra request.
     */
    private initRequestCompleteSubscriber() {
        this.state$
            .pipe(
                takeUntil(this.ngDestroy$),
                filter(({ exportToTerraStatus }) =>
                    this.isRequestComplete(exportToTerraStatus)
                ),
                take(1)
            )
            .subscribe((state) => {
                const url = this.terraService.buildExportToTerraWorkspaceUrl(
                    this.manifestDownloadFormat,
                    state.exportToTerraUrl
                );
                window.open(url);
            });
    }

    /**
     * Return text to display if form is currently invalid.
     *
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {BulkDownloadExecutionEnvironment} os
     * @returns {string}
     */
    getInvalidFormMessage(
        selectedSearchTerms: SearchTerm[],
        os: BulkDownloadExecutionEnvironment
    ) {
        const invalidFields = [];
        if (!this.isFileTypeValid(selectedSearchTerms)) {
            invalidFields.push("file type");
        }
        if (!this.isSpeciesValid(selectedSearchTerms)) {
            invalidFields.push("species");
        }
        if (invalidFields.length === 0) {
            return "";
        }

        const fields = [];
        if (invalidFields.length > 2) {
            invalidFields.forEach((invalidField, i) => {
                if (i === invalidFields.length - 1) {
                    fields.push(" and ");
                    fields.push(invalidField);
                } else {
                    fields.push(invalidField);
                    fields.push(", ");
                }
            });
        } else {
            fields.push(invalidFields.join(" and "));
        }

        return `To continue, select a ${fields.join("")}.`;
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
        // Add selected project to state - grab the project ID from the URL. Update download state to include selected
        // project ID.
        const projectId =
            this.activatedRoute.parent.snapshot.paramMap.get("id");
        this.store.dispatch(new FetchProjectRequestAction(projectId));

        // Grab reference to selected project then dispatch related events
        const project$ = this.store.pipe(
            select(selectSelectedProject),
            takeUntil(this.ngDestroy$),
            filter((project) => !!project),
            take(1),
            tap((project) => {
                this.store.dispatch(
                    new SelectProjectFileFacetTermAction(
                        FileFacetName.PROJECT_ID,
                        projectId,
                        project.projectShortname,
                        true
                    )
                );

                // Determine species count of project; required for autoselecting species checkbox
                this.store.dispatch(
                    new FetchProjectSpeciesFacetRequestAction()
                );

                // Kick off request for project-specific file type summaries. Required for populating file type form.
                this.store.dispatch(
                    new FetchFileManifestFileTypeSummariesRequestAction(true)
                );

                // Kick off request for project-specific summary including any selected file types. Required for populating
                // right side stats.
                this.store.dispatch(new FetchProjectFileSummaryRequestAction());

                // Get the list of facets to display. Must pull these from the files endpoint and specific to this project.
                this.store.dispatch(new FetchProjectFilesFacetsRequestAction());
            })
        );

        // Grab the download state
        const fileManifest$ = this.store.pipe(select(selectFileManifest));

        // Update the UI with any changes in the Terra export request status and URL
        const exportToTerra$ = this.store.pipe(select(selectExportToTerra));

        combineLatest([project$, fileManifest$, exportToTerra$, exportToTerra$])
            .pipe(
                takeUntil(this.ngDestroy$),
                filter(([, fileManifest]) => {
                    return (
                        fileManifest.filesFacets.length &&
                        Object.keys(fileManifest.projectFileSummary).length > 0
                    );
                }),
                map(([project, fileManifest, exportToTerra]) => {
                    const selectedSearchTermNames =
                        fileManifest.selectedProjectSearchTerms.map(
                            (searchTerm) => searchTerm.getDisplayValue()
                        );

                    return {
                        filesFacets: fileManifest.filesFacets,
                        fileSummary: fileManifest.projectFileSummary,
                        fileTypeSummaries: fileManifest.fileTypeSummaries,
                        loaded: true,
                        project,
                        projectSpeciesFacet: fileManifest.projectSpeciesFacet,
                        selectedSearchTerms:
                            fileManifest.selectedProjectSearchTerms,
                        selectedSearchTermNames,
                        ...exportToTerra,
                    };
                })
            )
            .subscribe((state) => {
                this.state$.next(state);

                // Update description meta for this project
                this.projectDetailService.addProjectMeta(
                    state.project.projectTitle,
                    ProjectTab.PROJECT_TERRA_EXPORT
                );
            });

        // Autoselect species if project only has a single species
        const speciesSelector$ = this.state$
            .pipe(
                takeUntil(this.ngDestroy$),
                skip(1) // Skip initial value
            )
            .subscribe((state) => {
                // If project only has a single species, select it if it hasn't been selected already
                const projectSpeciesFacet =
                    state.projectSpeciesFacet as FileFacet;
                const singleSpecies = projectSpeciesFacet.termCount === 1;
                if (singleSpecies) {
                    const term = projectSpeciesFacet.terms[0];
                    if (
                        state.selectedSearchTermNames.indexOf(term.name) === -1
                    ) {
                        const selectSpeciesAction =
                            new SelectProjectFileFacetTermAction(
                                projectSpeciesFacet.name,
                                term.name,
                                null,
                                true
                            );
                        this.store.dispatch(selectSpeciesAction);
                    }
                }

                speciesSelector$.unsubscribe();
            });

        this.initRequestCompleteSubscriber();
    }
}
