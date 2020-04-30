/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Complete application state.
 */

// App dependencies
import { ConfigState } from "../config/_ngrx/config.state";
import { FileState } from "../files/_ngrx/file.state";
import { HttpState } from "../http/_ngrx/http.state";
import { SystemState } from "../system/_ngrx/system.state";
import { TerraState } from "../files/_ngrx/terra/terra.state";
import { ModalState } from "../modal/_ngrx/modal.state";

export interface AppState extends ConfigState, FileState, HttpState, ModalState, SystemState, TerraState {}
