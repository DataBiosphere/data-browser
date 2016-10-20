/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from "@angular/core/testing";
import { RepositoryService } from "./repository.service";

describe("Service: Repository", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RepositoryService]
        });
    });

    it("should ...", inject([RepositoryService], (service: RepositoryService) => {
        expect(service).toBeTruthy();
    }));
});
