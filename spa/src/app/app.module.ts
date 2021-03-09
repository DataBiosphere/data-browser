/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Code app module definition - imports shared and config modules as well as all app specific modules that must either
 * be eager-loaded or contain app-wide singleton services.
 */

// Core dependencies
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router, RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { DeviceDetectorModule } from "ngx-device-detector";
import { EffectsModule } from "@ngrx/effects";
import { Store, StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

// App Dependencies
import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routes";
import { ConfigModule } from "./config/config.module";
import { ConfigService } from "./config/config.service";
import { environment } from "../environments/environment";
import { AtlasName } from "./files/atlas/atlas-name.model";
import { CatalogService } from "./files/catalog/catalog.service";
import { FilesModule } from "./files/files.module";
import { ReleaseBannerComponent } from "./files/releases/release-banner/release-banner.component";
import { HCAEncodeHttpParamsInterceptor } from "./http/hca-encode-http-params.interceptor";
import { HCAHttpResponseErrorInterceptor } from "./http/hca-http-response-error.interceptor";
import { AppEffects } from "./_ngrx/app.effects";
import { AppReducers } from "./_ngrx/app.reducer";
import { SharedModule } from "./shared/shared.module";
import { DataPolicyFooterComponent } from "./site/data-policy-footer/data-policy-footer.component";
import { DesktopFooterComponent } from "./site/desktop-footer/desktop-footer.component";
import { HamburgerDirective } from "./site/hamburger/hamburger.directive";
import { HCAFooterComponent } from "./site/hca/hca-footer/hca-footer.component";
import { HCASiteConfigService } from "./site/hca/hca-site-config.service";
import { HCAToolbarComponent } from "./site/hca/hca-toolbar/hca-toolbar.component";
import { LungMAPFooterComponent } from "./site/lungmap/lungmap-footer/lungmap-footer.component";
import { LungMAPSiteConfigService } from "./site/lungmap/lungmap-site-config.service";
import { LungMAPToolbarComponent } from "./site/lungmap/lungmap-toolbar/lungmap-toolbar.component";
import { SITE_CONFIG_SERVICE } from "./site/site-config/site-config.token";
import { ViewContainerDirective } from "./site/site-config/view-conatainer.directive";
import { StickyFooterComponent } from "./site/sticky-footer/sticky-footer.component";
import { LocalStorageService } from "./storage/local-storage.service";
import { SupportRequestModule } from "./support-request/support-request.module";
import { ErrorComponent } from "./system/error/error.component";
import { NotFoundComponent } from "./system/not-found/not-found.component";
import { SystemService } from "./system/shared/system.service";
import { SystemService20 } from "./system/shared/system.2.0.service";

// True if current environment is running v2.0 code.
const v2 = environment.version === "2.0";

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        // ANGULAR SETUP
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(AppRoutes),
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,

        // NGRX SETUP
        StoreModule.forRoot(AppReducers),
        EffectsModule.forRoot(AppEffects),
        StoreDevtoolsModule.instrument({
            maxAge: 25 //  Retains last 25 states
        }),

        // CHILD MODULES SETUP
        SharedModule,
        ConfigModule,
        FilesModule,
        SupportRequestModule,

        DeviceDetectorModule.forRoot()
    ],
    declarations: [

        AppComponent,

        // HTTP components
        ErrorComponent,
        NotFoundComponent,

        // Site components
        DataPolicyFooterComponent,
        DesktopFooterComponent,
        HamburgerDirective,
        HCAFooterComponent,
        HCAToolbarComponent,
        LungMAPFooterComponent,
        LungMAPToolbarComponent,
        ReleaseBannerComponent,
        StickyFooterComponent,
        ViewContainerDirective
    ],
    providers: [
        // Init config and catalog states; both must resolve before app can be initialized.
        {
            provide: APP_INITIALIZER,
            useFactory: (catalogService: CatalogService, configService: ConfigService) => {
                return () => {
                    return configService.initConfig().then(() => catalogService.initCatalogs());
                };
            },
            deps: [CatalogService, ConfigService, Store],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HCAEncodeHttpParamsInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HCAHttpResponseErrorInterceptor,
            deps: [ConfigService, Router, Store],
            multi: true
        },
        LocalStorageService,
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
        {
            provide: "SYSTEM_SERVICE",
            useClass: v2 ? SystemService20 : SystemService
        }
    ]
})
export class AppModule {
}

