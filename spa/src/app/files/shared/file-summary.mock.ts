/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Mock of file summary response from server and has been parsed by service. That is, the expected return value from
 * FileService.fetchFileSummary.
 */

// App dependencies
import { FileSummary } from "../file-summary/file-summary";

// Summary for state where no facets selected
export const DEFAULT_FILE_SUMMARY = {
    "totalFileSize": 15628980955904,
    "fileTypeSummaries": [{
        "contentDescription": [],
        "count": 228220,
        "fileType": "fastq.gz",
        "isIntermediate": false,
        "matrixCellCount": 0,
        "totalSize": 8014337663365
    }, {
        "contentDescription": [],
        "count": 30255,
        "fileType": "csv",
        "isIntermediate": false,
        "matrixCellCount": 0,
        "totalSize": 399920680
    }, {
        "contentDescription": [],
        "count": 21405,
        "fileType": "txt",
        "isIntermediate": false,
        "matrixCellCount": 0,
        "totalSize": 82164152
    }],
    "fileCount": 326147,
    "organTypes": ["blood", "bone", "brain", "heart", "pancreas", "fat", "lymph node", "tumor", "kidney", "Brain"],
    "donorCount": 151,
    "labCount": 22,
    "totalCellCount": 9578115,
    "cellCountSummaries": [{
        "organType": ["blood"],
        "countOfDocsWithOrganType": 100,
        "totalCellCountByOrgan": 276154
    }, {
        "organType": ["bone"],
        "countOfDocsWithOrganType": 83,
        "totalCellCountByOrgan": 279535
    }, {
        "organType": ["brain"],
        "countOfDocsWithOrganType": 59,
        "totalCellCountByOrgan": 75561
    }, {
        "organType": ["heart"],
        "countOfDocsWithOrganType": 36,
        "totalCellCountByOrgan": 7115
    }, {
        "organType": ["fat"],
        "countOfDocsWithOrganType": 28,
        "totalCellCountByOrgan": 5862
    }, {
        "organType": ["lymph node"],
        "countOfDocsWithOrganType": 28,
        "totalCellCountByOrgan": 3274
    }, {
        "organType": ["pancreas"],
        "countOfDocsWithOrganType": 26,
        "totalCellCountByOrgan": 8018
    }, {
        "organType": ["tumor"],
        "countOfDocsWithOrganType": 25,
        "totalCellCountByOrgan": 3185
    }, {
        "organType": ["large intestine"],
        "countOfDocsWithOrganType": 13,
        "totalCellCountByOrgan": 4149
    }, {
        "organType": ["hemopoietic organ"],
        "countOfDocsWithOrganType": 12,
        "totalCellCountByOrgan": 9500
    }],
    "specimenCount": 513,
    "projectCount": 35
} as FileSummary;
