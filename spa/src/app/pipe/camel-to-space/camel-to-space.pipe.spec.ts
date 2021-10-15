/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for camel to space pipe.
 */

/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */

// App dependencies
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
        expect(result).toBe("Camel Case");
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
