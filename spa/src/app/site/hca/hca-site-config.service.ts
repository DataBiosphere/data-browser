/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA-specific site config service.
 */

// Core dependencies
import { Injectable, Type } from "@angular/core";

// App dependencies
import { HCADataReleasePolicyLinkComponent } from "./hca-data-release-policy-link/hca-data-release-policy-link.component";
import { HCADataUseNotificationComponent } from "./hca-data-use-notification/hca-data-use-notification.component";
import { HCAFooterComponent } from "./hca-footer/hca-footer.component";
import { HCAToolbarComponent } from "./hca-toolbar/hca-toolbar.component";
import { DataReleasePolicyLinkComponent } from "../site-config/data-release-policy-link.component";
import { DataUseNotificationComponent } from "../site-config/data-use-notification.component";
import { FooterComponent } from "../site-config/footer.component";
import { HeaderComponent } from "../site-config/header.component";
import { SiteConfigService } from "../site-config/site-config.service";

@Injectable()
export class HCASiteConfigService implements SiteConfigService {
    /**
     * Return the data release policy link component.
     */
    public getDataReleasePolicyLinkComponent(): Type<DataReleasePolicyLinkComponent> {
        return HCADataReleasePolicyLinkComponent;
    }

    /**
     * Return the data use notification component.
     */
    getDataUseNotificationComponent(): Type<DataUseNotificationComponent> {
        return HCADataUseNotificationComponent;
    }

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
