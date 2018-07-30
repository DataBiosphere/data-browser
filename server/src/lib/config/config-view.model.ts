/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * View model containing environment-specific config that is required for setting up Boardwalk instance.
 */

export class ConfigViewModel {
    dataURL: string; // Root data URL, set as environment variable
    portalURL: string; // Data Portal URL set as environment variable
}
