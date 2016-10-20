import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class DonorService {

    constructor(private http: Http) {}

    getStuff() {

        return this.http.get("https://dcc.icgc.org/api/v1/donors?filters=%7B%7D&from=1&size=10&sort=ssmAffectedGenes&order=desc&facetsOnly=false")
            .map(res => res.json())
    }

}