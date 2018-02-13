/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Client-side configuration file.
 */

// Core dependencies
import { Injectable } from "@angular/core";

// App dependencies
import { FileFacetMetadata } from "../files/file-facet-metadata/file-facet-metadata.model";

export type ApiSource = "UCSC_STAGE" | "UCSC" | "ICGC" | "UCSC_HCA";

@Injectable()
export class ConfigService {

    private source: ApiSource = "UCSC_STAGE";

    /**
     * @returns {ApiSource}
     */
    getSource(): ApiSource {
        return this.source;
    }

    /**
     * @param {ApiSource} source
     */
    setSource(source: ApiSource) {
        this.source = source;
    }

    getRootUrl(): string {

        switch (this.source) {
            case "UCSC_HCA":
                return "https://dss-aws-staging.ucsc-cgp-dev.org";
            case "UCSC_STAGE":
                return "https://carlos.ucsc-cgp-dev.org";
            case "UCSC":
                return "https://ucsc-cgp.org";
            default: // "ICGC"
                return "https://dcc.icgc.org";
        }
    }

    /**
     * @returns {string}
     */
    getApiUrl(): string {
        return this.getRootUrl() + "/api/v1";
    }

    /**
     * @returns {boolean}
     */
    hasSortOrder() {
        return false;
        //return this.source === "UCSC_STAGE" || this.source === "UCSC";
    }

    /**
     * @returns {FileFacetMetadata[]}
     */
    getTestSortFacets(): FileFacetMetadata[] {

        return <FileFacetMetadata[]>[
            {
                name: "fileId",
                category: "file"
            },
            {
                name: "donorId",
                category: "file"
            },
            {
                name: "centerName",
                category: "file"
            },
            {
                name: "program",
                category: "file"
            },
            {
                name: "projectCode",
                category: "file"
            },
            {
                name: "workFlow",
                category: "file"
            },
            {
                name: "analysisType",
                category: "file"
            },
            {
                name: "specimenType",
                category: "file"
            },
            {
                name: "fileFormat",
                category: "file"
            }
        ];
    }
}
