import { AuthenticationSuccessAction, SyncSessionSuccessAction } from "./auth.actions";
import { User } from "../../data/user/user.model";

export class AuthState {

    user: User;
    authenticated: boolean;


    constructor(user: any = {},
                authenticated = false) {

        this.user = user;
        this.authenticated = authenticated;
    }

    requestAuthentication() {
        return new AuthState({}, false);
    }

    receiveAuthenticationSuccess(action: AuthenticationSuccessAction) {
        return new AuthState(action.user, true);
    }

    syncSessionRequest() {
        return this;
    }

    syncSessionSuccess(action: SyncSessionSuccessAction) {
        return new AuthState(action.user, true);
    }

    public static getDefaultState() {
        return new AuthState();
    }
}