/* tslint:disable:no-unused-variable */

import { TestBed, async } from "@angular/core/testing";
import { FileSizePipe } from "./file-size.pipe";

describe("Pipe: FileSize", () => {

    it("create an instance", () => {
        let pipe = new FileSizePipe();
        expect(pipe).toBeTruthy();
    });

    it(`makes a 1024 Bytes = "1.00 KB"`, () => {
        let pipe = new FileSizePipe();
        let value = 1024;
        let result = pipe.transform(value);
        expect(result).toBe("1.00 KB");
    });

    it(`makes a 1024 Kilobytes = "1.00 MB"`, () => {
        let pipe = new FileSizePipe();
        let value = 1024 * 1024;
        let result = pipe.transform(value);
        expect(result).toBe("1.00 MB");
    });

    it(`makes a 1024 Megabytes = "1.00 GB"`, () => {
        let pipe = new FileSizePipe();
        let value = 1024 * 1024 * 1024;
        let result = pipe.transform(value);
        expect(result).toBe("1.00 GB");
    });

    it(`makes a 1024 Gigabytes = "1.00 TB"`, () => {
        let pipe = new FileSizePipe();
        let value = 1024 * 1024 * 1024 * 1024;
        let result = pipe.transform(value);
        expect(result).toBe("1.00 TB");
    });

    it(`makes a 1024 Terabytes = "1.00 PB"`, () => {
        let pipe = new FileSizePipe();
        let value = 1024 * 1024 * 1024 * 1024 * 1024;
        let result = pipe.transform(value);
        expect(result).toBe("1.00 PB");
    });

    it(`transforms to "1.50 MB"`, () => {
        let pipe = new FileSizePipe();
        let value = 1024 * (1024 * 1.5);
        let result = pipe.transform(value);
        expect(result).toBe("1.50 MB");
    });

});
