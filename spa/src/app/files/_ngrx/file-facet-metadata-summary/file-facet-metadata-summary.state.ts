import {
    FetchFileFacetMetadataSummarySuccessAction
} from "./file-facet-metadata-summary.actions";
import { FileFacetMetadata } from "../../file-facet-metadata/file-facet-metadata.model";

/**
 * File Facet Metadata Summary
 */
export class FileFacetMetadataSummaryState {

    facetMetadata: FileFacetMetadata[];
    facetMetadataByFacetName: Map<string, FileFacetMetadata>;
    sortOrder: string[];
    exists: boolean;

    constructor(facetMetadata: FileFacetMetadata[] = []) {

        this.facetMetadata = facetMetadata;
        this.exists = facetMetadata.length && facetMetadata.length > 0;

        const facetMetadataByFacetName = new Map<string, FileFacetMetadata>();
        const sortOrder = [];

        this.facetMetadata.forEach((metadatum: FileFacetMetadata) => {
            facetMetadataByFacetName.set(metadatum.name, metadatum);
            sortOrder.push(metadatum.name);
        });
        this.facetMetadataByFacetName = facetMetadataByFacetName;
        this.sortOrder = sortOrder;
    }

    /**
     * Request Metadata Summary
     *
     * @returns {FileFacetMetadataSummaryState}
     */
    requestMetadataSummary() {
        return this;
    }

    /**
     * Receive Metadata Summary
     *
     * @param {FetchFileFacetMetadataSummarySuccessAction} action
     * @returns {FileFacetMetadataSummaryState}
     */
    receiveMetadataSummary(action: FetchFileFacetMetadataSummarySuccessAction) {
        return new FileFacetMetadataSummaryState(action.fileFacetMetadataSummary);
    }

    /**
     * Get Default State
     *
     * @returns {FileFacetMetadataSummaryState}
     */
    static getDefaultState() {
        return new FileFacetMetadataSummaryState();
    }
}
