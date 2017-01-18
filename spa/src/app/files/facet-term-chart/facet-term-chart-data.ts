// Core dependencies
import * as _ from "lodash";

// App dependencies
import { Term } from "../shared/term.model";

/**
 * Collection of data required for setting up single, horizontal, stacked bar chart, displaying term breakdown of a
 * given facet.
 */
export class FacetTermChartData {

    // Array of term names for the given facet, used as keys to stack data
    public keys: string[];

    // Term data, in format { facetName: facetName, termName0: termCount0, termName1: termCount1 }
    public data: any;

    // Total count across all terms
    public totalCount: number;

    // Color data, in format { termName0: color0, termName1: color1 }
    public colors: string[];

    /**
     * Generate chart config from file facet, calculate chart dimensions
     *
     * @param facetName {string}
     * @param terms {Term[]}
     * @param totalCount {number}
     */
    constructor(facetName: string, terms: Term[], totalCount: number) {

        // Grab term names, required for generating stacks
        this.keys = _.map(terms, "name") as string[];

        // Grab colors for the current set of terms
        this.colors = _.map(terms, "color") as string[];

        // Create data in format { facetName: facetName, termName0: termCount0, termName1: termCount1 }, require
        // access for facet name during rendering of chart (to group stacks)
        this.data = _.reduce(terms, (result, term: Term) => {
            result[term.name] = term.count;
            return result;
        }, {
            facetName: facetName
        });

        // Grab total
        this.totalCount = totalCount;
    }
}