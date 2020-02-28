/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing release component.
 */

// App dependencies
import { ReleaseOrganView } from "./release-organ-view.model";

export interface ReleaseState {

    loaded: boolean;
    releaseOrganViews: ReleaseOrganView[]
}
