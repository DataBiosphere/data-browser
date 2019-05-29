/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of JSON response returned from project API.
 *
 *
 * Mock of project response from server and has been parsed by service. That is, the expected return value from
 * ProjectService.fetchProjectById.
 */
import { Contributor } from "./contributor.model";

export const DEFAULT_PROJECT = {
    "arrayExpressAccessions": [],
    "contributors": [
        {
            "institution": "10x Genomics, Inc.",
            "contactName": "Meer,,Elliott",
            "projectRole": "experimental scientist",
            "laboratory": null,
            "correspondingContributor": false,
            "email": "elliott.meer@10xgenomics.com"
        },
        {
            "institution": "University of California Santa Cruz",
            "contactName": "Sullivan,G,William",
            "projectRole": "Human Cell Atlas wrangler",
            "laboratory": "Human Cell Atlas Data Coordination Platform",
            "correspondingContributor": false,
            "email": "wisulliv@ucsc.edu"
        },
        {
            "institution": "10x Genomics, Inc.",
            "contactName": "Ziraldo,,Solongo",
            "projectRole": "experimental scientist",
            "laboratory": null,
            "correspondingContributor": false,
            "email": "solongo@10xgenomics.com"
        },
        {
            "institution": "10x Genomics, Inc.",
            "contactName": "Bruce,,Charles",
            "projectRole": "experimental scientist",
            "laboratory": null,
            "correspondingContributor": false,
            "email": "charles.bruce@10xgenomics.com"
        },
        {
            "institution": "10x Genomics, Inc.",
            "contactName": "Durruthy,,Jens",
            "projectRole": "other",
            "laboratory": null,
            "correspondingContributor": true,
            "email": "jens.durruthy@10xgenomics.com"
        },
        {
            "institution": "10x Genomics, Inc.",
            "contactName": "Gong,,Qiang",
            "projectRole": "computational scientist",
            "laboratory": null,
            "correspondingContributor": false,
            "email": "qiang.gong@10xgenomics.com"
        }
    ] as Contributor[],
    "entryId": "46c58e08-4518-4e45-acfe-bdab2434975d",
    "cellCount": 1330000,
    "disease": [
        "normal"
    ],
    "donorCount": 2,
    "fileType": [
        "fastq"
    ],
    "geoSeriesAccessions": [],
    "insdcProjectAccessions": [],
    "insdcStudyAccessions": [],
    "libraryConstructionApproach": [
        "10x_v2"
    ],
    "pairedEnd": [
        "true"
    ],
    "organ": [
        "Brain"
    ],
    "organPart": [
        "hippocampus",
        "cortex",
        "ventricular zone"
    ],
    "projectDescription": "Cortex, hippocampus, and subventricular zone were purchased from BrainBits (C57EHCV). They were from 2 E18 C57BL/6 mice dissected on the same day, shipped overnight on ice, and stored at 4C until being prepared for scRNA-Seq. Brain tissues were dissociated following the Demonstrated Protocol for Mouse Embryonic Neural Tissue (https://support.10xgenomics.com/single-cell/sample-prep/doc/demonstrated-protocol-dissociation-of-mouse-embryonic-neural-tissue-for-single-cell-rna-sequencing). 69 scRNA-Seq libraries were made from first mouse brain 2 days after the dissection. Another 64 scRNA-Seq libraries were made from second mouse brain 6 days after the dissection.",
    "projectShortname": "1M Neurons",
    "projectTitle": "1.3 Million Brain Cells from E18 Mice",
    "publications": [],
    "species": [
        "Mus musculus"
    ]
};
