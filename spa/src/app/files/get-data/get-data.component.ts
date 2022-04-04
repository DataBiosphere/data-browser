/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component controlling get data flows.
 */

// Core dependencies
import {
    Component,
    ChangeDetectionStrategy,
    OnDestroy,
    OnInit,
} from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { ClearFilesFacetsAction } from "../_ngrx/file-manifest/clear-files-facets.action";
import { TitleService } from "../title/title.service";

@Component({
    selector: "get-data",
    templateUrl: "./get-data.component.html",
    styleUrls: ["./get-data.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetDataComponent implements OnDestroy, OnInit {
    /**
     * @param {Store<AppState>} store
     * @param {TitleService} titleService
     */
    public constructor(
        private titleService: TitleService,
        private store: Store<AppState>
    ) {}

    /**
     * Clear files facets on destroy.
     */
    public ngOnDestroy() {
        this.store.dispatch(new ClearFilesFacetsAction());
    }

    /**
     * Set page title on load.
     */
    public ngOnInit() {
        this.titleService.setTitle("Export Selected Data");
    }
}
