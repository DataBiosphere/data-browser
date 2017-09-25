// import { Injectable } from "@angular/core";
// import { Actions, Effect } from "@ngrx/effects";
// import { Action, Store } from "@ngrx/store";
// import { Observable } from "rxjs/Observable";
// import "rxjs/add/operator/map";
// import "rxjs/add/operator/switchMap";
// import "rxjs/add/operator/combineLatest";
// import "rxjs/add/operator/first";
// import "rxjs/add/observable/concat";
// import "rxjs/add/observable/of";
// import * as _ from "lodash";
//
// import { FilesService } from "../../shared/files.service";
// import {
//     selectSelectedFacetsMap, selectSelectedFileFacets, selectFileFacetMetadataSummary
// } from "../file.selectors";
//
// // Actions
// import {
//     FetchFileFacetsSuccessAction, FetchFileFacetsRequestAction,
//     SelectFileFacetAction
// } from "./file-facet-list.actions";
// import { FileFacet } from "../../shared/file-facet.model";
// import { FetchFileSummaryRequestAction, FetchFileSummarySuccessAction } from "../file-summary/file-summary.actions";
// import { FileSummary } from "../../file-summary/file-summary";
//
//
// @Injectable()
// export class FileFacetListEffects {
//
//     private colorWheel: Map< string, string >;
//     private colorWheelSet: boolean;
//     private colors: string[];
//
//     constructor(private store: Store<AppState>,
//                 private actions$: Actions,
//                 private fileService: FilesService) {
//         this.colorWheel = new Map<string, string >();
//         this.colorWheelSet = false;
//
//         this.colors = [
//             "#1A535C",
//             "#4CC9C0",
//             "#5C83D0",
//             "#FF6B6B",
//             "#FFA560",
//             "#FFE66D",
//             "#113871", // dark blue
//             "#336C74", // light green
//             "#ABF0EB", // light turquoise
//             "#B3C9F2", // light light purple
//             "#B6D67E", // lime green
//             "#BE5951", // salmon
//             "#FFBABA", // light peach
//             "#FFD2AF", // light orange
//             "#eeeeee"
//         ];
//     }
//
//     /**
//      *
//      * Trigger update of  facet counts on init.
//      *
//      * @type {Observable<Action>}
//      */
//     @Effect()
//     initFacets$: Observable<Action> = this.actions$
//         .ofType(FetchFileFacetsRequestAction.ACTION_TYPE)
//         .switchMap(() => {
//             return this.store.select(selectSelectedFacetsMap).first();
//         })
//         .switchMap((selectedFacets) => {
//             return Observable.concat(
//                 // Request Summary
//                 Observable.of(new FetchFileSummaryRequestAction()),
//                 // Request Metadata
//                 Observable.of(new FileFacetMetadataSummaryRequestedAction()),
//                 // Request Facets, and sort by metadata
//                 this.fetchOrderedFileFacets(selectedFacets)
//                     .map((fileFacets: FileFacet[]) => {
//
//                         fileFacets.forEach((fileFacet) => {
//
//                             let colorIndex = 0;
//                             fileFacet.terms.forEach((term) => {
//                                 term.color = this.colors[colorIndex];
//                                 const key = fileFacet.name + ":" + term.name;
//                                 this.colorWheel.set(key, term.color);
//                                 colorIndex++;
//                             });
//                         });
//                         return new FetchFileFacetsSuccessAction(fileFacets);
//                     })
//             );
//         });
//
//     /**
//      *
//      * Trigger update of  facet counts once a facet is selected.
//      *
//      * @type {Observable<Action>}
//      */
//     @Effect()
//     fetchFacets$: Observable<Action> = this.actions$
//         .ofType(SelectFileFacetAction.ACTION_TYPE)
//         .switchMap(() => {
//             return this.store.select(selectSelectedFacetsMap).first();
//         })
//         .switchMap((selectedFacets) => {
//
//             return Observable.concat(
//                 Observable.of(new FetchFileSummaryRequestAction()), // TODO dont make the observable here? do i need concat
//                 // map AND concat?
//                 this.fetchOrderedFileFacets(selectedFacets)
//                     .map((fileFacets) => {
//
//                         fileFacets.forEach((fileFacet) => {
//
//                             fileFacet.terms.forEach((term) => {
//                                 const key = fileFacet.name + ":" + term.name;
//                                 term.color = this.colorWheel.get(key);
//                             });
//                         });
//                         return new FetchFileFacetsSuccessAction(fileFacets);
//                     })
//             );
//         });
//
//     /**
//      *
//      * Trigger update of file summary if a facet changes.
//      *
//      * @type {Observable<Action>}
//      */
//     @Effect()
//     fetchSummary$: Observable<Action> = this.actions$
//         .ofType(SelectFileFacetAction.ACTION_TYPE, FetchFileSummaryRequestAction.ACTION_TYPE)
//         .switchMap(() => {
//             return this.store.select(selectSelectedFileFacets).first();
//         })
//         .switchMap((selectedFacets) => {
//             return this.fileService.fetchFileSummary(selectedFacets);
//         })
//         .map((fileSummary: FileSummary) => {
//
//
//             if (typeof fileSummary.primarySite === "string") {
//                 fileSummary.primarySiteCount = 0;
//             }
//
//             if (typeof fileSummary.totalFileSize === "string") {
//                 fileSummary.totalFileSize = 0;
//             }
//             return new FetchFileSummarySuccessAction(fileSummary);
//         });
//
//     /**
//      * PRIVATES
//      */
//
//     /**
//      * Fetch Ordered File Facets
//      *
//      * @param selectedFacets
//      * @returns {Observable<FileFacet[]>}
//      */
//     private fetchOrderedFileFacets(selectedFacets: Map<string, FileFacet>): Observable<FileFacet[]> {
//         const sortOrderLoaded$ = this.store.select(selectFileFacetMetadataSummary).filter(state => !state.loading);
//         // const sortOrderLoaded$: Observable<boolean> = selectFileFacetMetadataSummaryLoading(this.store).filter(loading => !loading);
//         const sortOrder$ = this.store.select(selectFileFacetMetadataSummary)
//             .map(state => state.sortOrder)
//             .combineLatest(sortOrderLoaded$, (sortOrder) => sortOrder);
//
//         // const sortOrder$: Observable<string[]> = selectFileFacetsSortOrder(this.store).combineLatest(sortOrderLoaded$, (sortOrder) => sortOrder);
//
//         return this.fileService
//             .fetchFileFacets(selectedFacets)
//             .combineLatest(sortOrder$, (fileFacets: FileFacet[], sortOrder: string[]) => {
//
//                 if (!sortOrder || !sortOrder.length) {
//                     return fileFacets;
//                 }
//
//                 return sortOrder.map((sortName) => {
//                     return _.find(fileFacets, { name: sortName });
//                 });
//             });
//     }
// }
