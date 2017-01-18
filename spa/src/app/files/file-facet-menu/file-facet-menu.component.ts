import {
  Component,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
  SimpleChange,
  OnInit,
  Output,
  OnChanges,
  OnDestroy
} from "@angular/core";

import { Observable } from "rxjs/Observable";
import { FileFacet } from "../shared/file-facet.model";
import { BoardwalkStore } from "../../shared/boardwalk.model";
import { Term } from "../shared/term.model";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { SelectFileFacetAction } from "../actions/file-actions";
import { Store } from "@ngrx/store";
import { selectFileFacetByName } from "../files.reducer";

@Component({
  selector: 'bw-file-facet-menu',
  templateUrl: './file-facet-menu.component.html',
  styleUrls: ['./file-facet-menu.component.css'],
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
  constructor( store: Store<BoardwalkStore>) {

    this.store = store;

  }

  ngOnInit() {
    // TODO revisit selector/reducer/function thingo here.
    this.fileFacet$ = selectFileFacetByName(this.store, this.fileFacetName);
    this.subscription = this.fileFacet$.subscribe((fileFacet) => {this.fileFacet = fileFacet});
  }

  /**
   * Term has been selected from edit mode, cancel click event (to prevent close of menu) and emit select
   * event to parent.
   *
   * @param event {Event}
   * @param fileFacet {FileFacet}
   * @param term {Term}
   */
  public selectFacetTerm(event: Event, fileFacet: FileFacet, term: Term) {

    // Prevent menu from closing (on click)
    event.stopPropagation();
    event.preventDefault();

    this.store.dispatch(new SelectFileFacetAction(new FileFacetSelectedEvent(fileFacet, term)));
  }

    /**
     * Emit close menu event
     */
    onClickCloseMenu(): void {

        this.closeMenu.emit();
    }
}
