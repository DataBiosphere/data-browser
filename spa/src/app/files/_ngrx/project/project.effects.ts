/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Project-related effects.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { concatMap, distinct, filter, map, mergeMap, skip, switchMap, take, tap, withLatestFrom } from "rxjs/operators";

// App dependencies
import { selectCatalog } from "../catalog/catalog.selectors";
import { ClearProjectMatrixFileLocationsAction } from "./clear-project-matrix-file-locations.action";
import { FetchProjectManifestFileLocationRequestAction } from "./fetch-project-manifest-file-location-request.action";
import { FetchProjectManifestFileLocationSuccessAction } from "./fetch-project-manifest-file-location-success.action";
import { FetchProjectMatrixFileLocationRequestAction } from "./fetch-project-matrix-file-location-request.action";
import { FetchProjectMatrixFileLocationSuccessAction } from "./fetch-project-matrix-file-location-success.action";
import { FileLocationService } from "../../file-location/file-location.service";
import { AppState } from "../../../_ngrx/app.state";
import { selectProjectManifestFileLocation } from "./project.selectors";
import { ProjectService } from "../../project/project.service";
import { selectProjectEditsById } from "../project-edits/project-edits.selectors";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { selectPreviousQuery } from "../search/search.selectors";
import { Project } from "../../shared/project.model";
import { ClearSelectedProjectAction } from "../table/clear-selected-project.action";
import { FetchProjectRequestAction, FetchProjectSuccessAction } from "../table/table.actions";
import { ViewProjectDeprecatedAction } from "../table/view-project-deprecated.action";
import { ViewProjectIntegrationAction } from "../table/view-project-integration.action";
import { ViewProjectSupplementaryLinkAction } from "../table/view-project-supplementary-link.action";
import { ViewProjectTabAction } from "../table/view-project-tab.action";
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
    @Effect()
    fetchProject: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchProjectRequestAction.ACTION_TYPE),
            // Prevent dupe hits to fetch project
            distinct((action: FetchProjectRequestAction) =>
                action.projectId,
                this.actions$.pipe(ofType(ClearSelectedProjectAction.ACTION_TYPE))), // Reset distinct check on clear of project
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
        );

    /**
     * Trigger fetch and store of manifest file location.
     */
    @Effect()
    fetchProjectManifestFileLocation: Observable<Action> = this.actions$
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
        );    

    /**
     * Trigger fetch of project matrix file location.
     */
    @Effect()
    fetchProjectMatrixFileLocation: Observable<Action> = this.actions$
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
        );

    /**
     * Track click on project accession.
     */
    @Effect({dispatch: false})
    trackProjectAccessionClicked$ = this.actions$.pipe(
        ofType(ViewProjectAccessionAction.ACTION_TYPE),
        concatMap(action => of(action).pipe(
            withLatestFrom(
                this.store.pipe(select(selectCatalog), take(1))
            )
        )),
        tap(([action, catalog]) => {
            this.gtmService.trackEvent((action as ViewProjectAccessionAction).asEvent({catalog}));
        })
    );
    
    /**
     * Trigger tracking of view of a deprecated project.
     */
    @Effect({dispatch: false})
    viewProjectDeprecated$ = this.actions$.pipe(
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
    );

    /**
     * Trigger tracking of view of a project integration.
     */
    @Effect({dispatch: false})
    viewProjectIntegration$ = this.actions$.pipe(
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
    );

    /**
     * Trigger tracking of view of a project supplementary link.
     */
    @Effect({dispatch: false})
    viewProjectSupplementaryLink$ = this.actions$.pipe(
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
    );

    /**
     * Trigger tracking of view of any project tab (for example, matrices, external resources).
     */
    @Effect({dispatch: false})
    viewProjectTab$ = this.actions$.pipe(
        ofType(ViewProjectTabAction.ACTION_TYPE),
        concatMap(action => of(action).pipe(
            withLatestFrom(
                this.store.pipe(select(selectCatalog), take(1)),
                this.store.pipe(select(selectPreviousQuery), take(1))
            )
        )),    
        tap(([action, catalog, queryWhenActionTriggered]) => {
            this.gtmService.trackEvent((action as ViewProjectTabAction).asEvent({
                catalog,
                currentQuery: queryWhenActionTriggered
            }));
        })
    );

    /**
     * Trigger tracking of view of a withdrawn project.
     */
    @Effect({dispatch: false})
    viewProjectWithdrawn$ = this.actions$.pipe(
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
    );
}
