/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Modal-related state.
 */

export class ModalState {
    public readonly open: boolean;

    /**
     * @param {boolean} opened
     */
    constructor(open: boolean) {
        this.open = open;
    }

    /**
     * Create default modal state, where modal is not currently open.
     *
     * @returns {ModalState}
     */
    public static getDefaultState() {
        return new ModalState(false);
    }

    /**
     * Handle close of modal.
     *
     * @returns {ModalState}
     */
    public closeModal(): ModalState {
        return new ModalState(false);
    }

    /**
     * Handle open of modal.
     *
     * @returns {ModalState}
     */
    public openModal(): ModalState {
        return new ModalState(true);
    }
}
