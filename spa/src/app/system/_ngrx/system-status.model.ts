/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of system-related state.
 */

export interface SystemStatus {
    indexing: boolean;
    loading: boolean;
    ok: boolean;
}
