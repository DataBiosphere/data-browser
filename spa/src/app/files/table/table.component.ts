import { Component, OnInit } from "@angular/core";
import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import "rxjs/add/observable/of";
import { AppState } from "../../_ngrx/app.state";
import {
    TablePreviousPageAction,
    TableNextPageAction,
    TableOrderByAction,
    TableSetPageAction
} from "../_ngrx/table/table.actions";

@Component({
    selector: "bw-table",
    templateUrl: "./table.component.html",
    styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnInit {

    displayedColumns = ["program", "project", "donor_id", "submitter", "specimen_type", "sample", "workflow", "filename", "file_id", "size"];
    dataSource = new ExampleDataSource();

    // Privates
    private store: Store<AppState>;

    /**
     * @param store {Store<AppState>}
     */
    constructor(store: Store<AppState>) {
        this.store = store;
    }

    /**
     * Table next page selected.
     */
    public TableNextPageSelected() {
        this.store.dispatch(new TableNextPageAction());
        console.log("next");
    }

    public TablePreviousPageSelected() {
        this.store.dispatch(new TablePreviousPageAction());
        console.log("previous");
    }

    ngOnInit() {
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

const data: Element[] = [
    {
        program: "PROTECT_NBL",
        project: "TARGET",
        donor_id: "protect_01",
        submitter: "TARGET-30-PASFGG-T-D",
        specimen_type: "Primary tumour - solid tissue",
        sample: "TARGET-30-PASFGG-T-D",
        workflow: "spinnaker:1.0.0",
        filename: "5a00caf9-f202-4bcb-9fca-7d255ce171dc_1.fastq.gz",
        file_id: "07fc1bfd-650a-5c64-9e5e-2aef10c3a73f",
        size: 2.75
    },
    {
        program: "PROTECT_NBL",
        project: "TARGET",
        donor_id: "protect_01",
        submitter: "TARGET-30-T-D",
        specimen_type: "Primary tumour",
        sample: "TARGET-30",
        workflow: "spinnaker:1.0.4",
        filename: "5a00caf9-f202-4bcb-9fca-7d255ce171dc_1.fastq.gz",
        file_id: "07fc1bfd-650a-5c64-9e5e-2aef10c3a73f",
        size: 3.75
    },
    {
        program: "PROTECT_NBL",
        project: "TARGET",
        donor_id: "protect_01",
        submitter: "TARGET-30-T-D",
        specimen_type: "Primary tumour",
        sample: "TARGET-30",
        workflow: "spinnaker:1.0.4",
        filename: "5a00caf9-f202-4bcb-9fca-7d255ce171dc_1.fastq.gz",
        file_id: "07fc1bfd-650a-5c64-9e5e-2aef10c3a73f",
        size: 4.75
    },
    {
        program: "PROTECT_NBL",
        project: "TARGET",
        donor_id: "protect_01",
        submitter: "TARGET-30-T-D",
        specimen_type: "Primary tumour",
        sample: "TARGET-30",
        workflow: "spinnaker:1.0.4",
        filename: "5a00caf9-f202-4bcb-9fca-7d255ce171dc_1.fastq.gz",
        file_id: "07fc1bfd-650a-5c64-9e5e-2aef10c3a73f",
        size: 5.75
    },
    {
        program: "PROTECT_NBL",
        project: "TARGET",
        donor_id: "protect_01",
        submitter: "TARGET-30-T-D",
        specimen_type: "Primary tumour",
        sample: "TARGET-30",
        workflow: "spinnaker:1.0.4",
        filename: "5a00caf9-f202-4bcb-9fca-7d255ce171dc_1.fastq.gz",
        file_id: "07fc1bfd-650a-5c64-9e5e-2aef10c3a73f",
        size: 6.75
    },
    {
        program: "PROTECT_NBL",
        project: "TARGET",
        donor_id: "protect_01",
        submitter: "TARGET-30-T-D",
        specimen_type: "Primary tumour",
        sample: "TARGET-30",
        workflow: "spinnaker:1.0.4",
        filename: "5a00caf9-f202-4bcb-9fca-7d255ce171dc_1.fastq.gz",
        file_id: "07fc1bfd-650a-5c64-9e5e-2aef10c3a73f",
        size: 7.75
    },
    {
        program: "PROTECT_NBL",
        project: "TARGET",
        donor_id: "protect_01",
        submitter: "TARGET-30-T-D",
        specimen_type: "Primary tumour",
        sample: "TARGET-30",
        workflow: "spinnaker:1.0.4",
        filename: "5a00caf9-f202-4bcb-9fca-7d255ce171dc_1.fastq.gz",
        file_id: "07fc1bfd-650a-5c64-9e5e-2aef10c3a73f",
        size: 8.75
    },
    {
        program: "PROTECT_NBL",
        project: "TARGET",
        donor_id: "protect_01",
        submitter: "TARGET-30-T-D",
        specimen_type: "Primary tumour",
        sample: "TARGET-30",
        workflow: "spinnaker:1.0.4",
        filename: "5a00caf9-f202-4bcb-9fca-7d255ce171dc_1.fastq.gz",
        file_id: "07fc1bfd-650a-5c64-9e5e-2aef10c3a73f",
        size: 3.75
    },
    {
        program: "PROTECT_NBL",
        project: "TARGET",
        donor_id: "protect_01",
        submitter: "TARGET-30-T-D",
        specimen_type: "Primary tumour",
        sample: "TARGET-30",
        workflow: "spinnaker:1.0.4",
        filename: "5a00caf9-f202-4bcb-9fca-7d255ce171dc_1.fastq.gz",
        file_id: "07fc1bfd-650a-5c64-9e5e-2aef10c3a73f",
        size: 3.75
    },    {
        program: "PROTECT_NBL",
        project: "TARGET",
        donor_id: "protect_01",
        submitter: "TARGET-30-T-D",
        specimen_type: "Primary tumour",
        sample: "TARGET-30",
        workflow: "spinnaker:1.0.4",
        filename: "5a00caf9-f202-4bcb-9fca-7d255ce171dc_1.fastq.gz",
        file_id: "07fc1bfd-650a-5c64-9e5e-2aef10c3a73f",
        size: 3.75
    },    {
        program: "PROTECT_NBL",
        project: "TARGET",
        donor_id: "protect_01",
        submitter: "TARGET-30-T-D",
        specimen_type: "Primary tumour",
        sample: "TARGET-30",
        workflow: "spinnaker:1.0.4",
        filename: "5a00caf9-f202-4bcb-9fca-7d255ce171dc_1.fastq.gz",
        file_id: "07fc1bfd-650a-5c64-9e5e-2aef10c3a73f",
        size: 3.75
    },
    {
        program: "PROTECT_NBL",
        project: "TARGET",
        donor_id: "protect_01",
        submitter: "TARGET-30-T-D",
        specimen_type: "Primary tumour",
        sample: "TARGET-30",
        workflow: "spinnaker:1.0.4",
        filename: "5a00caf9-f202-4bcb-9fca-7d255ce171dc_1.fastq.gz",
        file_id: "07fc1bfd-650a-5c64-9e5e-2aef10c3a73f",
        size: 3.75
    },
    {
        program: "PROTECT_NBL",
        project: "TARGET",
        donor_id: "protect_01",
        submitter: "TARGET-30-T-D",
        specimen_type: "Primary tumour",
        sample: "TARGET-30",
        workflow: "spinnaker:1.0.4",
        filename: "5a00caf9-f202-4bcb-9fca-7d255ce171dc_1.fastq.gz",
        file_id: "07fc1bfd-650a-5c64-9e5e-2aef10c3a73f",
        size: 3.75
    }
];


export class ExampleDataSource extends DataSource<any> {
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Element[]> {
        return Observable.of(data);
    }

    disconnect() {
    }
}
