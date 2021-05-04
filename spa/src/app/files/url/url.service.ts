/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service responsible for handling browser location-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

// App dependencies
import { EntityName } from "../shared/entity-name.model";
import { RoutingService } from "../../shared/routing/routing.service";

@Injectable()
export class UrlService {

    /**
     * @param {RoutingService} routingService
     * @param {Router} router
     */
    constructor(private routingService: RoutingService, private router: Router) {}

    /**
     * Returns true if user is currently viewing one of /projects, /files or /samples.
     * 
     * @returns {boolean}
     */
    public isViewingEntities(): boolean {

        return this.isViewingFiles() ||
            this.isViewingProjects() ||
            this.isViewingSamples();
    }

    /**
     * Returns true if user is currently viewing /files.
     *
     * @returns {boolean}
     */
    public isViewingFiles(): boolean {

        const path = this.router.url.split("?")[0];
        return path === `/${EntityName.FILES}`;
    }

    /**
     * Returns true if user is currently viewing /projects.
     * 
     * @returns {boolean}
     */
    public isViewingProjects(): boolean {

        const path = this.router.url.split("?")[0];
        return path === `/${EntityName.PROJECTS}`;
    }


    /**
     * Returns true if user is currently viewing /samples.
     *
     * @returns {boolean}
     */
    public isViewingSamples(): boolean {

        const path = this.router.url.split("?")[0];
        return path === `/${EntityName.SAMPLES}`;
    }

    /**
     * Returns true if user is currently viewing /export
     */
    public isViewingGetData(): boolean {

        return this.routingService.isPathActive(["/export"]);
    }
}

