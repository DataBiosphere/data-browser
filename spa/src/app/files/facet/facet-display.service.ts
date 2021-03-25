/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for organizing and formatting file facet-related values.
 */

// Core dependencies
import { Injectable } from "@angular/core";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { FacetDisplayConfig } from "./facet-display-config.model";
import facetGroupConfigs from "./facet-group-display-configs.json";
import { FacetGroupDisplayConfig } from "./facet-group-display-config.model";
import { FacetGroup } from "./facet-group.model";
import { FileFacetNameDisplay } from "./file-facet/file-facet-name-display.model";
import { CamelToSpacePipe } from "../../pipe/camel-to-space/camel-to-space.pipe";

@Injectable()
export class FacetDisplayService {

    // Public members
    public facetGroups: FacetGroup[] = [];

    // Locals
    private camelToSpacePipe = new CamelToSpacePipe();

    /**
     * Set up set of facet groups for this environment.
     */
    constructor(private configService: ConfigService) {

        this.facetGroups = this.buildFacetGroups(facetGroupConfigs);
    }

    /**
     * Return the calculated facet groups for the current environment.
     * 
     * @returns {FacetGroup[]}
     */
    public getFacetGroups(): FacetGroup[] {
        
        return this.facetGroups;
    }

    /**
     * Determine display name for specified facet name. Search terms are grouped by file facet name.
     *
     * @param {string} fileFacetName
     * @returns {name}
     */
    public getFacetDisplayName(fileFacetName: string): string {

        const displayName = FileFacetNameDisplay[fileFacetName];
        return displayName ? displayName : this.camelToSpacePipe.transform(fileFacetName);
    }

    /**
     * Build the set of facet groups.
     * 
     * @param {FacetGroupDisplayConfig} facetGroupDisplayConfigs
     * @returns {FacetGroup[]}
     */
    private buildFacetGroups(facetGroupDisplayConfigs: FacetGroupDisplayConfig[]): FacetGroup[] {

        return facetGroupDisplayConfigs.reduce((accum, facetGroupConfig: FacetGroupDisplayConfig) => {

            const facets = facetGroupConfig.facets;
            if ( facets.length ) {
                accum.push({
                    facetGroupName: facetGroupConfig.facetGroupName,
                    facetNames: facets.map(facetConfig => facetConfig.facetName)
                });
            }

            return accum;
        }, []);
    }
}

