/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Interface exposing components of site configuration.
 */

// Core dependencies
import { Type } from "@angular/core";

// App dependencies
import { FooterComponent } from "./footer.component";
import { HeaderComponent } from "./header.component";

export interface SiteConfigService {

    getFooter(): Type<FooterComponent>;
    isSupportRequestEnabled(): boolean;
    getHeader(): Type<HeaderComponent>;
}
