/* tslint:disable:no-unused-variable */

import { TestBed, async } from "@angular/core/testing";
import { CamelToSpacePipe } from "./camel-to-space.pipe";

describe("Pipe: CamelToSpace", () => {

    it("create an instance", () => {
        let pipe = new CamelToSpacePipe();
        expect(pipe).toBeTruthy();
    });

    it(`space delimits camelCase: "Camel Case"`, () => {
        let pipe = new CamelToSpacePipe();
        let value = "camelCase";
        let result = pipe.transform(value);
        expect(result).toBeTruthy();
    });

    it(`space delimits PascalCase: "Pascal Case"`, () => {
        let pipe = new CamelToSpacePipe();
        let value = "PascalCase";
        let result = pipe.transform(value);
        expect(result).toBe("Pascal Case");
    });

    it(`capitalizes lower: "Lower"`, () => {
        let pipe = new CamelToSpacePipe();
        let value = "lower";
        let result = pipe.transform(value);
        expect(result).toBe("Lower");
    });

    it(`leaves unchanged Upper: "Upper"`, () => {
        let pipe = new CamelToSpacePipe();
        let value = "Upper";
        let result = pipe.transform(value);
        expect(result).toBe("Upper");
    });
});
