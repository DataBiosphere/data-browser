/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Project-related effects.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { concatMap, distinct, filter, map, mergeMap, skip, switchMap, take, tap, withLatestFrom } from "rxjs/operators";

// App dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { selectCatalog } from "../catalog/catalog.selectors";
import { ClearProjectMatrixArchivePreviewAction } from "./clear-project-matrix-archive-preview.action";
import { ClearProjectMatrixFileLocationsAction } from "./clear-project-matrix-file-locations.action";
import { CopyToClipboardProjectBulkDownloadAction } from "./copy-to-clipboard-project-bulk-download.action";
import { CopyToClipboardProjectTerraUrlAction } from "./copy-to-clipboard-project-terra-url.action";
import { ExportProjectToTerraRequestAction } from "./export-project-to-terra-request.action";
import { FetchProjectMatrixArchivePreviewRequestAction } from "./fetch-project-matrix-archive-preview-request.action";
import { FetchProjectMatrixArchivePreviewSuccessAction } from "./fetch-project-matrix-archive-preview-success.action";
import { FetchProjectManifestFileLocationRequestAction } from "./fetch-project-manifest-file-location-request.action";
import { FetchProjectManifestFileLocationSuccessAction } from "./fetch-project-manifest-file-location-success.action";
import { FetchProjectMatrixFileLocationRequestAction } from "./fetch-project-matrix-file-location-request.action";
import { FetchProjectMatrixFileLocationSuccessAction } from "./fetch-project-matrix-file-location-success.action";
import { FileLocationService } from "../../file-location/file-location.service";
import { LaunchProjectTerraAction } from "./launch-project-terra.action";
import { AppState } from "../../../_ngrx/app.state";
import { selectProjectManifestFileLocation } from "./project.selectors";
import { ProjectService } from "../../project/project.service";
import { selectProjectEditsById } from "../project-edits/project-edits.selectors";
import { RequestProjectBulkDownloadAction } from "./request-project-bulk-download.action";
import { selectPreviousQuery } from "../search/search.selectors";
import { selectProjectSelectedSearchTerms } from "../file-manifest/file-manifest.selectors";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { Project } from "../../shared/project.model";
import { ClearSelectedProjectAction } from "../table/clear-selected-project.action";
import { FetchProjectRequestAction, FetchProjectSuccessAction } from "../table/table.actions";
import { ViewProjectDeprecatedAction } from "../table/view-project-deprecated.action";
import { ViewProjectIntegrationAction } from "../table/view-project-integration.action";
import { ViewProjectSupplementaryLinkAction } from "../table/view-project-supplementary-link.action";
import { ViewProjectWithdrawnAction } from "../table/view-project-withdrawn.action";
import { ViewProjectAccessionAction } from "./view-project-accession.action";

@Injectable()
export class ProjectEffects {

    /**
     * @param {FileLocationService} fileLocationService
     * @param {GTMService} gtmService
     * @param {ProjectService} projectService
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     */
    constructor(private fileLocationService: FileLocationService,
                private gtmService: GTMService,
                private projectService: ProjectService,
                private store: Store<AppState>,
                private actions$: Actions) {}

    /**
     * Trigger fetch and display of project, when selected from the project table. Must also grab projects edit data from
     * the store to update publication and contributor details, where specified.
     */
    
    fetchProject$: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(FetchProjectRequestAction.ACTION_TYPE),
            // Prevent dupe hits to fetch project. Reset distinct check on clear of project.
            distinct((action: FetchProjectRequestAction) => action.projectId,
                this.actions$.pipe(ofType(ClearSelectedProjectAction.ACTION_TYPE))
            ),
            // Grab local overrides for the selected project
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1)),
                    this.store.pipe(select(selectProjectEditsById, {id: action.projectId}), take(1))
                )
            )),
            // Fetch the project and apply any local overrides
            switchMap(([action, catalog, updatedProject]) =>
                this.projectService.fetchProjectById(catalog, action.projectId, updatedProject)),
            // Success - update store with fetched project
            map((project: Project) => new FetchProjectSuccessAction(project))
        ));

    /**
     * Trigger fetch and store of manifest file location.
     */
    
    fetchProjectManifestFileLocation: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(FetchProjectManifestFileLocationRequestAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(this.store.pipe(select(selectCatalog), take(1)))
            )),
            // Merge map here as we don't want to cancel any previous requests for separate project manifests
            mergeMap(([action, catalog]) => {

                // Track request
                this.gtmService.trackEvent((action as FetchProjectManifestFileLocationRequestAction).asEvent({catalog}));

                const {project} = action as FetchProjectManifestFileLocationRequestAction;
                const {entryId: projectId, projectTitle} = project;

                // Set up the kill switch for the polling of the project manifest URL. We'll use the existence of the
                // ProjectManifestUrlResponse object for this project, in the store. The ProjectManifestUrlResponse object is
                // created on request of the ProjectManifestUrl and is cleared on destroy of components that initiate the
                // request.
                const killSwitch$ = this.store.pipe(
                    select(selectProjectManifestFileLocation, {projectId}),
                    skip(1), // Skip the initial undefined value, we need to wait until there's at least an initial response value
                    map(fileLocation => !fileLocation),
                    // Only allow value to emit if project manifest file location response for this project has been cleared from the store
                    filter(cleared => cleared) 
                );

                const fileLocationUrl = this.projectService.getProjectManifestFileLocationUrl(catalog, projectId, projectTitle);
                const fileLocation$ = this.fileLocationService.fetchFileLocation(fileLocationUrl, killSwitch$);
                return fileLocation$.pipe(
                    withLatestFrom(of(action))
                );
            }),
            map(([fileLocation, action]) => {

                const {project} = action as FetchProjectManifestFileLocationRequestAction;
                return new FetchProjectManifestFileLocationSuccessAction(project.entryId, fileLocation);
            })
        ));

    /**
     * Trigger fetch of project matrix archive preview.
     */
    
    fetchProjectMatrixArchivePreview: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(FetchProjectMatrixArchivePreviewRequestAction.ACTION_TYPE),
            // Prevent dupe hits to fetch preview if same matrix ID. Reset distinct check on clear of archive preview.
            distinct((action: FetchProjectMatrixArchivePreviewRequestAction) => action.matrixId,
                this.actions$.pipe(ofType(ClearProjectMatrixArchivePreviewAction.ACTION_TYPE))
            ),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1))
                )
            )),
            mergeMap(([action, catalog]) => {

                // Track request
                this.gtmService.trackEvent((action as FetchProjectMatrixArchivePreviewRequestAction).asEvent({
                    catalog
                }));

                // Kick off request for archive preview
                const { matrixId, matrixVersion } = action as FetchProjectMatrixArchivePreviewRequestAction;
                const archiveFiles$ = this.projectService.fetchProjectMatrixArchiveFiles(matrixId, matrixVersion);
                return archiveFiles$.pipe(
                    withLatestFrom(of(action))
                );
            }),
            map(([archiveFiles, action]) => {

                const {matrixId, project} = action as FetchProjectMatrixArchivePreviewRequestAction;
                return new FetchProjectMatrixArchivePreviewSuccessAction(project.entryId, matrixId, archiveFiles);
            })
        ));

    /**
     * Trigger fetch of project matrix file location.
     */
    
    fetchProjectMatrixFileLocation: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(FetchProjectMatrixFileLocationRequestAction.ACTION_TYPE),
            concatMap(action => of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectCatalog), take(1))
                )
            )),
            mergeMap(([action, catalog]) => {
                
                // Track request
                this.gtmService.trackEvent((action as FetchProjectMatrixFileLocationRequestAction).asEvent({
                    catalog
                }));

                // Create kill switch for request polling: kill when clear action is triggered.
                const killSwitch$ = this.actions$.pipe(
                    ofType(ClearProjectMatrixFileLocationsAction.ACTION_TYPE),
                    map(_ => true),
                    take(1)
                );

                // Kick off request for file location
                const { fileUrl } = action as FetchProjectMatrixFileLocationRequestAction;
                const fileLocation$ = this.fileLocationService.fetchFileLocation(fileUrl, killSwitch$);
                return fileLocation$.pipe(
                    withLatestFrom(of(action))
                );
            }),
            filter(args => !!args), // Skip success action if file location is already in store for this file
            map(([fileLocation, action]) => {

                const {fileUrl, project} = action as FetchProjectMatrixFileLocationRequestAction;
                return new FetchProjectMatrixFileLocationSuccessAction(project.entryId, fileUrl, fileLocation);
            })
        ));

    /**
     * Trigger tracking of project download-related action.
     */
    
    trackProjectDownload$ = createEffect(() => this.actions$.pipe(
        ofType(
            CopyToClipboardProjectBulkDownloadAction.ACTION_TYPE,
            RequestProjectBulkDownloadAction.ACTION_TYPE,
            ExportProjectToTerraRequestAction.ACTION_TYPE,
            CopyToClipboardProjectTerraUrlAction.ACTION_TYPE,
            LaunchProjectTerraAction.ACTION_TYPE
        ),
        concatMap(action => of(action).pipe(
            withLatestFrom(
                this.store.pipe(select(selectCatalog), take(1)),
                this.store.pipe(select(selectProjectSelectedSearchTerms), take(1))
            )
        )),
        tap(([action, catalog, selectedSearchTerms]) => {

            const terms = selectedSearchTerms.map(searchTerm => searchTerm.getSearchValue()).join(", ");
            this.gtmService.trackEvent((action as TrackingAction).asEvent({
                catalog,
                terms
            }));
        })
    ), {dispatch: false});
    
    /**
     * Track click on project accession.
     */
    
    trackProjectAccessionClicked$ = createEffect(() => this.actions$.pipe(
        ofType(ViewProjectAccessionAction.ACTION_TYPE),
        concatMap(action => of(action).pipe(
            withLatestFrom(
                this.store.pipe(select(selectCatalog), take(1))
            )
        )),
        tap(([action, catalog]) => {
            this.gtmService.trackEvent((action as ViewProjectAccessionAction).asEvent({catalog}));
        })
    ), {dispatch: false});
    
    /**
     * Trigger tracking of view of a deprecated project.
     */
    
    viewProjectDeprecated$ = createEffect(() => this.actions$.pipe(
        ofType(ViewProjectDeprecatedAction.ACTION_TYPE),
        concatMap(action => of(action).pipe(
            withLatestFrom(
                this.store.pipe(select(selectCatalog), take(1)),
                this.store.pipe(select(selectPreviousQuery), take(1))
            )
        )),
        tap(([action, catalog, queryWhenActionTriggered]) => {
            this.gtmService.trackEvent((action as ViewProjectDeprecatedAction).asEvent({
                catalog,
                currentQuery: queryWhenActionTriggered
            }));
        })
    ), {dispatch: false});

    /**
     * Trigger tracking of view of a project integration.
     */
    
    viewProjectIntegration$ = createEffect(() => this.actions$.pipe(
        ofType(ViewProjectIntegrationAction.ACTION_TYPE),
        concatMap(action => of(action).pipe(
            withLatestFrom(
                this.store.pipe(select(selectCatalog), take(1)),
                this.store.pipe(select(selectPreviousQuery), take(1))
            )
        )),
        tap(([action, catalog, queryWhenActionTriggered]) => {
            this.gtmService.trackEvent((action as ViewProjectIntegrationAction).asEvent({
                catalog,
                currentQuery: queryWhenActionTriggered
            }));
        })
    ), {dispatch: false});

    /**
     * Trigger tracking of view of a project supplementary link.
     */
    
    viewProjectSupplementaryLink$ = createEffect(() => this.actions$.pipe(
        ofType(ViewProjectSupplementaryLinkAction.ACTION_TYPE),
        concatMap(action => of(action).pipe(
            withLatestFrom(
                this.store.pipe(select(selectCatalog), take(1)),
                this.store.pipe(select(selectPreviousQuery), take(1))
            )
        )),
        tap(([action, catalog, queryWhenActionTriggered]) => {
            this.gtmService.trackEvent((action as ViewProjectSupplementaryLinkAction).asEvent({
                catalog,
                currentQuery: queryWhenActionTriggered
            }));
        })
    ), {dispatch: false});

    /**
     * Trigger tracking of view of a withdrawn project.
     */
    
    viewProjectWithdrawn$ = createEffect(() => this.actions$.pipe(
        ofType(ViewProjectWithdrawnAction.ACTION_TYPE),
        concatMap(action => of(action).pipe(
            withLatestFrom(
                this.store.pipe(select(selectCatalog), take(1)),
                this.store.pipe(select(selectPreviousQuery), take(1))
            )
        )),
        tap(([action, catalog, queryWhenActionTriggered]) => {
            this.gtmService.trackEvent((action as ViewProjectWithdrawnAction).asEvent({
                catalog,
                currentQuery: queryWhenActionTriggered
            }));
        })
    ), {dispatch: false});
}
