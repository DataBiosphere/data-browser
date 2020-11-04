/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of facet group config, including spec for environments where facet is applicable.
 */

// App dependencies
import { FacetDisplayConfig } from "./facet-display-config.model";

export interface FacetGroupDisplayConfig {

    facetGroupName: string;
    facets: FacetDisplayConfig[];
}
