/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from "@angular/core/testing";
import { RepositoryDAO } from "./repository.dao";

describe("DAO: Repository", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RepositoryDAO]
        });
    });

    it("should ...", inject([RepositoryDAO], (service: RepositoryDAO) => {
        expect(service).toBeTruthy();
    }));
});
