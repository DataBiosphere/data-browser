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

    /**
     * @param {string} dataURL
     * @param {string} matrixURL
     * @param {string} portalURL
     */
    constructor(dataURL: string, matrixURL: string, portalURL: string) {

        this.dataURL = dataURL;
        this.matrixURL = matrixURL;
        this.portalURL = portalURL;
    }
}
