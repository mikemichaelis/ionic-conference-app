/**
 * Document the purpose of the SystemEnum events
 *
 * OUTBOUND
 *
 *      USER: - state.user has been retrieved
 *
 *      RESET - Tells components to reset to a default state (ie after LOGOUT, USER, CLEAR, ERROR)
 *
 * INBOUND
 *      EXPORT - Components user this event to cause the UoW to be persisted locally - should happen after every data operation
 *              TODO - add debounce to improve performance to EXPORT
 *
 *      CLEAR - Remove users local data from device
 *
 *      ERROR - Global error handler used by components to toast to user if in debug and reset UoW to a valid state so app can continue working
 */
export enum SystemEnum {
    USER,
    RESET,
    EXPORT,
    CLEAR,
    ERROR,
    NETWORK,
    AUTHENTICATED,
    ONLINE
}