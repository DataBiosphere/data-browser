import { Component, OnInit } from "@angular/core";
import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import "rxjs/add/observable/of";
import { AppState } from "../../_ngrx/app.state";
import { FetchPagedOrSortedTableDataRequestAction } from "../_ngrx/table/table.actions";
import { selectPagination, selectTableData } from "../_ngrx/file.selectors";
import { PaginationModel } from "./pagination.model";

@Component({
    selector: "bw-table",
    templateUrl: "./table.component.html",
    styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnInit {

    displayedColumns = ["program", "project", "donor_id", "submitter", "specimen_type", "sample", "workflow", "filename", "file_id", "size"];
    tableElementDataSource: TableElementDataSource;
    pagination$: Observable<PaginationModel>;

    // Privates
    private store: Store<AppState>;

    /**
     * @param store {Store<AppState>}
     */
    constructor(store: Store<AppState>) {
        this.store = store;
    }


    ngOnInit() {

        // Initialize the new data source with an observable of the table data.
        this.tableElementDataSource = new TableElementDataSource(this.store.select(selectTableData));

        // Get an observable of the pagination model
        this.pagination$ = this.store.select(selectPagination);

    }


    /**
     * Called when table next page selected
     *
     * @param {PaginationModel} pm
     */
    public nextPageSelected(pm: PaginationModel) {

        if (!this.hasNext(pm)) {
            return;
        }

        let tableParamsModel = {
            from: pm.from + pm.size,
            size: pm.size,
            sort: pm.sort,
            order: pm.order
        };

        this.store.dispatch(new FetchPagedOrSortedTableDataRequestAction(tableParamsModel));
        console.log("next");
    }

    /**
     * Called when table previous page selected.
     */
    public previousPageSelected(pm: PaginationModel) {


        if (!this.hasPrevious(pm)) {
            return;
        }

        let tableParamsModel = {
            from: pm.from - pm.size,
            size: pm.size,
            sort: pm.sort,
            order: pm.order
        };

        this.store.dispatch(new FetchPagedOrSortedTableDataRequestAction(tableParamsModel));
        console.log("previous");
    }

    /**
     * Call to go directly to a page by page number.
     *
     * @param {PaginationModel} pm
     * @param {number} pageNumber
     */
    public goToPage(pm: PaginationModel, pageNumber: number) {

        let from = (pm.size * pageNumber) + 1;

        let tableParamsModel = {
            from: from,
            size: pm.size,
            sort: pm.sort,
            order: pm.order
        };

        this.store.dispatch(new FetchPagedOrSortedTableDataRequestAction(tableParamsModel));

        console.log("set page to:" + pageNumber);
    }

    /**
     * Sort the table given the sort param and the order.
     *
     * @param {PaginationModel} pm
     * @param {string} sort
     * @param {string} order
     */
    public sortTable(pm: PaginationModel, sort: string, order: string) {

        let tableParamsModel = {
            from: 1,
            size: pm.size,
            sort: sort,
            order: order
        };

        this.store.dispatch(new FetchPagedOrSortedTableDataRequestAction(tableParamsModel));
    }

    public hasNext(pm: PaginationModel): boolean {
        return (pm.from + pm.count) < pm.total;
    }

    public hasPrevious(pm: PaginationModel): boolean {
        return (pm.from > 1);
    }


    /**
     * Return the index of the last row in the table (starting from 1)
     * @param {PaginationModel} pm
     * @returns {number}
     */
    getToIndex(pm: PaginationModel): number {
        let to: number = pm.from + (pm.size - 1);
        if (to <= pm.total) {
            return to;
        }
        else {
            return pm.total;
        }
    }

    /**
     * Return the current page number
     *
     * @param {PaginationModel} pm
     * @returns {number}
     */
    getCurrentPage(pm: PaginationModel): number {
        return Math.floor(pm.from / pm.size) + 1;
    }

    /**
     * Return the total number of pages.
     *
     * @param {PaginationModel} pm
     * @returns {number}
     */
    getPageCount(pm: PaginationModel) {
        return Math.ceil(pm.total / pm.size);
    }

    getPages(pm: PaginationModel): number[] {

        let pages = [];
        let pageCount = this.getPageCount(pm);

        for (let i = 1; i <= pageCount; i++) {
            pages.push(i);
        }

        return pages;
    }

}

export interface Element {
    program: string;
    project: string;
    donor_id: string;
    submitter: string;
    specimen_type: string;
    sample: string;
    workflow: string;
    filename: string;
    file_id: string;
    size: number;
}

class TableElementDataSource extends DataSource<any> {

    element$: Observable<Element[]>;

    constructor(tableData$: Observable<any[]>) {

        super();

        this.element$ = tableData$.map((rows: any[]) => {

            return rows.map((row: any) => {

                return {
                    program: row.program,
                    project: row.donors[0].projectCode,
                    donor_id: row.donors[0].donorId,
                    submitter: "-",
                    specimen_type: row.donors[0].specimenType,
                    sample: "-",
                    workflow: "-",
                    filename: row.fileCopies[0].fileName,
                    file_id: "-",
                    size: row.fileCopies[0].fileSize
                };
            });
        });
    }

    connect(): Observable<Element[]> {
        return this.element$;
    }

    disconnect() {
    }
}

//
// "hits": [
//     {
//         "access": "public",
//         "analysisMethod": {
//             "analysisType": "sequence_upload",
//             "software": "spinnaker"
//         },
//         "center_name": "UCSC",
//         "dataCategorization": {
//             "dataType": "fastq.gz",
//             "experimentalStrategy": "RNA-Seq"
//         },
//         "donors": [
//             {
//                 "donorId": "9ee8d3f4-93ab-57bc-8a91-d8f77da2fc8b",
//                 "otherIdentifiers": {
//                     "RedwoodDonorUUID": [
//                         "9ee8d3f4-93ab-57bc-8a91-d8f77da2fc8b"
//                     ]
//                 },
//                 "primarySite": "prostate gland",
//                 "projectCode": "CAR",
//                 "sampleId": [
//                     "7140f9f2-d506-5146-8707-f1a05721e6cd"
//                 ],
//                 "specimenType": [
//                     "Normal - blood derived"
//                 ],
//                 "study": "CAR",
//                 "submittedDonorId": "A123472",
//                 "submittedSampleId": [
//                     "S123472a1"
//                 ],
//                 "submittedSpecimenId": [
//                     "A123472a"
//                 ]
//             }
//         ],
//         "fileCopies": [
//             {
//                 "fileFormat": "fastq.gz",
//                 "fileMd5sum": "",
//                 "fileName": "TEST_R1.fastq.gz",
//                 "fileSize": 231476,
//                 "lastModified": "2017-06-20T20:45:57",
//                 "repoBaseUrl": "carlos.ucsc-cgp-dev.org",
//                 "repoCode": "Redwood-AWS-Oregon",
//                 "repoCountry": "US",
//                 "repoDataBundleId": "5b04f580-2d6a-59b7-b966-b08c6b2a03ef",
//                 "repoDataPath": null,
//                 "repoDataSetIds": [],
//                 "repoMetadataPath": null,
//                 "repoName": "Redwood-AWS-Oregon",
//                 "repoOrg": "UCSC",
//                 "repoType": "Redwood"
//             }
//         ],
//         "id": "fd23d912-23f9-5bc4-8faf-fcf2956ae8e0",
//         "objectID": "fd23d912-23f9-5bc4-8faf-fcf2956ae8e0",
//         "program": "TCELL",
//         "referenceGenome": {
//             "downloadUrl": null,
//             "genomeBuild": null,
//             "referenceName": null
//         },
//         "study": [
//             "CAR"
//         ]
//     }
// ],
//     "pagination": {
//     "count": 1,
//         "from": 1,
//         "order": "desc",
//         "page": 1,
//         "pages": 6,
//         "size": 1,
//         "sort": "center_name",
//         "total": 6
// },
