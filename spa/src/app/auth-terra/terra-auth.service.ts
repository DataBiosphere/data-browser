/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating Terra auth functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, filter, map, take, tap } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../config/config.service";
import { EntityAPIResponse } from "../files/http/entity-api-response.model";
import { TerraAuthState } from "./_ngrx/terra-auth.state";
import { TerraRegistrationStatusHttpResponse } from "./terra-registration-status-http-response";
import { FetchTerraRegistrationSuccessAction } from "./_ngrx/fetch-terra-registration-success.action";
import { TerraAuthInitAction } from "./_ngrx/terra-auth-init.action";
import { selectTerraAuthInit } from "./_ngrx/terra-auth.selectors";

@Injectable()
export class TerraAuthService {

    public static PATH_REGISTRATION_STATUS = "/register/user/v1"; 

    /**
     * @param {ConfigService} configService
     * @param {Store<AppState>} store
     * @param {HttpClient} httpClient
     */
    constructor(private configService: ConfigService,
                private store: Store<TerraAuthState>,
                private httpClient: HttpClient) {}

    /**
     * Check if authenticated user is registered with Terra . Must return promise here as this method is called during
     * Angular's app initialization and we need to resolve the auth details before any components are instantiated, or
     * API endpoints are hit.
     * 
     * Currently dev only.
     */
    public init(): Promise<void> {

        this.getRegistrationStatus();

        // Wait for Terra registration check to be completed before allowing app init to continue (as we block access
        // to app if user is authenticated but not registered with Terra).
        return new Promise((resolve) => {

            this.store.pipe(
                select(selectTerraAuthInit),
                filter((init) => init),
                take(1),
            ).subscribe(() => {
                resolve();
            });
        });
    }

    /**
     * Hit Terra's registration endpoint to determine if user is registered with Terra. Dispatch action with registered
     * status on response from Terra. Return registered status.
     */
    public getRegistrationStatus(): BehaviorSubject<boolean> {
        
        const subject$ = new BehaviorSubject(false);

        const originTerra = this.configService.getTerraUrl();
        this.httpClient
            .get<EntityAPIResponse>(`${originTerra}${TerraAuthService.PATH_REGISTRATION_STATUS}`)
            .pipe(
                // Map errors to empty object
                catchError(() => of({})),
                map((response: TerraRegistrationStatusHttpResponse) => {
                    return !!response.enabled;
                })
            ).subscribe(registered => {
                this.store.dispatch(new FetchTerraRegistrationSuccessAction(registered));
                this.store.dispatch(new TerraAuthInitAction());
                subject$.next(registered);
            });
        
        return subject$;
    }
}
