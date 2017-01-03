///<reference path="file-facet.model.ts"/>
import { Injectable } from "@angular/core";
import { Http, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { CCBaseDAO } from "./../../cc-http";
import "rxjs/add/observable/of";

import { FileSummary } from "../file-summary";
import { FileManifestSummary } from "../file-manifest-summary/file-manifest-summary";
import { Dictionary } from "../../shared/dictionary";
import { ICGCQuery } from "./icgc-query";
import { Term } from "./term.model";
import { FileFacet } from "./file-facet.model";

interface FilesAPIResponse {
    termFacets: Dictionary<{ terms: Array<{term: string; count: number}>;
                             total: number}>;
}


@Injectable()
export class FilesDAO extends CCBaseDAO {

    private DOMAIN = "https://dcc.icgc.org/api/v1";

    constructor(http: Http) {
        super(http);
    }

    /**
     * Fet FileSummary
     *
     * http://docs.icgc.org/portal/api-endpoints/#!/repository/getSummary
     *
     * @param [filters]
     * @returns {Observable<FileSummary>}
     */
    fetchFileSummary(selectedFacets: FileFacet[]): Observable<FileSummary> {

        const query =  new ICGCQuery(this.facetsToQueryString(selectedFacets));

        const url = this.buildApiUrl(`/repository/files/summary`);
        const filterParams = Object.assign({}, query);
        return this.get<FileSummary>(url, filterParams);
    }

    /**
     * Fetch FileFacets
     *
     * http://docs.icgc.org/portal/api-endpoints/#!/repository/findAll
     *
     * @param filters
     * @returns {Observable<FileFacet>}
     */
    fetchFileFacets(selectedFacetsByName: Map<string,FileFacet>): Observable<FileFacet[]> {

        const selectedFacets = Array.from(selectedFacetsByName.values());

        const query =  new ICGCQuery(this.facetsToQueryString(selectedFacets));

        const url = this.buildApiUrl(`/repository/files`);
        const filterParams = Object.assign({ include: "facets", from: 1, size:1 }, query);

        return this.get<FilesAPIResponse>(url, filterParams)
            .map((repositoryFiles: FilesAPIResponse) => {
                    return this.createFileFacets(selectedFacetsByName,repositoryFiles);
                }
            );
    }

    /**
     * Fetch Manifest Summary
     *
     * @param form
     * @returns {Observable<FileManifestSummary>}
     */
    fetchFileManifestSummary(selectedFacets: FileFacet[]): Observable<Dictionary<FileManifestSummary>> {

        const query =  new ICGCQuery(this.facetsToQueryString(selectedFacets));

        const filters = JSON.parse(query.filters);
        let repoNames = []; // TODO empty array default throws an error. There needs to be something in the repoNames

        if (filters.file && filters.file.repoName) {
            repoNames = filters.file.repoName.is;
        }

        // convert query from string back to object for post
        const form = Object.assign({}, {
            query: {
                filters: JSON.parse(query.filters)
            },
            repoNames: repoNames
        });


        const url = this.buildApiUrl("/repository/files/summary/manifest");
        return this.post<Dictionary<FileManifestSummary>>(url, form);
    }

    /**
     * Download Manifest
     *
     * @param query
     * @returns {any}
     */
    downloadFileManifest(selectedFacets: FileFacet[]): Observable<any> {

        const query =  new ICGCQuery(this.facetsToQueryString(selectedFacets));

        //This is different from the others just tocreate the params for window.location.href.
        //  query.format = "tarball";

        let params = new URLSearchParams();
        Object.keys(query).forEach((paramName) => {
            params.append(paramName, query[paramName]);
        });

        window.location.href = this.buildApiUrl(`/manifests?${params.toString()}`);
        return Observable.of(true); // TODO error handling? I'm not sure setting the href causes any errors
    }

    /**
     * Build Full API Url
     *
     * @param url
     * @returns {string}
     */
    private buildApiUrl(url: string) {
        return `${this.DOMAIN}${url}`;
    }

    private createFileFacets(selectedFacetsByName: Map<string,FileFacet>, filesAPIResponse: FilesAPIResponse): FileFacet[] {


        const facetNames = Object.keys(filesAPIResponse.termFacets);
        const newFileFacets = facetNames.map((facetName) => {

            const responseFileFacet = filesAPIResponse.termFacets[facetName];
            const oldFacet: FileFacet = selectedFacetsByName.get(facetName);


            let responseTerms: Term[];

            // the response from ICGC is missing the terms field instead of being an empty array
            // we need to check it's existence before iterating over it.
            if (responseFileFacet.terms) {

                responseTerms = responseFileFacet.terms.map((responseTerm) => {

                    let oldTerm: Term;

                    if(oldFacet){
                        oldTerm = oldFacet.termsByName.get(responseTerm.term);
                    }

                    let selected = false;
                    if(oldTerm){
                        selected = oldTerm.selected;
                    }

                    return new Term( responseTerm.term, responseTerm.count, selected); // DONE!

                });
            }

            if(!responseFileFacet.total){
                responseFileFacet.total = 0; // their default is undefined instead of zero
            }

            return new FileFacet(facetName,responseFileFacet.total,responseTerms);
        });

        return newFileFacets;

    }




    /**
     * Filter To Querystring
     *
     * return JSON string of: { file: { primarySite: { is: ["Brain"] } } }
     * if there aren't any file filters, it's just { }, not { file: { } }
     *
     * TODO is this the ICGC workaround?
     *
     * @param filters
     * @returns {string}
     */

    private facetsToQueryString(selectedFacets: FileFacet[]): string {


        let filters = selectedFacets.reduce((facetAcc, facet) => {

            //paranoid check for no facets.
            if(!facet.terms || !facet.terms.length){
                return facetAcc;
            }

            //get an array of term names if any
            const filters = facet.selectedTerms.map((term) =>{
                return term.name;
            });

            facetAcc[facet.name] = { is: filters};
            return facetAcc;
        },{});

        // empty object if it doesn't have any filters;
        const result = Object.keys(filters).length ? { file: filters } : {};
        return JSON.stringify(result);
    }

}
