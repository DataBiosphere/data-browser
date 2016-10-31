/**
 * Models HTTP error 409 - conflict.
 */

export class ConflictError {

    private response: any;

    /**
     * TODO revisit response
     */
    constructor(response: any) {

        this.response = response;
    }

    /**
     * Return response.
     *
     * @returns {any}
     */
     getResponse(): any {

        return this.response;
     }
}
