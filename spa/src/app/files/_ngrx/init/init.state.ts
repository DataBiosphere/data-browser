/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of app init state.
 */

// Default init
const DEFAULT_INIT = {
    defaultFilterInit: false
};

export class InitState {

    defaultFilterInit: boolean;

    constructor(init = DEFAULT_INIT) {

        Object.assign(this, init);
    }

    /**
     * @returns {InitState}
     */
    public setDefaultFilterInit(): InitState {
        return new InitState({
            defaultFilterInit: true
        });
    }

    /**
     * @returns {InitState}
     */
    public static getDefaultState(): InitState {
        return new InitState();
    }
}
