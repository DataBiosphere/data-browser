/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of pagination values returned from entity API version 2.0.
 */

// App dependencies
import { Pagination } from "./pagination.model";

export interface Pagination20 extends Pagination {

    next: string;
    previous: string;
}
