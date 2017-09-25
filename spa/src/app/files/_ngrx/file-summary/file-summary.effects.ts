// import { Injectable } from "@angular/core";
// import { Actions, Effect } from "@ngrx/effects";
// import { Action, Store } from "@ngrx/store";
// import { Observable } from "rxjs/Observable";
// import "rxjs/add/operator/switchMap";
// import "rxjs/add/operator/first";
//
// import { FetchFileSummaryRequestAction, FetchFileSummarySuccessAction } from "./file-summary.actions";
// import { selectSelectedFileFacets } from "../file.selectors";
// import { FilesService } from "../../shared/files.service";
// import { FileSummary } from "../../file-summary/file-summary";
//
//
// @Injectable()
// export class FileSummaryEffects {
//
//     constructor(private store: Store<AppState>,
//                 private actions$: Actions,
//                 private fileService: FilesService) {
//     }
//
//     /**
//      *
//      * Trigger update of file summary if a facet changes.
//      *
//      * @type {Observable<Action>}
//      */
//     @Effect()
//     fetchSummary$: Observable<Action> = this.actions$
//         .ofType(FetchFileSummaryRequestAction.ACTION_TYPE)
//         .switchMap(() => {
//             return this.store.select(selectSelectedFileFacets).first();
//         })
//         .switchMap((selectedFacets) => {
//             return this.fileService.fetchFileSummary(selectedFacets);
//         })
//         .map((fileSummary: FileSummary) => {
//
//             if (typeof fileSummary.primarySite === "string") {
//                 fileSummary.primarySiteCount = 0;
//             }
//
//             if (typeof fileSummary.totalFileSize === "string") {
//                 fileSummary.totalFileSize = 0;
//             }
//
//             return new FetchFileSummarySuccessAction(fileSummary);
//         });
//
// }
