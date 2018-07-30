/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Data Access Object for hitting config-related API end points.
 */
// Core dependencies
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
// App dependencies
import { CCBaseDAO } from "../cc-http/shared/cc-base.dao";
import { Config } from "./config.model";


@Injectable()
export class ConfigDAO extends CCBaseDAO {

    /**
     * @param {Http} http
     */
    constructor(http: Http) {
        super(http);
    }

    /**
     * Hit API end point to retrieve configuration information for this Boardwalk instance. The core config information
     * is hosted locally (as opposed to being hosted at the data server). This end point is hit during app
     * initialization, before components are rendered. See providers definition in app.module. Must return promise here
     * so Angular knows to continue with component setup once config has been resolved.
     *
     * @returns {Promise<Config>}
     */
    public fetchConfig(): Promise<Config> {

        return this.http.get("/api/config")
            .map(res => {
                return Object.assign(new Config("", ""), res.json()); // Convert JSON to Config instance
            })
            .toPromise();
    }
}
