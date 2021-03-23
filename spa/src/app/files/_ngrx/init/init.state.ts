/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of app init state. There is currently no init-related state set in the store.
 */

// Default init
const DEFAULT_INIT = {
};

export class InitState {

    constructor(init = DEFAULT_INIT) {

        Object.assign(this, init);
    }

    /**
     * @returns {InitState}
     */
    public static getDefaultState(): InitState {

        return new InitState();
    }
}
