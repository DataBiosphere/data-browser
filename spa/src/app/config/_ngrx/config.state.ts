/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * State containing information (config) required for setting up this instance of Boardwalk.
 */
// App dependencies
import { Config } from "../config.model";
import { FetchConfigRequestSuccessAction } from "./config.actions";

export class ConfigState {

    // Public members
    public readonly config: Config;

    /**
     * @param {Config} config
     */
    constructor(config: Config) {

        this.config = config;
    }

    /**
     * Create default config state - set default data URL.
     *
     * @returns {ConfigState}
     */
    public static getDefaultState() {

        return new ConfigState(new Config("", ""));
    }

    /**
     * Handle updated config that has been returned from the server end point.
     *
     * @param {FetchConfigRequestSuccessAction} action
     * @returns {ConfigState}
     */
    public receiveConfig(action: FetchConfigRequestSuccessAction): ConfigState {

        return new ConfigState(action.config);
    }
}
