/* tslint:disable:no-unused-variable */

import { TestBed, async } from "@angular/core/testing";
import { RepositoryComponent } from "./repository.component";
import { RepositoryService } from "./shared";

describe("Component: Repository", () => {
    it("should create an instance", () => {
        let component = new RepositoryComponent(RepositoryService);
        expect(component).toBeTruthy();
    });
});
