/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Config-related actions.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App Dependencies
import { Config } from "../config.model";

/**
 * Action that is triggered on successful retrieval of config from config end point.
 */
export class FetchConfigRequestSuccessAction implements Action {
    public static ACTION_TYPE = "CONFIG.FETCH_SUCCESS";
    public readonly type = FetchConfigRequestSuccessAction.ACTION_TYPE;
    constructor(public readonly config: Config) {}
}

export type All = FetchConfigRequestSuccessAction;
