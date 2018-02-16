/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of config required for setting up this instance of Boardwalk.
 */

export class Config {

    public readonly dataURL: string;

    /**
     * @param dataURL {string}
     */
    constructor(dataURL: string) {

        this.dataURL = dataURL;
    }
}
