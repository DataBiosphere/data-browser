/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Code app module definition - imports shared and config modules as well as all app specific modules that must either
 * be eager-loaded or contain app-wide singleton services.
 */

// Core dependencies
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";

// App Dependencies
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { DesktopFooterComponent } from "./desktop-footer/desktop-footer.component";
import { DataPolicyFooterComponent } from "./data-policy-footer/data-policy-footer.component";
import { DataReleasePolicyLinkComponent } from "./data-release-policy-link/data-release-policy-link.component";
import { DataUseNotificationComponent } from "./data-use-notification/data-use-notification.component";
import { AtlasName } from "../files/atlas/atlas-name.model";
import { HamburgerModule } from "../hamburger/hamburger.module";
import { HCAFooterComponent } from "./hca/hca-footer/hca-footer.component";
import { HCADataReleasePolicyLinkComponent } from "./hca/hca-data-release-policy-link/hca-data-release-policy-link.component";
import { HCADataUseNotificationComponent } from "./hca/hca-data-use-notification/hca-data-use-notification.component";
import { HCASiteConfigService } from "./hca/hca-site-config.service";
import { HCAToolbarComponent } from "./hca/hca-toolbar/hca-toolbar.component";
import { LungMAPDataReleasePolicyLinkComponent } from "./lungmap/lungmap-data-release-policy-link/lungmap-data-release-policy-link.component";
import { LungMAPDataUseNotificationComponent } from "./lungmap/lungmap-data-use-notification/lungmap-data-use-notification.component";
import { LungMAPFooterComponent } from "./lungmap/lungmap-footer/lungmap-footer.component";
import { LungMAPToolbarComponent } from "./lungmap/lungmap-toolbar/lungmap-toolbar.component";
import { LungMAPSiteConfigService } from "./lungmap/lungmap-site-config.service";
import { SharedModule } from "../shared/shared.module";
import { SITE_CONFIG_SERVICE } from "./site-config/site-config.token";
import { StickyFooterComponent } from "./sticky-footer/sticky-footer.component";
import { ViewContainerDirective } from "./site-config/view-conatainer.directive";

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,

        ConfigModule,
        HamburgerModule,
        SharedModule
    ],
    declarations: [
        DataPolicyFooterComponent,
        DataReleasePolicyLinkComponent,
        DataUseNotificationComponent,
        DesktopFooterComponent,
        HCADataReleasePolicyLinkComponent,
        HCADataUseNotificationComponent,
        HCAFooterComponent,
        HCAToolbarComponent,
        LungMAPDataReleasePolicyLinkComponent,
        LungMAPDataUseNotificationComponent,
        LungMAPFooterComponent,
        LungMAPToolbarComponent,
        StickyFooterComponent,
        ViewContainerDirective
    ],
    providers: [
        {
            provide: SITE_CONFIG_SERVICE,
            useFactory: (configService: ConfigService) => {
                const atlas = configService.getAtlas();
                if ( atlas === AtlasName.HCA ) {
                    return new HCASiteConfigService();
                }
                else if ( atlas === AtlasName.LUNGMAP ) {
                    return new LungMAPSiteConfigService();
                }
                else {
                    throw `SiteConfigService not configured for atlas: '${atlas}'`;
                }
            },
            deps: [ConfigService]
        },
    ],
    exports: [
        DataPolicyFooterComponent,
        DataReleasePolicyLinkComponent,
        DataUseNotificationComponent,
        DesktopFooterComponent,
        HCADataReleasePolicyLinkComponent,
        HCADataUseNotificationComponent,
        HCAFooterComponent,
        HCAToolbarComponent,
        LungMAPDataReleasePolicyLinkComponent,
        LungMAPDataUseNotificationComponent,
        LungMAPFooterComponent,
        LungMAPToolbarComponent,
        StickyFooterComponent,
        ViewContainerDirective
    ]
})
export class SiteModule {
}

