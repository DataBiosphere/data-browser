/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Complete application state.
 */

// App dependencies
import { ConfigState } from "../config/_ngrx/config.state";
import { FilesState } from "../files/_ngrx/files.state";
import { HttpState } from "../http/_ngrx/http.state";
import { SupportRequestState } from "../support-request/_ngrx/support-request.state";
import { SystemState } from "../system/_ngrx/system.state";
import { TerraState } from "../files/_ngrx/terra/terra.state";
import { ModalState } from "../modal/_ngrx/modal.state";

export interface AppState
    extends ConfigState, FilesState, HttpState, ModalState, SupportRequestState, SystemState, TerraState {
}
