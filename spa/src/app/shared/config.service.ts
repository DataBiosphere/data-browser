import { Injectable } from "@angular/core";
import { FacetSortOrder } from "../files/shared/files.dao";

export type ApiSource = "UCSC_STAGE" | "UCSC" | "ICGC";

@Injectable()
export class ConfigService {

    constructor() { }


    getSource(): ApiSource {
        return "UCSC_STAGE";
    }

    getRootUrl(source: ApiSource) {

        if (source === "UCSC_STAGE") {
            return "http://ec2-35-167-83-191.us-west-2.compute.amazonaws.com/api/v1";
        }
        else if (source === "UCSC") {
            return "http://ucsc-cgl.org/api/v1";
        }
        else if (source === "ICGC") {
            return "https://dcc.icgc.org/api/v1";
        }
    }

    getTestSortFacets(): FacetSortOrder[] {

        return <FacetSortOrder[]>[
            {
                name: "centerName",
                category: "file"
            },
            {
                name: "program",
                category: "file"
            },
            {
                name: "projectCode",
                category: "file"
            },
            {
                name: "workFlow",
                category: "file"
            },
            {
                name: "analysisType",
                category: "file"
            },
            {
                name: "specimenType",
                category: "file"
            },
            {
                name: "fileFormat",
                category: "file"
            }
        ];
    }
}
