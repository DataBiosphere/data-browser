/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Interface exposing components of site configuration.
 */

// Core dependencies
import { Type } from "@angular/core";

// App dependencies
import { DataReleasePolicyLinkComponent } from "./data-release-policy-link.component";
import { DataUseNotificationComponent } from "./data-use-notification.component";
import { FooterComponent } from "./footer.component";
import { HeaderComponent } from "./header.component";

export interface SiteConfigService {

    getDataUseNotificationComponent(): Type<DataUseNotificationComponent>
    getDataReleasePolicyLinkComponent(): Type<DataReleasePolicyLinkComponent>;
    getFooter(): Type<FooterComponent>;
    getHeader(): Type<HeaderComponent>;
    isSupportRequestEnabled(): boolean;
}
