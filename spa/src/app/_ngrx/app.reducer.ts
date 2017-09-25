import * as fileReducer from "../files/_ngrx/file.reducer";
import * as authReducer from "../auth/_ngrx/auth.reducer";
import * as keywordReducer from "../keywords/_ngrx/keyword.reducer";

export const reducers = {
    ...fileReducer.reducer,
    auth: authReducer.reducer,
    keywords: keywordReducer.reducer
};
