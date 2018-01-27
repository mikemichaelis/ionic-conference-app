/**
 * None - Authentication is not valid
 *
 * LoggedIn - User has successfully authenticated
 *
 * Refreshed - Refresh token used to automate successful authentication
 *
 * LoggedOut - Authentication has been revoked (may be caused manually by user or back end revocation of token)
 */
export enum authenticatedEnum {
    NONE,
    LOGGED_IN,
    REFRESHED,
    LOGGED_OUT
}