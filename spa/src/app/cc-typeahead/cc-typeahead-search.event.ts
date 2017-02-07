/**
 * Event emitted when valid search term has been entered into typeahead input.
 */
export class CCTypeaheadSearchEvent {

    public readonly searchTerm: string;

    /**
     * @param searchTerm {string}
     */
    constructor(searchTerm: string) {

        this.searchTerm = searchTerm;
    }
}
