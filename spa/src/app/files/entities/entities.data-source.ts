/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Data source backing the Angular Material tables that display entity data (projects, files or samples). Typed by
 * row mapper specified to the entity that is to be displayed.
 */

// Core dependencies
import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

// App dependencies
import { EntityRow } from "./entity-row.model";
import { EntityRowMapper } from "./entity-row-mapper";

export class EntitiesDataSource<
    T extends EntityRowMapper
> extends DataSource<any> {
    private readonly rows$: Observable<EntityRow[]>;

    /**
     * @param {Observable<any[]>} tableData$
     * @param {{new(row): T}} mapperType
     */
    constructor(tableData$: Observable<any[]>, mapperType: { new (row): T }) {
        super();

        this.rows$ = tableData$.pipe(
            map((rows: any[]) =>
                rows.map((row: any) => new mapperType(row).mapRow())
            )
        );
    }

    /**
     * Return observable of table data mapped into entity row objects.
     *
     * @returns {Observable<EntityRow[]>}
     */
    connect(): Observable<EntityRow[]> {
        return this.rows$;
    }

    /**
     * Clean up.
     */
    disconnect() {}
}
