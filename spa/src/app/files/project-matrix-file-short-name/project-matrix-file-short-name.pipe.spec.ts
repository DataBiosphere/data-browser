/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Specs covering pipe for parsing file types from file names.
 */

// App dependencies
import { ProjectMatrixFileShortNamePipe } from "./project-matrix-file-short-name.pipe";

describe("Pipe: ProjectMatrixFileShortNamePipe", () => {

    it("strips project entry ID from matrix file name", () => {

        const pipe = new ProjectMatrixFileShortNamePipe();
        const originalFileName = "GSE114374_Human_HC_expression_matrix.txt.gz";
        const matrixFileName = `f8aa201c-4ff1-45a4-890e-840d63459ca2.${originalFileName}`;
        const parsedFileType = pipe.transform(matrixFileName);
        expect(parsedFileType).toEqual(originalFileName);
    });

});
