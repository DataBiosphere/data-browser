/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA-specific site config service.
 */

// Core dependencies
import { Injectable, Type } from "@angular/core";

// App dependencies
import { HCAFooterComponent } from "./hca-footer/hca-footer.component";
import { HCAToolbarComponent } from "./hca-toolbar/hca-toolbar.component";
import { FooterComponent } from "../site-config/footer.component";
import { HeaderComponent } from "../site-config/header.component";
import { SiteConfigService } from "../site-config/site-config.service";

@Injectable()
export class HCASiteConfigService implements SiteConfigService {

    /**
     * Return the footer for the site.
     */
    public getFooter(): Type<FooterComponent> {

        return HCAFooterComponent;
    }

    /**
     * Returns true - support requests are enabled for this site.
     */
    public isSupportRequestEnabled(): boolean {

        return true;
    }
    
    /**
     * Return the header for the site.
     */
    public getHeader(): Type<HeaderComponent> {

        return HCAToolbarComponent;
    }

}
