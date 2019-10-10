/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of indexing status-related state.
 */

// App dependencies
import { IndexSuccessAction } from "./index-success.action";

export class IndexState {

    /**
     * @param {boolean} ok
     * @param {boolean} indexing
     */
    constructor(public readonly ok: boolean, public readonly indexing: boolean) {}

    /**
     * Return the current index status on request of index check.
     *
     * @returns {IndexState}
     */
    public indexStatusRequest(): IndexState {

        return this;
    }

    /**
     * Index status response has been returned from the backend - update state.
     *
     * @param {IndexSuccessAction} action
     * @returns {IndexState}
     */
    public receiveIndexStatus(action: IndexSuccessAction): IndexState {

        return new IndexState(action.ok, action.indexing);
    }

    /**
     * Default status is overall indexing status.
     *
     * @returns {IndexState}
     */
    public static getDefaultState() {

        return new IndexState(true,false);
    }
}
