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
        "fileType": "fastq.gz",
        "count": 228220,
        "totalSize": 8014337663365
    }, {
        "fileType": "csv",
        "count": 30255,
        "totalSize": 399920680
    }, {
        "fileType": "txt",
        "count": 21405,
        "totalSize": 82164152
    }, {
        "fileType": "fastq",
        "count": 16374,
        "totalSize": 3205572872003
    }, {
        "fileType": "bam",
        "count": 8859,
        "totalSize": 4211475949279
    }, {
        "fileType": "results",
        "count": 8562,
        "totalSize": 113426209414
    }, {
        "fileType": "bai",
        "count": 4562,
        "totalSize": 9931954608
    }, {
        "fileType": "matrix",
        "count": 4297,
        "totalSize": 635180
    }, {
        "fileType": "tsv",
        "count": 1124,
        "totalSize": 4455258968
    }, {
        "fileType": "h5",
        "count": 843,
        "totalSize": 36453457224
    }, {
        "fileType": "mtx",
        "count": 562,
        "totalSize": 31090560898
    }, {
        "fileType": "unknown",
        "count": 361,
        "totalSize": 1374848147
    }, {
        "fileType": "tiff",
        "count": 221,
        "totalSize": 353659449
    }, {
        "fileType": "pdf",
        "count": 13,
        "totalSize": 24511254
    }, {
        "fileType": "json",
        "count": 6,
        "totalSize": 61579
    }, {
        "fileType": "jpeg",
        "count": 1,
        "totalSize": 1229704
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
