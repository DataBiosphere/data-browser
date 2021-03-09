/**
 * LungMAP
 * https://www.humancellatlas.org/
 *
 * LungMAP-specific site config service.
 */

// Core dependencies
import { Injectable, Type } from "@angular/core";

// App dependencies
import { LungMAPFooterComponent } from "./lungmap-footer/lungmap-footer.component";
import { LungMAPToolbarComponent } from "./lungmap-toolbar/lungmap-toolbar.component";
import { FooterComponent } from "../site-config/footer.component";
import { HeaderComponent } from "../site-config/header.component";
import { SiteConfigService } from "../site-config/site-config.service";

@Injectable()
export class LungMAPSiteConfigService implements SiteConfigService {

    /**
     * Return the footer for the site.
     */
    public getFooter(): Type<FooterComponent> {

        return LungMAPFooterComponent;
    }

    /**
     * Returns false - support requests are not enabled for this site.
     */
    public isSupportRequestEnabled(): boolean {

        return false;
    }
    
    /**
     * Return the header for the site.
     */
    public getHeader(): Type<HeaderComponent> {

        return LungMAPToolbarComponent;
    }

}
