/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service handling updating HTML document title.
 */

// Core dependencies
import { Injectable } from "@angular/core";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { Title } from "@angular/platform-browser";

@Injectable()
export class TitleService {

    /**
     * @param {ConfigService} configService
     * @param {Title} titleService
     */
    constructor(private configService: ConfigService, private titleService: Title) {}

    /**
     * Returns true if the specified path, ignoring query string parameters, is the current path.
     * 
     * @param {string} title
     */
    public setTitle(title: string): void {

        const siteTitle = this.configService.getTitle();
        this.titleService.setTitle(`${title} | ${siteTitle}`);
    }
}

