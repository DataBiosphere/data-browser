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
import { EffectsModule } from "@ngrx/effects";
import { Store, StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

// App Dependencies
import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routes";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { HttpAuthInterceptor } from "./auth/http-auth.interceptor";
import { TerraAuthModule } from "./auth-terra/terra-auth.module";
import { TerraAuthService } from "./auth-terra/terra-auth.service";
import { ConfigModule } from "./config/config.module";
import { ConfigService } from "./config/config.service";
import { FaviconService } from "./favicon/favicon.service";
import { FaviconModule } from "./favicon/favicon.module";
import { CatalogService } from "./files/catalog/catalog.service";
import { FilesModule } from "./files/files.module";
import { HCAEncodeHttpParamsInterceptor } from "./http/hca-encode-http-params.interceptor";
import { HCAHttpResponseErrorInterceptor } from "./http/hca-http-response-error.interceptor";
import { AppEffects } from "./_ngrx/app.effects";
import { AppReducers } from "./_ngrx/app.reducer";
import { SharedModule } from "./shared/shared.module";
import { SiteModule } from "./site/site.module";
import { LocalStorageModule } from "./storage/local-storage.module";
import { SupportRequestModule } from "./support-request/support-request.module";
import { ErrorComponent } from "./system/error/error.component";
import { ErrorLayoutComponent } from "./system/error-layout/error-layout.component";
import { NotFoundComponent } from "./system/not-found/not-found.component";
import { SystemService } from "./system/shared/system.service";

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        // ANGULAR SETUP
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(AppRoutes, { relativeLinkResolution: "legacy" }),

        // NGRX SETUP
        StoreModule.forRoot(AppReducers),
        EffectsModule.forRoot(AppEffects),
        StoreDevtoolsModule.instrument({
            maxAge: 25, //  Retains last 25 states
        }),

        // CHILD MODULES SETUP
        AuthModule,
        FaviconModule,
        ConfigModule,
        FilesModule,
        LocalStorageModule,
        SharedModule,
        SiteModule,
        SupportRequestModule,
        TerraAuthModule,
    ],
    declarations: [
        AppComponent,

        // HTTP components
        ErrorComponent,
        ErrorLayoutComponent,
        NotFoundComponent,
    ],
    providers: [
        // Init config, catalog and system status states; both must resolve before app can be initialized.
        {
            provide: APP_INITIALIZER,
            useFactory: (
                catalogService: CatalogService,
                configService: ConfigService,
                systemService: SystemService
            ) => {
                return () => {
                    // Init config
                    return (
                        configService
                            .initConfig()
                            // Init catalogs
                            .then(() => catalogService.initCatalogs())
                            // Init system status
                            .then(() => {
                                // If no catalog is specified in the query string, use the default catalog. Pull directly from URL
                                // as app init occurs before Angular route init.
                                const url = new URL(window.location.href);
                                const catalog =
                                    url.searchParams.get("catalog") ??
                                    configService.getDefaultCatalog();
                                return systemService
                                    .initSystemStatus(catalog)
                                    .then(() => Promise.resolve());
                            })
                    );
                };
            },
            deps: [CatalogService, ConfigService, SystemService, Store],
            multi: true,
        },
        // Init auth and Terra registration status; both must resolve before app can be loaded.
        {
            provide: APP_INITIALIZER,
            useFactory: (
                authService: AuthService,
                configService: ConfigService,
                terraAuthService: TerraAuthService
            ) => {
                return () => {
                    return authService.init().then((authenticated) =>
                        // If user is authenticated, check Terra registration status. If user is not authenticated,
                        // auth/registration init is complete.
                        authenticated
                            ? terraAuthService.init()
                            : Promise.resolve()
                    );
                };
            },
            deps: [AuthService, ConfigService, TerraAuthService, Store],
            multi: true,
        },
        // Init favicon.
        {
            provide: APP_INITIALIZER,
            useFactory: (
                configService: ConfigService,
                faviconService: FaviconService
            ) => {
                return () => {
                    const faviconPath = configService.getFaviconPath();
                    faviconService.setFaviconPaths(faviconPath);
                    return Promise.resolve();
                };
            },
            deps: [ConfigService, FaviconService],
            multi: true,
        },
        // Init catalog update - loads JSON to store.
        {
            provide: APP_INITIALIZER,
            useFactory: (catalogService: CatalogService) => {
                return () => {
                    return catalogService.initCatalogUpdate();
                };
            },
            deps: [CatalogService, Store],
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpAuthInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HCAEncodeHttpParamsInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HCAHttpResponseErrorInterceptor,
            deps: [ConfigService, Router, Store],
            multi: true,
        },
        SystemService,
    ],
})
export class AppModule {}
