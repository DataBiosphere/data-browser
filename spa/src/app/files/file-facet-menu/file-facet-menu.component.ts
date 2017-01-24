import {
    Component,
    EventEmitter,
    Input,
    ChangeDetectionStrategy,
    OnInit,
    Output
} from "@angular/core";

import { Observable } from "rxjs/Observable";
import { FileFacet } from "../shared/file-facet.model";
import { BoardwalkStore } from "../../shared/boardwalk.model";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { SelectFileFacetAction } from "../actions/file-actions";
import { Store } from "@ngrx/store";
import { selectFileFacetByName } from "../files.reducer";

@Component({
    selector: "bw-file-facet-menu",
    templateUrl: "./file-facet-menu.component.html",
    styleUrls: ["./file-facet-menu.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileFacetMenuComponent implements OnInit {

    // Privates
    private store: Store<BoardwalkStore>;

    // Output
    @Output() closeMenu = new EventEmitter<void>();

    // Inputs
    @Input() fileFacetName: string;
    private fileFacet$: Observable<FileFacet>;
    private fileFacet: FileFacet;
    private subscription;

    /**
     * @param store {Store<BoardwalkStore>}
     */
    constructor(store: Store<BoardwalkStore>) {

        this.store = store;
    }

    /**
     * Public API
     */

    /**
     * Term has been selected from edit mode, emit select event to parent.
     *
     * @param fileFacetSelectedEvent {FileFacetSelectedEvent}
     */
    public onFacetTermSelected(fileFacetSelectedEvent: FileFacetSelectedEvent) {

        this.store.dispatch(new SelectFileFacetAction(fileFacetSelectedEvent));
    }

    /**
     * Emit close menu event
     */
    onClickCloseMenu(): void {

        this.closeMenu.emit();
    }

    /**
     * Lifecycle hooks
     */

    /**
     * Set up subscriptions.
     */
    ngOnInit() {

        // TODO revisit selector/reducer/function thingo here.
        this.fileFacet$ = selectFileFacetByName(this.store, this.fileFacetName);
        this.subscription = this.fileFacet$.subscribe((fileFacet) => {
            this.fileFacet = fileFacet
        });
    }
}
