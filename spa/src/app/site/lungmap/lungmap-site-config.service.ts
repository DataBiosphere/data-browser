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
import { LungMAPDataReleasePolicyLinkComponent } from "./lungmap-data-release-policy-link/lungmap-data-release-policy-link.component";
import { LungMAPDataUseNotificationComponent } from "./lungmap-data-use-notification/lungmap-data-use-notification.component";
import { FooterComponent } from "../site-config/footer.component";
import { HeaderComponent } from "../site-config/header.component";
import { DataReleasePolicyLinkComponent } from "../site-config/data-release-policy-link.component";
import { SiteConfigService } from "../site-config/site-config.service";
import { DataUseNotificationComponent } from "../site-config/data-use-notification.component";

@Injectable()
export class LungMAPSiteConfigService implements SiteConfigService {

    /**
     * Return the data release policy component.
     */
    public getDataReleasePolicyLinkComponent(): Type<DataReleasePolicyLinkComponent> {

        return LungMAPDataReleasePolicyLinkComponent;
    }

    /**
     * Return the data use notification component.
     */
    getDataUseNotificationComponent(): Type<DataUseNotificationComponent> {

        return LungMAPDataUseNotificationComponent;
    }

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
