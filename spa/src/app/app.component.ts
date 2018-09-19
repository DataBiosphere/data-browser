/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Top-level application component.
 */

import { Component } from "@angular/core";
import { SetViewStateAction } from "./files/_ngrx/file-facet-list/file-facet-list.actions";
import { ActivatedRoute, Router } from "@angular/router";
import { AppState } from "./_ngrx/app.state";
import { Subscription } from "rxjs/Subscription";
import { Store } from "@ngrx/store";
import { Location } from '@angular/common';


@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"]
})


export class AppComponent {


    private actionsSubscription: Subscription;


    constructor(private router: Router,
                private store: Store<AppState>,
                private activatedRoute: ActivatedRoute,
                private location: Location) {

    }


    public ngOnInit() {
        this.setAppStateFromURL();
        //
        // this.actionsSubscription = this.activatedRoute.queryParams
        //     .map((params) => {
        //
        //         if (params && params["filter"] && params["filter"].length) {
        //
        //             let filterParam = decodeURIComponent(params["filter"]);
        //             let filter;
        //             try {
        //                 filter = JSON.parse(filterParam);
        //             }
        //             catch (err) {
        //                 console.log(err);
        //             }
        //
        //             if (filter && filter.facetName) {
        //                 return filter;
        //             }
        //             else {
        //                 return "";
        //             }
        //         }
        //     })
        //     .take(1).subscribe((filter) => {
        //
        //         if (filter) {
        //             this.store.dispatch(
        //                 new FetchFileFacetsRequestAction(
        //                     new FileFacetSelectedEvent(filter.facetName, filter.termName, true)));
        //         }
        //         else {
        //             this.store.dispatch(new FetchFileFacetsRequestAction());
        //         }
        //
        //         // let tab = this.activatedRoute.snapshot.url[0].path;
        //         // if (tab == "files") {
        //         //     this.store.dispatch(new EntitySelectAction("files"));
        //         // }
        //         // else {
        //         //     this.store.dispatch(new EntitySelectAction("specimens"));
        //         // }
        //     });


    }

    ngOnDestroy() {
        this.actionsSubscription.unsubscribe();
    }

    private setAppStateFromURL() {

        this.actionsSubscription = this.activatedRoute.queryParams
            .map((params) => {

                if (!(params && params["filter"] && params["filter"].length)) {
                    return "";
                }

                // we have a fiter lets extract it.
                let filterParam = decodeURIComponent(params["filter"]);
                let filter;
                try {
                    filter = JSON.parse(filterParam);
                }
                catch (err) {
                    console.log(err);
                    return "";
                }

                if (filter && filter.facetName) {
                    return filter;
                }
                else {
                    return "";
                }

            })
            .take(1).subscribe((filter) => {

                let path
                let tab;

                if (this.location.path() == "/files" ) {
                    tab = "files";
                }
                else {
                    tab = "specimens";
                }

                this.store.dispatch(new SetViewStateAction(tab, filter));

            });


    }
}

