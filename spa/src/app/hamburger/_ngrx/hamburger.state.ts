/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Hamburger-related state.
 */

export class HamburgerState {

    public readonly open: boolean;

    /**
     * @param {boolean} open
     */
    constructor(open: boolean) {

        this.open = open;
    }

    /**
     * Handle close of hamburger.
     *
     * @returns {HamburgerState}
     */
    public closeHamburger(): HamburgerState {

        return new HamburgerState(false);
    }

    /**
     * Create default modal state, where modal is not currently open.
     *
     * @returns {HamburgerState}
     */
    public static getDefaultState() {

        return new HamburgerState(false);
    }

    /**
     * Handle toggle of hamburger.
     *
     * @returns {HamburgerState}
     */
    public toggleHamburger(): HamburgerState {

        return new HamburgerState(!this.open);
    }
}
