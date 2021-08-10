/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing Terra-related auth functionality.
 */

// App dependencies

// App dependencies
import { TerraAuthInitAction } from "./terra-auth-init.action";
import { FetchTerraRegistrationSuccessAction } from "./fetch-terra-registration-success.action";

export class TerraAuthState {

    /**
     * @param {boolean} init
     * @param {boolean} registered
     */
    constructor(public readonly init: boolean, 
                public readonly registered: boolean) {}

    /**
     * Update state to indicate auth initialization has been completed.
     *
     * @param {TerraAuthInitAction} authInitAction
     */
    public onInit(authInitAction: TerraAuthInitAction) {

        return new TerraAuthState(true, this.registered);
    }

    /**
     * Update state to indicate user's registration status with Terra.
     */
    public onTerraRegistrationStatusSuccess(successAction: FetchTerraRegistrationSuccessAction) {
        
        return new TerraAuthState(this.init, successAction.registered);
    }

    /**
     * Create default support request state.
     *
     * @returns {SupportRequestState}
     */
    public static getDefaultState(): TerraAuthState {

        return new TerraAuthState(false, false);
    }
}
