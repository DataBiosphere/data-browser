
// /**
//  * Repository Reducer
//  *
//  * ICGC: http://docs.icgc.org/portal/api-endpoints/#!/repository
//  */
// import { Action, ActionReducer } from "@ngrx/store";
// import { Observable } from "rxjs/Observable";
// import "@ngrx/core/add/operator/select";
//
// import { ACTIONS } from "../shared";
// import { RepositorySummary } from "./repository-summary";
// import { RepositoryFiles, FilePagination } from "./repository-files/repository-files";
//
// /**
//  * Types
//  */
//
// /**
//  * Reducer State
//  */
// export interface RepositoryState {
//     filesLoaded: boolean;
//     files: RepositoryFiles;
//     summaryLoaded: boolean;
//     summary: RepositorySummary;
// }
//
// /**
//  * Default State
//  */
// const DEFAULT_STATE: RepositoryState = {
//     filesLoaded: false,
//     files: {
//         hits: [],
//         pagination: {} as FilePagination,
//         termFacets: {}
//     },
//     summaryLoaded: false,
//     summary: {
//         fileCount: 0,
//         totalFileSize: 0,
//         donorCount: 0,
//         projectCount: 0,
//         primarySiteCount: 0
//     }
// };
//
// /**
//  * Repository Reducer
//  *
//  * @param state
//  * @param action
//  * @returns {any}
//  */
// export const repositoryReducer: ActionReducer<RepositoryState> = (state = DEFAULT_STATE, action: Action) => {
//
//     switch (action.type) {
//
//         case ACTIONS.RECEIVE_REPOSITORY_SUMMARY:
//             return Object.assign({}, state, {
//                 summaryLoaded: true,
//                 summary: action.payload
//             });
//         case ACTIONS.RECEIVE_REPOSITORY_FILES:
//             return Object.assign({}, state, {
//                 filesLoaded: true,
//                 files: action.payload
//             });
//         default:
//             return state;
//     }
// };
//
// /**
//  * Selectors
//  */
// const getRepository = (state$: Observable<RepositoryState>) => {
//     return state$.select(state => state);
// };
// const getRepositorySummary = (state$: Observable<RepositoryState>) => {
//     return state$.select(state => state.summary);
// };
// const getRepositorySummaryLoaded = (state$: Observable<RepositoryState>) => {
//     return state$.select(state => state.summaryLoaded);
// };
// const getRepositoryFiles = (state$: Observable<RepositoryState>) => {
//     return state$.select(state => state.files);
// };
// const getRepositoryFilesLoaded = (state$: Observable<RepositoryState>) => {
//     return state$.select(state => state.filesLoaded);
// };
//
// export const repositorySelectors = {
//     getRepository,
//     getRepositorySummary,
//     getRepositorySummaryLoaded,
//     getRepositoryFiles,
//     getRepositoryFilesLoaded
// };
