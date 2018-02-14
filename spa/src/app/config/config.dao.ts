/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Data Access Object for hitting config-related API end points.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

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
     * is hosted locally (as opposed to being hosted at the data server).
     *
     * @returns {Observable<Config>}
     */
    fetchConfig(): Observable<Config> {
        
        return this.get("/config");
    }
}
