/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of config required for setting up this instance of Boardwalk.
 */

export class Config {

    public readonly dataURL: string;
    public readonly matrixURL: string;
    public readonly portalURL: string;
    public readonly projectMetaURL: string;

    /**
     * @param {string} dataURL
     * @param {string} matrixURL
     * @param {string} portalURL
     * @param {string} projectMetaURL
     */
    constructor(dataURL: string, matrixURL: string, portalURL: string, projectMetaURL: string) {

        this.dataURL = dataURL;
        this.matrixURL = matrixURL;
        this.portalURL = portalURL;
        this.projectMetaURL = projectMetaURL;
    }
}
