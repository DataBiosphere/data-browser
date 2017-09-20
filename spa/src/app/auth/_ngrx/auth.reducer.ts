// import actions
import * as authActions from "./auth.actions";
import { AuthState } from "./auth.state";
import { SyncSessionRequestAction, SyncSessionSuccessAction } from "./auth.actions";

type Actions = authActions.All;

export function reducer(state = AuthState.getDefaultState(), action: Actions): AuthState {

    switch (action.type) {

        // case AuthenticationRequestedAction.ACTION_TYPE: {
        //     return state.requestAuthentication();
        // }
        //
        // case AuthenticationSuccessAction.ACTION_TYPE: {
        //     return state.receiveAuthenticationSuccess(action as AuthenticationSuccessAction);
        // }

        case SyncSessionRequestAction.ACTION_TYPE: {
            return state.syncSessionRequest();
        }

        case SyncSessionSuccessAction.ACTION_TYPE: {
            return state.syncSessionSuccess(action as SyncSessionSuccessAction);
        }

        // case SyncSessionFailureAction.ACTION_TYPE: {
        //     return state.syncSessionFailure(action as SyncSessionFailureAction);
        // }
        //
        // case LogoutAction.ACTION_TYPE: {
        //     return state.logout()
        // }
        default: {
            return state;
        }
    }
}
