/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of raw HTTP response from Terra registration status endpoint.
 */

export interface TerraRegistrationStatusHttpResponse {
    enabled: {
        allUsersGroup: boolean;
        google: boolean;
        ldap: boolean;
    };
    userInfo: {
        userEmail: string;
        userSubjectId: string;
    };
}
