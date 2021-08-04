/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Mock of files with various values, to be exercised by the file row mapper spec.
 */

// Example of file with single values (eg disease, genusSpecies)
export const FILE_SINGLE_VALUES =
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "Smart-seq2"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [
                    true
                ],
                "workflow": [
                    "smartseq2"
                ],
                "workflowVersion": [
                    "v2.3.0"
                ]
            }
        ],
        "entryId": "ee6a75bd-3252-41ee-b253-425bbd377f0c",
        "projects": [
            {
                "projectId": "8c3c290d-dfff-4553-8868-54ce45f4ba7f",
                "projectTitle": [
                    "Single-cell RNA-seq analysis  throughout a 125-day differentiation protocol that converted H1 human embryonic stem cells to a variety of ventrally-derived cell types."
                ],
                "projectShortname": [
                    "Single cell RNAseq characterization of cell types produced over time in an in vitro model of human inhibitory interneuron differentiation."
                ],
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform",
                    "Molecular Atlas"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "cellLines"
                ],
                "id": [
                    "cell_line_at_day_26"
                ],
                "modelOrgan": ["foo"]
            }
        ],
        "specimens": [
            {
                "id": [
                    "embryo_WAe001-A"
                ],
                "organ": [
                    "embryo"
                ],
                "organPart": [
                    "blastocyst"
                ],
                "disease": [
                    "normal"
                ],
                "preservationMethod": [
                    null
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "cellLines": [
            {
                "id": [
                    "cell_line_WAe001-A"
                ]
            }
        ],
        "donorOrganisms": [
            {
                "id": [
                    "donor_WAe001-A"
                ],
                "genusSpecies": [
                    "Homo sapiens"
                ],
                "organismAge": [
                    {
                        "value": "56",
                        "unit": "year"
                    }
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": [
                    "a"
                ]
            }
        ],
        "organoids": [
            "a"
        ],
        "cellSuspensions": [
            {
                "organ": [
                    "embryo"
                ],
                "organPart": [
                    "blastocyst"
                ],
                "selectedCellType": [
                    "inhibitory interneuron"
                ],
                "totalCells": 100
            }
        ],
        "bundles": [
            {
                "bundleUuid": "e42b77f3-112a-47a8-a47b-0afa56c99585",
                "bundleVersion": "2019-05-15T232146.052000Z"
            }
        ],
        "files": [
            {
                "contentDescription": ["DNA sequence"],
                "format": "matrix",
                "name": "0000ea22-7033-44a8-88ff-190d8dde0183.zarr!.zattrs",
                "sha256": "6f77cee1bd32665812a42640bf94a33f9e940298df8e20c4c76717c8d07a2613",
                "size": 148,
                "source": "foo",
                "uuid": "86f5c1f3-7575-42cf-863c-ced4c2f4e475",
                "version": "2019-05-16T020707.744487Z",
                "url": "https:\/\/service.explore.data.humancellatlas.org\/fetch\/dss\/files\/86f5c1f3-7575-42cf-863c-ced4c2f4e475?version=2019-05-16T020707.744487Z&replica=aws"
            }
        ]
    };

// Example of file with multiple values within single objects
export const FILE_MULTIPLE_VALUES_SINGLE_OBJECT =
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "Smart-seq2",
                    "a"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500",
                    "a"
                ],
                "pairedEnd": [
                    true,
                    false
                ],
                "workflow": [
                    "smartseq2",
                    "a"
                ],
                "workflowVersion": [
                    "v2.3.0",
                    "a"
                ]
            }
        ],
        "entryId": "ee6a75bd-3252-41ee-b253-425bbd377f0c",
        "projects": [
            {
                "projectId": "8c3c290d-dfff-4553-8868-54ce45f4ba7f",
                "projectTitle": [
                    "Single-cell RNA-seq analysis  throughout a 125-day differentiation protocol that converted H1 human embryonic stem cells to a variety of ventrally-derived cell types.",
                    "a"
                ],
                "projectShortname": [
                    "Single cell RNAseq characterization of cell types produced over time in an in vitro model of human inhibitory interneuron differentiation.",
                    "a"
                ],
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform",
                    "Molecular Atlas"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "cellLines",
                    "a"
                ],
                "id": [
                    "cell_line_at_day_26",
                    "a"
                ],
                "modelOrgan": ["foo", "bar"]
            }
        ],
        "specimens": [
            {
                "id": [
                    "embryo_WAe001-A",
                    "a"
                ],
                "organ": [
                    "embryo",
                    "a"
                ],
                "organPart": [
                    "blastocyst",
                    "a"
                ],
                "disease": [
                    "normal",
                    "a"
                ],
                "preservationMethod": [
                    "a",
                    "b"
                ],
                "source": [
                    "specimen_from_organism",
                    "a"
                ]
            }
        ],
        "cellLines": [
            {
                "id": [
                    "cell_line_WAe001-A",
                    "cell_line_at_day_26"
                ]
            }
        ],
        "donorOrganisms": [
            {
                "id": [
                    "donor_WAe001-A",
                    "a"
                ],
                "genusSpecies": [
                    "Homo sapiens",
                    "a"
                ],
                "organismAge": [
                    {
                        "value": "56",
                        "unit": "year"
                    },
                    {
                        "value": "60",
                        "unit": "year"
                    }
                ],
                "biologicalSex": [
                    "male",
                    "a"
                ],
                "disease": [
                    "a",
                    "b"
                ]
            }
        ],
        "organoids": [
            "a",
            "b"
        ],
        "cellSuspensions": [
            {
                "organ": [
                    "embryo",
                    "a"
                ],
                "organPart": [
                    "blastocyst",
                    "a"
                ],
                "selectedCellType": [
                    "inhibitory interneuron",
                    "a"
                ],
                "totalCells": 100
            }
        ],
        "bundles": [
            {
                "bundleUuid": "e42b77f3-112a-47a8-a47b-0afa56c99585",
                "bundleVersion": "2019-05-15T232146.052000Z"
            }
        ],
        "files": [
            {
                "contentDescription": ["DNA sequence"],
                "format": "matrix",
                "name": "0000ea22-7033-44a8-88ff-190d8dde0183.zarr!.zattrs",
                "sha256": "6f77cee1bd32665812a42640bf94a33f9e940298df8e20c4c76717c8d07a2613",
                "size": 148,
                "uuid": "86f5c1f3-7575-42cf-863c-ced4c2f4e475",
                "version": "2019-05-16T020707.744487Z",
                "url": "https:\/\/service.explore.data.humancellatlas.org\/fetch\/dss\/files\/86f5c1f3-7575-42cf-863c-ced4c2f4e475?version=2019-05-16T020707.744487Z&replica=aws"
            }
        ]
    };

// Example of file with single and multiple values across multiple objects
export const FILE_VALUES_ACROSS_MULTIPLE_OBJECTS =
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "Smart-seq2"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [
                    true
                ],
                "workflow": [
                    "smartseq2"
                ],
                "workflowVersion": [
                    "v2.3.0"
                ]
            }
        ],
        "entryId": "ee6a75bd-3252-41ee-b253-425bbd377f0c",
        "projects": [
            {
                "projectId": "8c3c290d-dfff-4553-8868-54ce45f4ba7f",
                "projectTitle": [
                    "Single-cell RNA-seq analysis  throughout a 125-day differentiation protocol that converted H1 human embryonic stem cells to a variety of ventrally-derived cell types."
                ],
                "projectShortname": [
                    "Single cell RNAseq characterization of cell types produced over time in an in vitro model of human inhibitory interneuron differentiation."
                ],
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform"
                ]
            },
            {
                "projectId": "8c3c290d-dfff-4553-8868-54ce45f4ba7a",
                "projectTitle": [
                    "x",
                    "y"
                ],
                "projectShortname": [
                    "x",
                    "y"
                ],
                "laboratory": [
                    "x",
                    "y"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "cellLines"
                ],
                "id": [
                    "cell_line_at_day_26"
                ],
                "modelOrgan": ["foo"]
            },
            {
                "sampleEntityType": [
                    "x",
                    "y"
                ],
                "id": [
                    "x",
                    "y"
                ],
                "modelOrgan": ["bar"]
            }
        ],
        "specimens": [
            {
                "id": [
                    "embryo_WAe001-A"
                ],
                "organ": [
                    "embryo"
                ],
                "organPart": [
                    "blastocyst"
                ],
                "disease": [
                    "normal"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": [
                    "specimen_from_organism"
                ]
            },
            {
                "id": [
                    "x",
                    "y"
                ],
                "organ": [
                    "x",
                    "y"
                ],
                "organPart": [
                    "x",
                    "y"
                ],
                "disease": [
                    "x",
                    "y"
                ],
                "preservationMethod": [
                    "x",
                    "y"
                ],
                "source": [
                    "x",
                    "y"
                ]
            }
        ],
        "cellLines": [
            {
                "id": [
                    "cell_line_WAe001-A"
                ]
            },
            {
                "id": [
                    "x",
                    "y"
                ]
            }
        ],
        "donorOrganisms": [
            {
                "id": [
                    "donor_WAe001-A"
                ],
                "genusSpecies": [
                    "Homo sapiens"
                ],
                "organismAge": [
                    {
                        "value": "56",
                        "unit": "year"
                    }
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": [
                    "a"
                ]
            },
            {
                "id": [
                    "x",
                    "y"
                ],
                "genusSpecies": [
                    "x",
                    "y"
                ],
                "organismAge": [
                    {
                        "value": "60",
                        "unit": "year"
                    }
                ],
                "biologicalSex": [
                    "x",
                    "y"
                ],
                "disease": [
                    "x",
                    "y"
                ]
            }
        ],
        "organoids": [
            "a"
        ],
        "cellSuspensions": [
            {
                "organ": [
                    "embryo"
                ],
                "organPart": [
                    "blastocyst"
                ],
                "selectedCellType": [
                    "inhibitory interneuron"
                ],
                "totalCells": 100
            },
            {
                "organ": [
                    "x",
                    "y"
                ],
                "organPart": [
                    "x",
                    "y"
                ],
                "selectedCellType": [
                    "x",
                    "y"
                ],
                "totalCells": 100
            }
        ],
        "bundles": [
            {
                "bundleUuid": "e42b77f3-112a-47a8-a47b-0afa56c99585",
                "bundleVersion": "2019-05-15T232146.052000Z"
            }
        ],
        "files": [
            {
                "contentDescription": ["DNA sequence"],
                "format": "matrix",
                "name": "0000ea22-7033-44a8-88ff-190d8dde0183.zarr!.zattrs",
                "sha256": "6f77cee1bd32665812a42640bf94a33f9e940298df8e20c4c76717c8d07a2613",
                "size": 148,
                "source": "foo",
                "uuid": "86f5c1f3-7575-42cf-863c-ced4c2f4e475",
                "version": "2019-05-16T020707.744487Z",
                "url": "https:\/\/service.explore.data.humancellatlas.org\/fetch\/dss\/files\/86f5c1f3-7575-42cf-863c-ced4c2f4e475?version=2019-05-16T020707.744487Z&replica=aws"
            }
        ]
    };

// Example of file with empty array values
export const FILE_EMPTY_ARRAY_VALUES =
    {
        "protocols": [
            {
                "libraryConstructionApproach": [],
                "instrumentManufacturerModel": [],
                "pairedEnd": [],
                "workflow": [],
                "workflowVersion": []
            }
        ],
        "entryId": "ee6a75bd-3252-41ee-b253-425bbd377f0c",
        "projects": [
            {
                "projectId": "",
                "projectTitle": [],
                "projectShortname": [],
                "laboratory": []
            }
        ],
        "samples": [
            {
                "sampleEntityType": [],
                "id": [],
                "modelOrgan": []
            }
        ],
        "specimens": [
            {
                "id": [],
                "organ": [],
                "organPart": [],
                "disease": [],
                "preservationMethod": [],
                "source": []
            }
        ],
        "cellLines": [
            {
                "id": []
            }
        ],
        "donorOrganisms": [
            {
                "id": [],
                "genusSpecies": [],
                "organismAge": [],
                "biologicalSex": [],
                "disease": [],
            }
        ],
        "organoids": [],
        "cellSuspensions": [
            {
                "organ": [],
                "organPart": [],
                "selectedCellType": [],
                "totalCells": 100
            }
        ],
        "bundles": [
            {
                "bundleUuid": "e42b77f3-112a-47a8-a47b-0afa56c99585",
                "bundleVersion": "2019-05-15T232146.052000Z"
            }
        ],
        "files": [
            {
                "contentDescription": [],
                "format": "matrix",
                "name": "0000ea22-7033-44a8-88ff-190d8dde0183.zarr!.zattrs",
                "sha256": "6f77cee1bd32665812a42640bf94a33f9e940298df8e20c4c76717c8d07a2613",
                "size": 148,
                "source": "foo",
                "uuid": "86f5c1f3-7575-42cf-863c-ced4c2f4e475",
                "version": "2019-05-16T020707.744487Z",
                "url": "https:\/\/service.explore.data.humancellatlas.org\/fetch\/dss\/files\/86f5c1f3-7575-42cf-863c-ced4c2f4e475?version=2019-05-16T020707.744487Z&replica=aws"
            }
        ]
    };

// Example of file with null top level values
export const FILE_NULL_TOP_LEVEL_VALUES =
    {
        "protocols": null,
        "entryId": null,
        "projects": null,
        "samples": null,
        "specimens": null,
        "cellLines": null,
        "donorOrganisms": null,
        "organoids": null,
        "cellSuspensions": null,
        "bundles": null,
        "files": null
    };

// Example of file with null values
export const FILE_NULL_VALUES =
    {
        "protocols": [
            {
                "libraryConstructionApproach": null,
                "instrumentManufacturerModel": null,
                "pairedEnd": null,
                "workflow": null,
                "workflowVersion": null
            }
        ],
        "entryId": null,
        "projects": [
            {
                "projectId": null,
                "projectTitle": null,
                "projectShortname": null,
                "laboratory": null
            }
        ],
        "samples": [
            {
                "sampleEntityType": null,
                "id": null,
                "modelOrgan": null
            }
        ],
        "specimens": [
            {
                "id": null,
                "organ": null,
                "organPart": null,
                "disease": null,
                "preservationMethod": null,
                "source": null
            }
        ],
        "cellLines": [
            {
                "id": null
            }
        ],
        "donorOrganisms": [
            {
                "id": null,
                "genusSpecies": null,
                "organismAge": null,
                "biologicalSex": null,
                "disease": null
            }
        ],
        "organoids": [
            null,
        ],
        "cellSuspensions": [
            {
                "organ": null,
                "organPart": null,
                "selectedCellType": null,
                "totalCells": null
            }
        ],
        "bundles": [
            {
                "bundleUuid": null,
                "bundleVersion": null
            }
        ],
        "files": [
            {
                "contentDescription": [null],
                "format": null,
                "name": null,
                "sha256": null,
                "size": 148,
                "source": null,
                "uuid": null,
                "version": null,
                "url": null
            }
        ]
    };
