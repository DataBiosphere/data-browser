/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when a change in the user's authenticated state has occurred and any cached entities should be
 * cleared.
 */

export class ClearEntitiesAction {
    public static ACTION_TYPE = "ENTITY.CLEAR_ENTITIES";
    public readonly type = ClearEntitiesAction.ACTION_TYPE;
}
