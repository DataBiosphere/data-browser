import { ActionReducer } from "@ngrx/store";
import {
    repositorySummaryReducer,
    RepositorySummaryState,
    repositoryFilesReducer,
    RepositoryFilesState
} from "../repository";

export interface BoardwalkStore {
    repositorySummary: RepositorySummaryState;
    repositoryFiles: RepositoryFilesState;
}

interface Reducers {
    [key: string]: ActionReducer<any>;
}

export const reducers: Reducers = {
    "repositorySummary": repositorySummaryReducer,
    "repositoryFiles": repositoryFilesReducer
};

