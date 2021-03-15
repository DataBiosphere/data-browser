/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Mock of entity search results returned from server. That is, the expected valued returned when calling /projects
 * endpoint.
 */

export const PROJECTS_ENTITY_API_RESPONSE = {
    "hits": [{
        "protocols": [{
            "libraryConstructionApproach": ["inDrop", null],
            "instrumentManufacturerModel": ["Illumina HiSeq 2500", null],
            "pairedEnd": [true, null],
            "workflow": [null],
            "assayType": [null]
        }],
        "entryId": "f86f1ab4-1fbb-4510-ae35-3ffd752d4dfc",
        "projects": [{
            "projectTitle": "A Single-Cell Transcriptomic Map of the Human and Mouse Pancreas Reveals Inter- and Intra-cell Population Structure",
            "projectShortname": "HumanMousePancreas",
            "laboratory": ["Center for the Science of Therapeutics", "Department of Immunology, Faculty of Medicine", "Department of Stem Cell and Regenerative Biology", "Department of Systems Biology", "Faculty of Biology", "Human Cell Atlas Data Coordination Platform"],
            "arrayExpressAccessions": ["E-GEOD-84133"],
            "geoSeriesAccessions": ["GSE84133"],
            "insdcProjectAccessions": ["SRP078321"],
            "insdcStudyAccessions": ["PRJNA328774"],
            "supplementaryLinks": [null]
        }],
        "samples": [{
            "sampleEntityType": ["specimens"],
            "effectiveOrgan": ["pancreas"],
            "id": ["H1_pancreas", "H2_pancreas", "H3_pancreas", "H4_pancreas", "M_C57BL/6_pancreas", "M_ICR_pancreas"],
            "source": ["specimen_from_organism"],
            "preservationMethod": [null],
            "disease": [null],
            "organ": ["pancreas"],
            "organPart": [null]
        }],
        "specimens": [{
            "id": ["H1_pancreas", "H2_pancreas", "H3_pancreas", "H4_pancreas", "M_C57BL/6_pancreas", "M_ICR_pancreas"],
            "organ": ["pancreas"],
            "organPart": [null],
            "disease": [null],
            "preservationMethod": [null],
            "source": ["specimen_from_organism"]
        }],
        "cellLines": [],
        "donorOrganisms": [{
            "id": ["H1", "H2", "H3", "H4", "M_C57BL/6_1", "M_C57BL/6_2", "M_C57BL/6_3", "M_C57BL/6_4", "M_C57BL/6_5", "M_ICR_1", "M_ICR_2", "M_ICR_3", "M_ICR_4", "M_ICR_5"],
            "donorCount": 14,
            "genusSpecies": ["Homo sapiens", "Mus musculus"],
            "organismAge": [{"value": "80", "unit": "year"}],
            "organismAgeRange": [{"gte": 536112000.0, "lte": 536112000.0}, {
                "gte": 1198368000.0,
                "lte": 1198368000.0
            }, {"gte": 1608336000.0, "lte": 1608336000.0}, {"gte": 1860624000.0, "lte": 1860624000.0}],
            "biologicalSex": ["female", "male", "unknown"],
            "disease": ["normal", "type 2 diabetes mellitus"]
        }],
        "organoids": [],
        "cellSuspensions": [{
            "organ": ["pancreas"],
            "organPart": [null],
            "selectedCellType": ["pancreatic PP cell"],
            "totalCells": 12404
        }],
        "fileTypeSummaries": [{"fileType": "fastq.gz", "count": 38, "totalSize": 418064570672}]
    }, {
        "protocols": [{
            "libraryConstructionApproach": ["10X v2 sequencing", null],
            "instrumentManufacturerModel": ["Illumina HiSeq 4000", null],
            "pairedEnd": [false, null],
            "workflow": ["optimus_v1.3.5", null],
            "assayType": [null]
        }],
        "entryId": "4a95101c-9ffc-4f30-a809-f04518a23803",
        "projects": [{
            "projectTitle": "A single-cell reference map of transcriptional states for human blood and tissue T cell activation",
            "projectShortname": "HumanTissueTcellActivation",
            "laboratory": ["Farber Lab; Columbia Center for Translational Immunology", "Human Cell Atlas Data Coordination Platform", "Sims Lab; Department of Systems Biology"],
            "arrayExpressAccessions": [null],
            "geoSeriesAccessions": [null],
            "insdcProjectAccessions": [null],
            "insdcStudyAccessions": [null],
            "supplementaryLinks": [null]
        }],
        "samples": [{
            "sampleEntityType": ["specimens"],
            "effectiveOrgan": ["blood", "hematopoietic system", "lung", "mediastinal lymph node"],
            "id": ["PP001", "PP002", "PP003", "PP004", "PP005", "PP006", "PP009", "PP010", "PP011", "PP012", "PP013", "PP014", "PP017", "PP018", "PP019", "PP020"],
            "source": ["specimen_from_organism"],
            "preservationMethod": ["fresh"],
            "disease": [null],
            "organ": ["blood", "hematopoietic system", "lung", "mediastinal lymph node"],
            "organPart": ["Left lateral basal bronchopulmonary segment", "bone marrow", "mediastinal lymph node", "venous blood"]
        }],
        "specimens": [{
            "id": ["PP001", "PP002", "PP003", "PP004", "PP005", "PP006", "PP009", "PP010", "PP011", "PP012", "PP013", "PP014", "PP017", "PP018", "PP019", "PP020"],
            "organ": ["blood", "hematopoietic system", "lung", "mediastinal lymph node"],
            "organPart": ["Left lateral basal bronchopulmonary segment", "bone marrow", "mediastinal lymph node", "venous blood"],
            "disease": [null],
            "preservationMethod": ["fresh"],
            "source": ["specimen_from_organism"]
        }],
        "cellLines": [],
        "donorOrganisms": [{
            "id": ["Blood_donor_A", "Blood_donor_B", "Tissue_donor_1", "Tissue_donor_2"],
            "donorCount": 4,
            "genusSpecies": ["Homo sapiens"],
            "organismAge": [{"value": "80", "unit": "year"}],
            "organismAgeRange": [{"gte": 1639872000.0, "lte": 1639872000.0}, {
                "gte": 1576800000.0,
                "lte": 1734480000.0
            }, {"gte": 2049840000.0, "lte": 2049840000.0}],
            "biologicalSex": ["male"],
            "disease": ["hypertension", "normal"]
        }],
        "organoids": [],
        "cellSuspensions": [{
            "organ": ["lung"],
            "organPart": ["Left lateral basal bronchopulmonary segment"],
            "selectedCellType": ["T cell"],
            "totalCells": 0
        }, {
            "organ": ["blood"],
            "organPart": ["venous blood"],
            "selectedCellType": ["T cell"],
            "totalCells": 0
        }, {
            "organ": ["mediastinal lymph node"],
            "organPart": ["mediastinal lymph node"],
            "selectedCellType": ["T cell"],
            "totalCells": 0
        }, {
            "organ": ["hematopoietic system"],
            "organPart": ["bone marrow"],
            "selectedCellType": ["T cell"],
            "totalCells": 0
        }],
        "fileTypeSummaries": [{"fileType": "fastq.gz", "count": 32, "totalSize": 496164231119}, {
            "fileType": "unknown",
            "count": 80,
            "totalSize": 1497756132
        }, {"fileType": "bam", "count": 16, "totalSize": 461515369236}, {
            "fileType": "matrix",
            "count": 16,
            "totalSize": 2368
        }, {"fileType": "csv", "count": 16, "totalSize": 414889663}]
    }, {
        "protocols": [{
            "libraryConstructionApproach": ["10X v2 sequencing", null],
            "instrumentManufacturerModel": ["Illumina HiSeq 2500", null],
            "pairedEnd": [false, null],
            "workflow": ["optimus_v1.3.5", null],
            "assayType": [null]
        }],
        "entryId": "8185730f-4113-40d3-9cc3-929271784c2b",
        "projects": [{
            "projectTitle": "A single-cell transcriptome atlas of the adult human retina",
            "projectShortname": "WongAdultRetina",
            "laboratory": ["Cellular Reprogramming Unit", "Clinical Genetics Unit", "Department of Chemistry and Biotechnology", "Garvan\u2010Weizmann Centre for Cellular Genomics", "Human Cell Atlas Data Coordination Platform", "Institute for Molecular Bioscience", "John Curtin School of Medical Research", "Lions Eye Donation Services", "National Institute for Aging", "Save Sight Institute", "Stem Cells and Regenerative Medicine Section, NIHR Great Ormond Street Hospital Biomedical Research Centre"],
            "arrayExpressAccessions": ["E-MTAB-7316"],
            "geoSeriesAccessions": [null],
            "insdcProjectAccessions": [null],
            "insdcStudyAccessions": [null],
            "supplementaryLinks": ["https://github.com/IMB-Computational-Genomics-Lab/scGPS", "https://github.com/powellgenomicslab/ascend", "https://github.com/satijalab/seurat"]
        }],
        "samples": [{
            "sampleEntityType": ["specimens"],
            "effectiveOrgan": ["eye"],
            "id": ["17-010-R", "17-011-R", "SC-L"],
            "source": ["specimen_from_organism"],
            "preservationMethod": [null],
            "disease": ["normal"],
            "organ": ["eye"],
            "organPart": ["retinal neural layer"]
        }],
        "specimens": [{
            "id": ["17-010-R", "17-011-R", "SC-L"],
            "organ": ["eye"],
            "organPart": ["retinal neural layer"],
            "disease": ["normal"],
            "preservationMethod": [null],
            "source": ["specimen_from_organism"]
        }],
        "cellLines": [],
        "donorOrganisms": [{
            "id": ["17-010", "17-011", "SC"],
            "donorCount": 3,
            "genusSpecies": ["Homo sapiens"],
            "organismAge": [{"value": "80", "unit": "year"}],
            "organismAgeRange": [{"gte": 1324512000.0, "lte": 1324512000.0}, {
                "gte": 1671408000.0,
                "lte": 1671408000.0
            }, {"gte": 2522880000.0, "lte": 2522880000.0}],
            "biologicalSex": ["female", "male"],
            "disease": ["cataract (disease)", "normal"]
        }],
        "organoids": [],
        "cellSuspensions": [{
            "organ": ["eye"],
            "organPart": ["retinal neural layer"],
            "selectedCellType": [null],
            "totalCells": 44000
        }],
        "fileTypeSummaries": [{"fileType": "fastq.gz", "count": 15, "totalSize": 101869450565}, {
            "fileType": "unknown",
            "count": 25,
            "totalSize": 344662182
        }, {"fileType": "bam", "count": 5, "totalSize": 94362546462}, {
            "fileType": "matrix",
            "count": 5,
            "totalSize": 740
        }, {"fileType": "csv", "count": 5, "totalSize": 81162079}]
    }, {
        "protocols": [{
            "libraryConstructionApproach": ["10X v2 sequencing", null],
            "instrumentManufacturerModel": ["Illumina HiSeq 2500", null],
            "pairedEnd": [true, null],
            "workflow": ["optimus_v1.3.1", "optimus_v1.3.2", null],
            "assayType": [null]
        }],
        "entryId": "005d611a-14d5-4fbf-846e-571a1f874f70",
        "projects": [{
            "projectTitle": "Assessing the relevance of organoids to model inter-individual variation",
            "projectShortname": "HPSI human cerebral organoids",
            "laboratory": ["Human Cell Atlas Data Coordination Platform"],
            "arrayExpressAccessions": [null],
            "geoSeriesAccessions": [null],
            "insdcProjectAccessions": ["ERP114427"],
            "insdcStudyAccessions": ["PRJEB31821"],
            "supplementaryLinks": [null]
        }],
        "samples": [{
            "sampleEntityType": ["organoids"],
            "effectiveOrgan": ["brain"],
            "modelOrgan": ["brain"],
            "id": ["Org_HPSI0214i-kucg_2_1", "Org_HPSI0214i-kucg_2_2", "Org_HPSI0214i-kucg_2_3", "Org_HPSI0214i-wibj_2_1", "Org_HPSI0214i-wibj_2_2", "Org_HPSI0214i-wibj_2_3", "Org_HPSI0314i-hoik_1_1", "Org_HPSI0314i-hoik_1_2", "Org_HPSI0314i-hoik_1_3", "Org_HPSI0314i-sojd_3_1", "Org_HPSI0314i-sojd_3_2", "Org_HPSI0314i-sojd_3_3"],
            "modelOrganPart": [null]
        }],
        "specimens": [{
            "id": ["HPSI0214i-kucg_skin", "HPSI0214i-wibj_skin", "HPSI0314i-hoik_skin", "HPSI0314i-sojd_skin"],
            "organ": ["skin of body"],
            "organPart": ["skin epidermis"],
            "disease": ["normal"],
            "preservationMethod": [null],
            "source": ["specimen_from_organism"]
        }],
        "cellLines": [{
            "id": ["HPSI0214i-kucg_2", "HPSI0214i-wibj_2", "HPSI0314i-hoik_1", "HPSI0314i-sojd_3"],
            "cellLineType": ["induced pluripotent"],
            "modelOrgan": ["stem cell"]
        }],
        "donorOrganisms": [{
            "id": ["HPSI0214i-kucg", "HPSI0214i-wibj", "HPSI0314i-hoik", "HPSI0314i-sojd"],
            "donorCount": 4,
            "genusSpecies": ["Homo sapiens"],
            "organismAge": [{"value": "80", "unit": "year"}],
            "organismAgeRange": [{"gte": 1261440000.0, "lte": 1387584000.0}, {
                "gte": 1419120000.0,
                "lte": 1545264000.0
            }, {"gte": 1734480000.0, "lte": 1860624000.0}, {"gte": 2049840000.0, "lte": 2175984000.0}],
            "biologicalSex": ["female", "male"],
            "disease": ["normal"]
        }],
        "organoids": [{
            "id": ["Org_HPSI0214i-kucg_2_1", "Org_HPSI0214i-kucg_2_2", "Org_HPSI0214i-kucg_2_3", "Org_HPSI0214i-wibj_2_1", "Org_HPSI0214i-wibj_2_2", "Org_HPSI0214i-wibj_2_3", "Org_HPSI0314i-hoik_1_1", "Org_HPSI0314i-hoik_1_2", "Org_HPSI0314i-hoik_1_3", "Org_HPSI0314i-sojd_3_1", "Org_HPSI0314i-sojd_3_2", "Org_HPSI0314i-sojd_3_3"],
            "modelOrgan": ["brain"],
            "modelOrganPart": [null]
        }],
        "cellSuspensions": [{
            "organ": ["brain"],
            "organPart": [null],
            "selectedCellType": ["neural cell"],
            "totalCells": 19916
        }],
        "fileTypeSummaries": [{"fileType": "fastq.gz", "count": 18, "totalSize": 53857782294}, {
            "fileType": "pdf",
            "count": 3,
            "totalSize": 15762678
        }, {"fileType": "unknown", "count": 30, "totalSize": 641963142}, {
            "fileType": "bam",
            "count": 6,
            "totalSize": 56932529172
        }, {"fileType": "matrix", "count": 6, "totalSize": 888}, {
            "fileType": "csv",
            "count": 6,
            "totalSize": 154340957
        }]
    }, {
        "protocols": [{
            "libraryConstructionApproach": ["MARS-seq", null],
            "instrumentManufacturerModel": ["Illumina NextSeq 500", null],
            "pairedEnd": [true, null],
            "workflow": [null],
            "assayType": [null]
        }],
        "entryId": "a29952d9-925e-40f4-8a1c-274f118f1f51",
        "projects": [{
            "projectTitle": "Bone marrow plasma cells from hip replacement surgeries",
            "projectShortname": "BM_PC",
            "laboratory": ["Human Cell Atlas Data Coordination Platform", "Prof. Ido Amit"],
            "arrayExpressAccessions": [null],
            "geoSeriesAccessions": [null],
            "insdcProjectAccessions": [null],
            "insdcStudyAccessions": [null],
            "supplementaryLinks": [null]
        }],
        "samples": [{
            "sampleEntityType": ["specimens"],
            "effectiveOrgan": ["hematopoietic system"],
            "id": ["Hip10_specimen", "Hip11_specimen", "Hip12_specimen", "Hip13_specimen", "Hip15_specimen", "Hip16_specimen", "Hip17_specimen", "Hip5_specimen", "Hip6_specimen", "Hip7_specimen", "Hip8_specimen", "Hip9_specimen"],
            "source": ["specimen_from_organism"],
            "preservationMethod": [null],
            "disease": [null],
            "organ": ["hematopoietic system"],
            "organPart": ["bone marrow"]
        }],
        "specimens": [{
            "id": ["Hip10_specimen", "Hip11_specimen", "Hip12_specimen", "Hip13_specimen", "Hip15_specimen", "Hip16_specimen", "Hip17_specimen", "Hip5_specimen", "Hip6_specimen", "Hip7_specimen", "Hip8_specimen", "Hip9_specimen"],
            "organ": ["hematopoietic system"],
            "organPart": ["bone marrow"],
            "disease": [null],
            "preservationMethod": [null],
            "source": ["specimen_from_organism"]
        }],
        "cellLines": [],
        "donorOrganisms": [{
            "id": ["Hip10", "Hip11", "Hip12", "Hip13", "Hip15", "Hip16", "Hip17", "Hip5", "Hip6", "Hip7", "Hip8", "Hip9"],
            "donorCount": 12,
            "genusSpecies": ["Homo sapiens"],
            "organismAge": [{"value": "80", "unit": "year"}],
            "organismAgeRange": [{"gte": 1545264000.0, "lte": 1545264000.0}, {
                "gte": 1576800000.0,
                "lte": 1576800000.0
            }, {"gte": 1671408000.0, "lte": 1671408000.0}, {
                "gte": 1986768000.0,
                "lte": 1986768000.0
            }, {"gte": 2144448000.0, "lte": 2144448000.0}, {
                "gte": 2175984000.0,
                "lte": 2175984000.0
            }, {"gte": 2302128000.0, "lte": 2302128000.0}, {
                "gte": 2396736000.0,
                "lte": 2396736000.0
            }, {"gte": 2459808000.0, "lte": 2459808000.0}, {
                "gte": 2522880000.0,
                "lte": 2522880000.0
            }, {"gte": 2680560000.0, "lte": 2680560000.0}],
            "biologicalSex": ["female", "male"],
            "disease": ["osteoarthritis, hip"]
        }],
        "organoids": [],
        "cellSuspensions": [{
            "organ": ["hematopoietic system"],
            "organPart": ["bone marrow"],
            "selectedCellType": ["Plasma cell"],
            "totalCells": 9500
        }],
        "fileTypeSummaries": [{"fileType": "fastq.gz", "count": 50, "totalSize": 32304816501}, {
            "fileType": "pdf",
            "count": 2,
            "totalSize": 204869
        }]
    }, {
        "protocols": [{
            "libraryConstructionApproach": ["CITE-seq", null],
            "instrumentManufacturerModel": ["Illumina Hiseq 2500", null],
            "pairedEnd": [false, null],
            "workflow": [null],
            "assayType": [null]
        }],
        "entryId": "f81efc03-9f56-4354-aabb-6ce819c3d414",
        "projects": [{
            "projectTitle": "Cell hashing with barcoded antibodies enables multiplexing and doublet detection for single cell genomics",
            "projectShortname": "Multiplexed scRNA-seq with barcoded antibodies",
            "laboratory": ["Human Cell Atlas Data Coordination Platform", "Satija Lab", "Technology Development and Innovation"],
            "arrayExpressAccessions": [null],
            "geoSeriesAccessions": [null],
            "insdcProjectAccessions": [null],
            "insdcStudyAccessions": [null],
            "supplementaryLinks": [null]
        }],
        "samples": [{
            "sampleEntityType": ["specimens"],
            "effectiveOrgan": ["blood"],
            "id": ["Specimen_PBMC1", "Specimen_PBMC2", "Specimen_PBMC3", "Specimen_PBMC4", "Specimen_PBMC5", "Specimen_PBMC6", "Specimen_PBMC7", "Specimen_PBMC8"],
            "source": ["specimen_from_organism"],
            "preservationMethod": [null],
            "disease": [null],
            "organ": ["blood"],
            "organPart": [null]
        }],
        "specimens": [{
            "id": ["Specimen_PBMC1", "Specimen_PBMC2", "Specimen_PBMC3", "Specimen_PBMC4", "Specimen_PBMC5", "Specimen_PBMC6", "Specimen_PBMC7", "Specimen_PBMC8"],
            "organ": ["blood"],
            "organPart": [null],
            "disease": [null],
            "preservationMethod": [null],
            "source": ["specimen_from_organism"]
        }],
        "cellLines": [],
        "donorOrganisms": [{
            "id": ["Donor_PBMC1", "Donor_PBMC2", "Donor_PBMC3", "Donor_PBMC4", "Donor_PBMC5", "Donor_PBMC6", "Donor_PBMC7", "Donor_PBMC8"],
            "donorCount": 8,
            "genusSpecies": ["Homo sapiens"],
            "organismAge": [null],
            "organismAgeRange": null,
            "biologicalSex": ["unknown"],
            "disease": ["normal"]
        }],
        "organoids": [],
        "cellSuspensions": [{
            "organ": ["blood"],
            "organPart": [null],
            "selectedCellType": ["peripheral blood mononuclear cell"],
            "totalCells": 20000
        }],
        "fileTypeSummaries": [{"fileType": "fastq.gz", "count": 6, "totalSize": 83729759795}]
    }, {
        "protocols": [{
            "libraryConstructionApproach": ["10X v2 sequencing", null],
            "instrumentManufacturerModel": ["Illumina HiSeq X", null],
            "pairedEnd": [false, null],
            "workflow": ["optimus_v1.3.2", null],
            "assayType": [null]
        }],
        "entryId": "cc95ff89-2e68-4a08-a234-480eca21ce79",
        "projects": [{
            "projectTitle": "Census of Immune Cells",
            "projectShortname": "1M Immune Cells",
            "laboratory": ["Human Cell Atlas Data Coordination Platform", "Regev Lab"],
            "arrayExpressAccessions": [null],
            "geoSeriesAccessions": [null],
            "insdcProjectAccessions": [null],
            "insdcStudyAccessions": [null],
            "supplementaryLinks": [null]
        }],
        "samples": [{
            "sampleEntityType": ["specimens"],
            "effectiveOrgan": ["blood", "immune system"],
            "id": ["1_BM2", "1_BM3", "1_BM5", "1_BM6", "1_BM7", "1_CB1", "1_CB2", "1_CB3", "1_CB4", "1_CB5", "1_CB6", "2_BM1", "2_BM2", "2_BM4", "2_BM5", "2_BM7", "2_CB1", "2_CB2", "2_CB3", "2_CB4", "2_CB5", "2_CB6", "2_CB7", "2_CB8", "3_BM1", "3_BM2", "3_BM3", "3_BM5", "3_BM8", "3_CB2", "3_CB4", "3_CB5", "3_CB6", "3_CB7", "3_CB8", "4_BM1", "4_BM2", "4_BM3", "4_BM4", "4_BM5", "4_BM6", "4_CB1", "4_CB2", "4_CB3", "4_CB4", "4_CB5", "4_CB6", "4_CB7", "4_CB8", "5_BM1", "5_BM2", "5_BM3", "5_BM4", "5_BM5", "5_BM6", "5_BM7", "5_BM8", "5_CB2", "5_CB3", "5_CB6", "5_CB8", "6_BM1", "6_BM2", "6_BM5", "6_BM6", "6_BM7", "6_BM8", "6_CB1", "6_CB2", "6_CB3", "6_CB4", "6_CB8", "7_BM1", "7_BM2", "7_BM3", "7_BM4", "7_BM6", "7_BM7", "7_CB1", "7_CB2", "7_CB3", "7_CB4", "7_CB5", "7_CB7", "7_CB8", "8_BM1", "8_BM2", "8_BM3", "8_BM4", "8_BM5", "8_BM6", "8_BM7", "8_BM8", "8_CB1", "8_CB2", "8_CB3", "8_CB4", "8_CB5", "8_CB6", "8_CB7"],
            "source": ["specimen_from_organism"],
            "preservationMethod": [null],
            "disease": [null],
            "organ": ["blood", "immune system"],
            "organPart": ["bone marrow", "umbilical cord blood"]
        }],
        "specimens": [{
            "id": ["1_BM2", "1_BM3", "1_BM5", "1_BM6", "1_BM7", "1_CB1", "1_CB2", "1_CB3", "1_CB4", "1_CB5", "1_CB6", "2_BM1", "2_BM2", "2_BM4", "2_BM5", "2_BM7", "2_CB1", "2_CB2", "2_CB3", "2_CB4", "2_CB5", "2_CB6", "2_CB7", "2_CB8", "3_BM1", "3_BM2", "3_BM3", "3_BM5", "3_BM8", "3_CB2", "3_CB4", "3_CB5", "3_CB6", "3_CB7", "3_CB8", "4_BM1", "4_BM2", "4_BM3", "4_BM4", "4_BM5", "4_BM6", "4_CB1", "4_CB2", "4_CB3", "4_CB4", "4_CB5", "4_CB6", "4_CB7", "4_CB8", "5_BM1", "5_BM2", "5_BM3", "5_BM4", "5_BM5", "5_BM6", "5_BM7", "5_BM8", "5_CB2", "5_CB3", "5_CB6", "5_CB8", "6_BM1", "6_BM2", "6_BM5", "6_BM6", "6_BM7", "6_BM8", "6_CB1", "6_CB2", "6_CB3", "6_CB4", "6_CB8", "7_BM1", "7_BM2", "7_BM3", "7_BM4", "7_BM6", "7_BM7", "7_CB1", "7_CB2", "7_CB3", "7_CB4", "7_CB5", "7_CB7", "7_CB8", "8_BM1", "8_BM2", "8_BM3", "8_BM4", "8_BM5", "8_BM6", "8_BM7", "8_BM8", "8_CB1", "8_CB2", "8_CB3", "8_CB4", "8_CB5", "8_CB6", "8_CB7"],
            "organ": ["blood", "immune system"],
            "organPart": ["bone marrow", "umbilical cord blood"],
            "disease": [null],
            "preservationMethod": [null],
            "source": ["specimen_from_organism"]
        }],
        "cellLines": [],
        "donorOrganisms": [{
            "id": ["BM1", "BM2", "BM3", "BM4", "BM5", "BM6", "BM7", "BM8", "CB1", "CB2", "CB3", "CB4", "CB5", "CB6", "CB7", "CB8"],
            "donorCount": 16,
            "genusSpecies": ["Homo sapiens"],
            "organismAge": [{"value": "80", "unit": "year"}],
            "organismAgeRange": [{"gte": 0.0, "lte": 0.0}, {
                "gte": 819936000.0,
                "lte": 819936000.0
            }, {"gte": 914544000.0, "lte": 914544000.0}, {
                "gte": 1009152000.0,
                "lte": 1009152000.0
            }, {"gte": 1135296000.0, "lte": 1135296000.0}, {
                "gte": 1229904000.0,
                "lte": 1229904000.0
            }, {"gte": 1576800000.0, "lte": 1576800000.0}, {"gte": 1639872000.0, "lte": 1639872000.0}],
            "biologicalSex": ["female", "male"],
            "disease": [null]
        }],
        "organoids": [],
        "cellSuspensions": [{
            "organ": ["immune system"],
            "organPart": ["bone marrow"],
            "selectedCellType": ["bone marrow hematopoietic cell"],
            "totalCells": 274182
        }, {
            "organ": ["blood"],
            "organPart": ["umbilical cord blood"],
            "selectedCellType": ["cord blood hematopoietic stem cell"],
            "totalCells": 253910
        }],
        "fileTypeSummaries": [{
            "fileType": "fastq.gz",
            "count": 762,
            "totalSize": 1306165450414
        }, {"fileType": "unknown", "count": 635, "totalSize": 7219422047}, {
            "fileType": "bam",
            "count": 127,
            "totalSize": 1237598776632
        }, {"fileType": "matrix", "count": 127, "totalSize": 18796}, {
            "fileType": "csv",
            "count": 127,
            "totalSize": 1949971768
        }]
    }, {
        "protocols": [{
            "libraryConstructionApproach": ["DroNc-Seq", "Drop-Seq", null],
            "instrumentManufacturerModel": ["Illumina NextSeq 500", null],
            "pairedEnd": [true, null],
            "workflow": [null],
            "assayType": [null]
        }],
        "entryId": "a9c022b4-c771-4468-b769-cabcf9738de3",
        "projects": [{
            "projectTitle": "Comparison, calibration, and benchmarking of high-throughput single cell RNA-Seq techniques for unbiased cell-type classification",
            "projectShortname": "Drop-seq, DroNc-seq, Fluidigm C1 Comparison",
            "laboratory": ["Basu", "Human Cell Atlas Data Coordination Platform", "Pott"],
            "arrayExpressAccessions": [null],
            "geoSeriesAccessions": [null],
            "insdcProjectAccessions": [null],
            "insdcStudyAccessions": [null],
            "supplementaryLinks": [null]
        }],
        "samples": [{
            "sampleEntityType": ["cellLines"],
            "effectiveOrgan": ["heart", "stem cell"],
            "modelOrgan": ["heart", "stem cell"],
            "id": ["cell_line_Day0_hiPSC-CM_BioRep1", "cell_line_Day0_hiPSC-CM_BioRep2", "cell_line_Day15_hiPSC-CM_BioRep2", "cell_line_Day1_hiPSC-CM_BioRep1", "cell_line_Day1_hiPSC-CM_BioRep2", "cell_line_Day3_hiPSC-CM_BioRep1", "cell_line_Day3_hiPSC-CM_BioRep2", "cell_line_Day7_hiPSC-CM_BioRep1", "cell_line_Day7_hiPSC-CM_BioRep2"],
            "cellLineType": ["induced pluripotent", "stem cell-derived"]
        }],
        "specimens": [{
            "id": ["specimen_1", "specimen_2"],
            "organ": ["blood"],
            "organPart": ["venous blood"],
            "disease": ["normal"],
            "preservationMethod": [null],
            "source": ["specimen_from_organism"]
        }],
        "cellLines": [{
            "id": ["cell_line_Day0_hiPSC-CM_BioRep1", "cell_line_Day0_hiPSC-CM_BioRep2", "cell_line_Day15_hiPSC-CM_BioRep2", "cell_line_Day1_hiPSC-CM_BioRep1", "cell_line_Day1_hiPSC-CM_BioRep2", "cell_line_Day3_hiPSC-CM_BioRep1", "cell_line_Day3_hiPSC-CM_BioRep2", "cell_line_Day7_hiPSC-CM_BioRep1", "cell_line_Day7_hiPSC-CM_BioRep2", "cell_line_GM18505", "cell_line_GM18517"],
            "cellLineType": ["induced pluripotent", "primary", "stem cell-derived"],
            "modelOrgan": ["blood", "heart", "stem cell"]
        }],
        "donorOrganisms": [{
            "id": ["GM18505", "GM18517"],
            "donorCount": 2,
            "genusSpecies": ["Homo sapiens"],
            "organismAge": [null],
            "organismAgeRange": null,
            "biologicalSex": ["female"],
            "disease": ["normal"]
        }],
        "organoids": [],
        "cellSuspensions": [{
            "organ": ["heart"],
            "organPart": [null],
            "selectedCellType": [null],
            "totalCells": 0
        }, {"organ": ["stem cell"], "organPart": [null], "selectedCellType": [null], "totalCells": 0}],
        "fileTypeSummaries": [{"fileType": "fastq.gz", "count": 44, "totalSize": 158079432433}]
    }, {
        "protocols": [{
            "libraryConstructionApproach": ["10X v2 sequencing", null],
            "instrumentManufacturerModel": ["Illumina Hiseq 2500", null],
            "pairedEnd": [false, null],
            "workflow": ["optimus_v1.3.5", null],
            "assayType": [null]
        }],
        "entryId": "4d6f6c96-2a83-43d8-8fe1-0f53bffd4674",
        "projects": [{
            "projectTitle": "Dissecting the human liver cellular landscape by single cell RNA-seq reveals novel intrahepatic monocyte/ macrophage populations",
            "projectShortname": "SingleCellLiverLandscape",
            "laboratory": ["Adeyi", "Bader", "Fish", "Ghanekar", "Grant", "Greig", "Human Cell Atlas Data Coordination Platform", "Keller", "MacParland", "McGilvray", "Sapisochin", "Selzner", "Wilson", "Winegarden"],
            "arrayExpressAccessions": [null],
            "geoSeriesAccessions": ["GSE115469"],
            "insdcProjectAccessions": ["SRP149989"],
            "insdcStudyAccessions": ["PRJNA475114"],
            "supplementaryLinks": ["https://github.com/BaderLab/HumanLiver"]
        }],
        "samples": [{
            "sampleEntityType": ["specimens"],
            "effectiveOrgan": ["liver"],
            "id": ["P1TLH_liver", "P2TLH_liver", "P3TLH_liver", "P4TLH_liver", "P5TLH_liver"],
            "source": ["specimen_from_organism"],
            "preservationMethod": [null],
            "disease": ["normal"],
            "organ": ["liver"],
            "organPart": ["caudate lobe"]
        }],
        "specimens": [{
            "id": ["P1TLH_liver", "P2TLH_liver", "P3TLH_liver", "P4TLH_liver", "P5TLH_liver"],
            "organ": ["liver"],
            "organPart": ["caudate lobe"],
            "disease": ["normal"],
            "preservationMethod": [null],
            "source": ["specimen_from_organism"]
        }],
        "cellLines": [],
        "donorOrganisms": [{
            "id": ["P1TLH", "P2TLH", "P3TLH", "P4TLH", "P5TLH"],
            "donorCount": 5,
            "genusSpecies": ["Homo sapiens"],
            "organismAge": [{"value": "80", "unit": "year"}],
            "organismAgeRange": [{"gte": 662256000.0, "lte": 662256000.0}, {
                "gte": 819936000.0,
                "lte": 819936000.0
            }, {"gte": 1292976000.0, "lte": 1292976000.0}, {
                "gte": 1387584000.0,
                "lte": 1387584000.0
            }, {"gte": 2049840000.0, "lte": 2049840000.0}],
            "biologicalSex": ["female", "male"],
            "disease": ["normal"]
        }],
        "organoids": [],
        "cellSuspensions": [{
            "organ": ["liver"],
            "organPart": ["caudate lobe"],
            "selectedCellType": [null],
            "totalCells": 30000
        }],
        "fileTypeSummaries": [{"fileType": "fastq.gz", "count": 120, "totalSize": 258844470961}, {
            "fileType": "unknown",
            "count": 25,
            "totalSize": 503179820
        }, {"fileType": "bam", "count": 5, "totalSize": 255773594927}, {
            "fileType": "matrix",
            "count": 5,
            "totalSize": 740
        }, {"fileType": "csv", "count": 5, "totalSize": 152063439}]
    }, {
        "protocols": [{
            "libraryConstructionApproach": ["10X v2 sequencing", "DNA library construction", "cDNA library construction", null],
            "instrumentManufacturerModel": ["Illumina HiSeq 4000", "Illumina HiSeq X", null],
            "pairedEnd": [false, true, null],
            "workflow": ["optimus_v1.3.5", null],
            "assayType": [null]
        }],
        "entryId": "c4077b3c-5c98-4d26-a614-246d12c2e5d7",
        "projects": [{
            "projectTitle": "Ischaemic sensitivity of human tissue by single cell RNA seq",
            "projectShortname": "TissueStability",
            "laboratory": ["CGaP", "Cambridge Biorepository for Translational Medicine", "Human Cell Atlas (Mike Stubbington)", "Human Cell Atlas (Sarah Teichmann)", "Human Cell Atlas Data Coordination Platform", "Human Cell Atlas UK", "Molecular Immunity Unit, Department of Medicine", "Oliver Stegle Group", "Rebecca Fitzgerald", "Sarah Teichmann Lab"],
            "arrayExpressAccessions": [null],
            "geoSeriesAccessions": [null],
            "insdcProjectAccessions": ["ERP114453"],
            "insdcStudyAccessions": ["PRJEB31843"],
            "supplementaryLinks": ["https://www.tissuestabilitycellatlas.org/"]
        }],
        "samples": [{
            "sampleEntityType": ["specimens"],
            "effectiveOrgan": ["esophagus", "lung", "spleen"],
            "id": ["302C72hSplBulkRNA", "302CFrSplBulkRNA", "325C-WGS", "325C12hSplBulkRNA", "325C24hOesophagusBulkRNA", "325C72hOesophagusBulkRNA", "325C72hSplBulkRNA", "325CFrSplBulkRNA", "325CFreshOesophagusBulkRNA", "328C24hOesophagusBulkRNA", "328C72hOesophagusBulkRNA", "328CFreshOesophagusBulkRNA", "337C-WGS", "337C12hSplBulkRNA", "337CClinSplBulkRNA", "343BClinLngBulkRNA", "343BFrLngBulkRNA", "356C-WGS", "356C12hLngBulkRNA", "356C12hOesophagusBulkRNA", "356C24hSplBulkRNA", "356C72hLngBulkRNA", "356C72hSplBulkRNA", "362C24hOesophagusBulkRNA", "362C72hOesophagusBulkRNA", "367C-WGS", "367C12hOesophagusBulkRNA", "367C24hOesophagusBulkRNA", "367C72hLngBulkRNA", "367C72hOesophagusBulkRNA", "367CClinLngBulkRNA", "367CFrLngBulkRNA", "368C-WGS", "368C24hLngBulkRNA", "368CClinLngBulkRNA", "368CFrLngBulkRNA", "376CClinLngBulkRNA", "376CFrLngBulkRNA", "386C-WGS", "386C12hLngBulkRNA", "390C12hLngBulkRNA", "390C24LngBulkRNA", "390C72hLngBulkRNA", "390CClinLngBulkRNA", "390CFrLngBulkRNA", "A1-Spl-0-TL5", "A1-Spl-0-TL8-1", "A12-OES-0-TL2-1", "A12-OES-0-TL3-1", "A12-OES-0-TL4-1", "A12-Oes-0-TL1", "A12-Spl-0-TL3-1", "A12-Spl-0-TL4-1", "A15-OES-0-TL2-1", "A15-OES-0-TL3-1", "A15-OES-0-TL4-1", "A16-Spl-0-TL1", "A16-Spl-0-TL2-1", "A16-Spl-0-TL3-1", "A16-Spl-0-TL4-1", "A17-Lng-0-TL1-1", "A17-Lng-0-TL2-1", "A17-Lng-0-TL3-1", "A21-Lng-1-SC-1", "A21-Lng-2-SC-1", "A21-Lng-3-SC-1", "A21-Lng-4-SC-1", "A21-OES-1-SC-1", "A21-OES-2-SC-1", "A21-OES-3-SC-1", "A21-Spl-1-SC-1", "A21-Spl-3-SC-1", "A21-Spl-4-SC-1", "A23-OES--SC-1", "A23-OES--SC-2", "A23-OES--SC-3", "A23-OES--SC-4", "A25-LNG-0-SC-1", "A25-LNG-0-SC-2", "A25-LNG-0-SC-3", "A25-LNG-0-SC-4", "A25-OES-0-SC-1", "A25-OES-0-SC-2", "A25-OES-0-SC-4", "A26-LNG-0-SC-1", "A26-LNG-0-SC-2", "A26-LNG-0-SC-3", "A26-LNG-0-SC-4", "A27-LNG-0-SC-1", "A27-LNG-0-SC-2", "A27-LNG-0-SC-3", "A27-LNG-0-SC-4", "A28-LNG-1-SC-1", "A29-LNG-0-SC-2", "A29-LNG-0-SC-3", "A29-LNG-0-SC-4", "A6-OES-1-TL2-1", "A6-OES-1-TL3-1", "A8-Spl-0-TL-0h", "A8-Spl-0-TL-24h-1"],
            "source": ["specimen_from_organism"],
            "preservationMethod": ["cryopreservation, other", "hypothermic preservation media at 2-8C"],
            "disease": [null],
            "organ": ["esophagus", "lung", "spleen"],
            "organPart": ["esophagus mucosa", "lower lobe of left lung", "lower lobe of right lung", "lung parenchyma", null]
        }],
        "specimens": [{
            "id": ["302C72hSplBulkRNA", "302CFrSplBulkRNA", "325C-WGS", "325C12hSplBulkRNA", "325C24hOesophagusBulkRNA", "325C72hOesophagusBulkRNA", "325C72hSplBulkRNA", "325CFrSplBulkRNA", "325CFreshOesophagusBulkRNA", "328C24hOesophagusBulkRNA", "328C72hOesophagusBulkRNA", "328CFreshOesophagusBulkRNA", "337C-WGS", "337C12hSplBulkRNA", "337CClinSplBulkRNA", "343BClinLngBulkRNA", "343BFrLngBulkRNA", "356C-WGS", "356C12hLngBulkRNA", "356C12hOesophagusBulkRNA", "356C24hSplBulkRNA", "356C72hLngBulkRNA", "356C72hSplBulkRNA", "362C24hOesophagusBulkRNA", "362C72hOesophagusBulkRNA", "367C-WGS", "367C12hOesophagusBulkRNA", "367C24hOesophagusBulkRNA", "367C72hLngBulkRNA", "367C72hOesophagusBulkRNA", "367CClinLngBulkRNA", "367CFrLngBulkRNA", "368C-WGS", "368C24hLngBulkRNA", "368CClinLngBulkRNA", "368CFrLngBulkRNA", "376CClinLngBulkRNA", "376CFrLngBulkRNA", "386C-WGS", "386C12hLngBulkRNA", "390C12hLngBulkRNA", "390C24LngBulkRNA", "390C72hLngBulkRNA", "390CClinLngBulkRNA", "390CFrLngBulkRNA", "A1-Spl-0-TL5", "A1-Spl-0-TL8-1", "A12-OES-0-TL2-1", "A12-OES-0-TL3-1", "A12-OES-0-TL4-1", "A12-Oes-0-TL1", "A12-Spl-0-TL3-1", "A12-Spl-0-TL4-1", "A15-OES-0-TL2-1", "A15-OES-0-TL3-1", "A15-OES-0-TL4-1", "A16-Spl-0-TL1", "A16-Spl-0-TL2-1", "A16-Spl-0-TL3-1", "A16-Spl-0-TL4-1", "A17-Lng-0-TL1-1", "A17-Lng-0-TL2-1", "A17-Lng-0-TL3-1", "A21-Lng-1-SC-1", "A21-Lng-2-SC-1", "A21-Lng-3-SC-1", "A21-Lng-4-SC-1", "A21-OES-1-SC-1", "A21-OES-2-SC-1", "A21-OES-3-SC-1", "A21-Spl-1-SC-1", "A21-Spl-3-SC-1", "A21-Spl-4-SC-1", "A23-OES--SC-1", "A23-OES--SC-2", "A23-OES--SC-3", "A23-OES--SC-4", "A25-LNG-0-SC-1", "A25-LNG-0-SC-2", "A25-LNG-0-SC-3", "A25-LNG-0-SC-4", "A25-OES-0-SC-1", "A25-OES-0-SC-2", "A25-OES-0-SC-4", "A26-LNG-0-SC-1", "A26-LNG-0-SC-2", "A26-LNG-0-SC-3", "A26-LNG-0-SC-4", "A27-LNG-0-SC-1", "A27-LNG-0-SC-2", "A27-LNG-0-SC-3", "A27-LNG-0-SC-4", "A28-LNG-1-SC-1", "A29-LNG-0-SC-2", "A29-LNG-0-SC-3", "A29-LNG-0-SC-4", "A6-OES-1-TL2-1", "A6-OES-1-TL3-1", "A8-Spl-0-TL-0h", "A8-Spl-0-TL-24h-1"],
            "organ": ["esophagus", "lung", "spleen"],
            "organPart": ["esophagus mucosa", "lower lobe of left lung", "lower lobe of right lung", "lung parenchyma", null],
            "disease": [null],
            "preservationMethod": ["cryopreservation, other", "hypothermic preservation media at 2-8C"],
            "source": ["specimen_from_organism"]
        }],
        "cellLines": [],
        "donorOrganisms": [{
            "id": ["CBTM-284C", "CBTM-296C", "CBTM-302C", "CBTM-325C", "CBTM-328C", "CBTM-337C", "CBTM-343B", "CBTM-356C", "CBTM-362C", "CBTM-367C", "CBTM-368C", "CBTM-376C", "CBTM-386C", "CBTM-390C"],
            "donorCount": 14,
            "genusSpecies": ["Homo sapiens"],
            "organismAge": [{"value": "80", "unit": "year"}],
            "organismAgeRange": [{"gte": 630720000.0, "lte": 788400000.0}, {
                "gte": 946080000.0,
                "lte": 1103760000.0
            }, {"gte": 1103760000.0, "lte": 1261440000.0}, {
                "gte": 1261440000.0,
                "lte": 1419120000.0
            }, {"gte": 1576800000.0, "lte": 1734480000.0}, {
                "gte": 1734480000.0,
                "lte": 1892160000.0
            }, {"gte": 1892160000.0, "lte": 2049840000.0}, {
                "gte": 2049840000.0,
                "lte": 2207520000.0
            }, {"gte": 2207520000.0, "lte": 2365200000.0}],
            "biologicalSex": ["female", "male"],
            "disease": ["normal"]
        }],
        "organoids": [],
        "cellSuspensions": [{
            "organ": ["esophagus"],
            "organPart": ["esophagus mucosa"],
            "selectedCellType": ["epithelial cell of esophagus"],
            "totalCells": 93267
        }, {
            "organ": ["spleen"],
            "organPart": [null],
            "selectedCellType": ["splenocyte"],
            "totalCells": 66553
        }, {
            "organ": ["lung"],
            "organPart": ["lower lobe of left lung", "lower lobe of right lung", "lung parenchyma"],
            "selectedCellType": [null],
            "totalCells": 40025
        }],
        "fileTypeSummaries": [{"fileType": "fastq.gz", "count": 361, "totalSize": 3151293835880}, {
            "fileType": "pdf",
            "count": 6,
            "totalSize": 8420344
        }, {"fileType": "docx", "count": 1, "totalSize": 37704}, {
            "fileType": "csv",
            "count": 68,
            "totalSize": 1671000803
        }, {"fileType": "csv.gz", "count": 134, "totalSize": 2283515049}, {
            "fileType": "npz",
            "count": 67,
            "totalSize": 1652519195
        }, {"fileType": "npy", "count": 134, "totalSize": 2026654272}, {
            "fileType": "bam",
            "count": 67,
            "totalSize": 1312285234076
        }, {"fileType": "matrix", "count": 67, "totalSize": 9916}]
    }, {
        "protocols": [{
            "libraryConstructionApproach": ["Smart-seq2", null],
            "instrumentManufacturerModel": ["Illumina HiSeq 2500", null],
            "pairedEnd": [false, null],
            "workflow": [null],
            "assayType": [null]
        }],
        "entryId": "90bd6933-40c0-48d4-8d76-778c103bf545",
        "projects": [{
            "projectTitle": "Precursors of human CD4+ cytotoxic T lymphocytes identified by single-cell transcriptome analysis",
            "projectShortname": "CD4+ cytotoxic T lymphocytes",
            "laboratory": ["Division of Vaccine Discovery", "Human Cell Atlas Data Coordination Platform", "Molecular Atlas"],
            "arrayExpressAccessions": [null],
            "geoSeriesAccessions": ["GSE106540"],
            "insdcProjectAccessions": ["SRP124157"],
            "insdcStudyAccessions": ["PRJNA417191"],
            "supplementaryLinks": ["https://www.ebi.ac.uk/gxa/sc/experiments/E-GEOD-106540/Results"]
        }],
        "samples": [{
            "sampleEntityType": ["specimens"],
            "effectiveOrgan": ["blood"],
            "id": ["Subject10_DENV negative_PBMC_TEMRA", "Subject11_DENV positive_PBMC_TEMRA", "Subject12_DENV positive_PBMC_TCM", "Subject12_DENV positive_PBMC_TEM", "Subject12_DENV positive_PBMC_TEMRA", "Subject13_DENV positive_PBMC_DENV antigen specific TEMRA", "Subject13_DENV positive_PBMC_TEMRA", "Subject14_DENV positive_PBMC_DENV antigen specific TEMRA", "Subject14_DENV positive_PBMC_TEMRA", "Subject15_DENV positive_PBMC_DENV antigen specific TEMRA", "Subject15_DENV positive_PBMC_TEMRA", "Subject16_DENV negative_PBMC_IL7Rhigh_TEMRA", "Subject16_DENV negative_PBMC_IL7Rlow_TEMRA", "Subject1_DENV negative_PBMC_TEMRA", "Subject2_DENV negative_PBMC_TEMRA", "Subject3_DENV positive_PBMC_TCM", "Subject3_DENV positive_PBMC_TEM", "Subject3_DENV positive_PBMC_TEMRA", "Subject4_DENV negative_PBMC_TEMRA", "Subject5_DENV positive_PBMC_TEMRA", "Subject6_DENV positive_PBMC_DENV antigen specific TEM", "Subject6_DENV positive_PBMC_DENV antigen specific TEMRA", "Subject6_DENV positive_PBMC_TCM", "Subject6_DENV positive_PBMC_TEM", "Subject6_DENV positive_PBMC_TEMRA", "Subject7_DENV negative_PBMC_TEMRA", "Subject8_DENV positive_PBMC_TEMRA", "Subject9_DENV negative_PBMC_TEMRA"],
            "source": ["specimen_from_organism"],
            "preservationMethod": ["cryopreservation, other"],
            "disease": [null],
            "organ": ["blood"],
            "organPart": ["peripheral blood mononuclear cell"]
        }],
        "specimens": [{
            "id": ["Subject10_DENV negative_PBMC_TEMRA", "Subject11_DENV positive_PBMC_TEMRA", "Subject12_DENV positive_PBMC_TCM", "Subject12_DENV positive_PBMC_TEM", "Subject12_DENV positive_PBMC_TEMRA", "Subject13_DENV positive_PBMC_DENV antigen specific TEMRA", "Subject13_DENV positive_PBMC_TEMRA", "Subject14_DENV positive_PBMC_DENV antigen specific TEMRA", "Subject14_DENV positive_PBMC_TEMRA", "Subject15_DENV positive_PBMC_DENV antigen specific TEMRA", "Subject15_DENV positive_PBMC_TEMRA", "Subject16_DENV negative_PBMC_IL7Rhigh_TEMRA", "Subject16_DENV negative_PBMC_IL7Rlow_TEMRA", "Subject1_DENV negative_PBMC_TEMRA", "Subject2_DENV negative_PBMC_TEMRA", "Subject3_DENV positive_PBMC_TCM", "Subject3_DENV positive_PBMC_TEM", "Subject3_DENV positive_PBMC_TEMRA", "Subject4_DENV negative_PBMC_TEMRA", "Subject5_DENV positive_PBMC_TEMRA", "Subject6_DENV positive_PBMC_DENV antigen specific TEM", "Subject6_DENV positive_PBMC_DENV antigen specific TEMRA", "Subject6_DENV positive_PBMC_TCM", "Subject6_DENV positive_PBMC_TEM", "Subject6_DENV positive_PBMC_TEMRA", "Subject7_DENV negative_PBMC_TEMRA", "Subject8_DENV positive_PBMC_TEMRA", "Subject9_DENV negative_PBMC_TEMRA"],
            "organ": ["blood"],
            "organPart": ["peripheral blood mononuclear cell"],
            "disease": [null],
            "preservationMethod": ["cryopreservation, other"],
            "source": ["specimen_from_organism"]
        }],
        "cellLines": [],
        "donorOrganisms": [{
            "id": ["Subject1", "Subject10", "Subject11", "Subject12", "Subject13", "Subject14", "Subject15", "Subject16", "Subject2", "Subject3", "Subject4", "Subject5", "Subject6", "Subject7", "Subject8", "Subject9"],
            "donorCount": 16,
            "genusSpecies": ["Homo sapiens"],
            "organismAge": [{"value": "80", "unit": "year"}],
            "organismAgeRange": [{"gte": 567648000.0, "lte": 1892160000.0}],
            "biologicalSex": ["unknown"],
            "disease": ["asymptomatic dengue", "normal"]
        }],
        "organoids": [],
        "cellSuspensions": [{
            "organ": ["blood"],
            "organPart": ["peripheral blood mononuclear cell"],
            "selectedCellType": ["CD8-positive, alpha-beta T cell", "effector memory CD8-positive, alpha-beta T cell, terminally differentiated"],
            "totalCells": 2244
        }],
        "fileTypeSummaries": [{"fileType": "fastq.gz", "count": 2244, "totalSize": 80050236577}]
    }, {
        "protocols": [{
            "libraryConstructionApproach": ["10X v2 sequencing", null],
            "instrumentManufacturerModel": ["Illumina HiSeq 2500", null],
            "pairedEnd": [false, null],
            "workflow": ["optimus_v1.3.1", null],
            "assayType": [null]
        }],
        "entryId": "091cf39b-01bc-42e5-9437-f419a66c8a45",
        "projects": [{
            "projectTitle": "Profiling of CD34+ cells from human bone marrow to understand hematopoiesis",
            "projectShortname": "Human Hematopoietic Profiling",
            "laboratory": ["Human Cell Atlas Data Coordination Platform", "Pe'er"],
            "arrayExpressAccessions": [null],
            "geoSeriesAccessions": [null],
            "insdcProjectAccessions": [null],
            "insdcStudyAccessions": [null],
            "supplementaryLinks": [null]
        }],
        "samples": [{
            "sampleEntityType": ["cellLines"],
            "effectiveOrgan": ["hematopoietic system"],
            "modelOrgan": ["hematopoietic system"],
            "id": ["HS_BM_1_cell_line", "HS_BM_2_cell_line", "HS_BM_3_cell_line"],
            "cellLineType": ["stem cell"]
        }],
        "specimens": [{
            "id": ["HS_BM_1_specimen", "HS_BM_2_specimen", "HS_BM_3_specimen"],
            "organ": ["hematopoietic system"],
            "organPart": ["bone marrow"],
            "disease": ["normal"],
            "preservationMethod": ["cryopreservation of live cells in liquid nitrogen"],
            "source": ["specimen_from_organism"]
        }],
        "cellLines": [{
            "id": ["HS_BM_1_cell_line", "HS_BM_2_cell_line", "HS_BM_3_cell_line"],
            "cellLineType": ["stem cell"],
            "modelOrgan": ["hematopoietic system"]
        }],
        "donorOrganisms": [{
            "id": ["HS_BM_1", "HS_BM_2", "HS_BM_3"],
            "donorCount": 3,
            "genusSpecies": ["Homo sapiens"],
            "organismAge": [{"value": "80", "unit": "year"}],
            "organismAgeRange": [{"gte": 599184000.0, "lte": 599184000.0}, {
                "gte": 883008000.0,
                "lte": 883008000.0
            }, {"gte": 1103760000.0, "lte": 1103760000.0}],
            "biologicalSex": ["female", "male"],
            "disease": ["normal"]
        }],
        "organoids": [],
        "cellSuspensions": [{
            "organ": ["hematopoietic system"],
            "organPart": [null],
            "selectedCellType": ["CD34-positive, CD38-negative hematopoietic stem cell"],
            "totalCells": 1480000
        }],
        "fileTypeSummaries": [{"fileType": "fastq.gz", "count": 24, "totalSize": 106097400109}, {
            "fileType": "unknown",
            "count": 45,
            "totalSize": 658015719
        }, {"fileType": "bam", "count": 9, "totalSize": 127992741114}, {
            "fileType": "matrix",
            "count": 9,
            "totalSize": 1332
        }, {"fileType": "csv", "count": 9, "totalSize": 159860436}]
    }, {
        "protocols": [{
            "libraryConstructionApproach": ["10X v2 sequencing", "Smart-seq2", null],
            "instrumentManufacturerModel": ["Illumina HiSeq 2000", "Illumina HiSeq 4000", null],
            "pairedEnd": [false, true, null],
            "workflow": ["optimus_v1.3.1", "optimus_v1.3.2", "optimus_v1.3.3", "smartseq2_v2.3.0", "smartseq2_v2.4.0", null],
            "assayType": [null]
        }],
        "entryId": "f83165c5-e2ea-4d15-a5cf-33f3550bffde",
        "projects": [{
            "projectTitle": "Reconstructing the human first trimester fetal-maternal interface using single cell transcriptomics",
            "projectShortname": "Fetal/Maternal Interface",
            "laboratory": ["ArrayExpress", "Centre for Trophoblast Research", "Human Cell Atlas Data Coordination Platform", "Institute of Cellular Medicine"],
            "arrayExpressAccessions": ["E-MTAB-6678", "E-MTAB-6701"],
            "geoSeriesAccessions": [null],
            "insdcProjectAccessions": ["ERP107748", "ERP110450"],
            "insdcStudyAccessions": ["PRJEB25794", "PRJEB28266"],
            "supplementaryLinks": ["https://www.ebi.ac.uk/arrayexpress/experiments/E-MTAB-6678/", "https://www.ebi.ac.uk/arrayexpress/experiments/E-MTAB-6701/", "https://www.ebi.ac.uk/ena/data/view/PRJEB25794", "https://www.ebi.ac.uk/ena/data/view/PRJEB28266"]
        }],
        "samples": [{
            "sampleEntityType": ["specimens"],
            "effectiveOrgan": ["blood", "decidua", "placenta"],
            "id": ["blood_from_donor_D4", "blood_from_donor_D5", "decidua_from_donor_D1", "decidua_from_donor_D2", "decidua_from_donor_D3", "decidua_from_donor_D4", "decidua_from_donor_D5", "decidua_sample_10", "decidua_sample_12", "decidua_sample_6", "decidua_sample_7", "decidua_sample_8", "decidua_sample_9", "peripheral_blood_sample_6", "peripheral_blood_sample_7", "peripheral_blood_sample_8", "peripheral_blood_sample_9", "placenta_sample_101", "placenta_sample_111", "placenta_sample_121", "placenta_sample_81", "placenta_sample_91"],
            "source": ["specimen_from_organism"],
            "preservationMethod": ["fresh"],
            "disease": ["normal", "orofaciodigital syndrome VIII"],
            "organ": ["blood", "decidua", "placenta"],
            "organPart": [null]
        }],
        "specimens": [{
            "id": ["blood_from_donor_D4", "blood_from_donor_D5", "decidua_from_donor_D1", "decidua_from_donor_D2", "decidua_from_donor_D3", "decidua_from_donor_D4", "decidua_from_donor_D5", "decidua_sample_10", "decidua_sample_12", "decidua_sample_6", "decidua_sample_7", "decidua_sample_8", "decidua_sample_9", "peripheral_blood_sample_6", "peripheral_blood_sample_7", "peripheral_blood_sample_8", "peripheral_blood_sample_9", "placenta_sample_101", "placenta_sample_111", "placenta_sample_121", "placenta_sample_81", "placenta_sample_91"],
            "organ": ["blood", "decidua", "placenta"],
            "organPart": [null],
            "disease": ["normal", "orofaciodigital syndrome VIII"],
            "preservationMethod": ["fresh"],
            "source": ["specimen_from_organism"]
        }],
        "cellLines": [],
        "donorOrganisms": [{
            "id": ["D1", "D10", "D101", "D111", "D12", "D121", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D81", "D9", "D91"],
            "donorCount": 16,
            "genusSpecies": ["Homo sapiens"],
            "organismAge": [null],
            "organismAgeRange": null,
            "biologicalSex": ["female", "male", "unknown"],
            "disease": ["normal", "orofaciodigital syndrome VIII"]
        }],
        "organoids": [],
        "cellSuspensions": [{
            "organ": ["blood"],
            "organPart": [null],
            "selectedCellType": ["T cell", "myeloid cell", "natural killer cell", "peripheral blood mononuclear cell"],
            "totalCells": 0
        }, {
            "organ": ["decidua"],
            "organPart": [null],
            "selectedCellType": ["CD45-", "HLAG+", "T cell", "leukocyte", "myeloid cell", "natural killer cell"],
            "totalCells": 0
        }, {
            "organ": ["placenta"],
            "organPart": [null],
            "selectedCellType": ["Epcam+", "HLAG+", "live"],
            "totalCells": 0
        }],
        "fileTypeSummaries": [{"fileType": "fastq.gz", "count": 15287, "totalSize": 1510927190031}, {
            "fileType": "txt",
            "count": 37985,
            "totalSize": 149206433
        }, {"fileType": "csv", "count": 53210, "totalSize": 1562608686}, {
            "fileType": "bam",
            "count": 15225,
            "totalSize": 2258449273058
        }, {"fileType": "bai", "count": 7597, "totalSize": 13687204032}, {
            "fileType": "results",
            "count": 15194,
            "totalSize": 201260881736
        }, {"fileType": "matrix", "count": 7628, "totalSize": 1128944}, {
            "fileType": "unknown",
            "count": 155,
            "totalSize": 2953359305
        }]
    }, {
        "protocols": [{
            "libraryConstructionApproach": ["inDrop", null],
            "instrumentManufacturerModel": ["Illumina HiSeq 2500", "Illumina NextSeq 500", null],
            "pairedEnd": [true, null],
            "workflow": [null],
            "assayType": [null]
        }],
        "entryId": "027c51c6-0719-469f-a7f5-640fe57cbece",
        "projects": [{
            "projectTitle": "Single Cell Transcriptomics of a Human Kidney Allograft Biopsy Defines a Diverse Inflammatory Response",
            "projectShortname": "Kidney biopsy scRNA-seq",
            "laboratory": ["Human Cell Atlas Data Coordination Platform", "The Humphreys' Lab"],
            "arrayExpressAccessions": [null],
            "geoSeriesAccessions": [null],
            "insdcProjectAccessions": [null],
            "insdcStudyAccessions": [null],
            "supplementaryLinks": [null]
        }],
        "samples": [{
            "sampleEntityType": ["specimens"],
            "effectiveOrgan": ["kidney"],
            "id": ["BxA14_specimen"],
            "source": ["specimen_from_organism"],
            "preservationMethod": ["fresh"],
            "disease": ["end stage renal failure", "hemolytic-uremic syndrome"],
            "organ": ["kidney"],
            "organPart": ["cortex of kidney"]
        }],
        "specimens": [{
            "id": ["BxA14_specimen"],
            "organ": ["kidney"],
            "organPart": ["cortex of kidney"],
            "disease": ["end stage renal failure", "hemolytic-uremic syndrome"],
            "preservationMethod": ["fresh"],
            "source": ["specimen_from_organism"]
        }],
        "cellLines": [],
        "donorOrganisms": [{
            "id": ["donor_BxA14"],
            "donorCount": 1,
            "genusSpecies": ["Homo sapiens"],
            "organismAge": [{"value": "80", "unit": "year"}],
            "organismAgeRange": [{"gte": 662256000.0, "lte": 662256000.0}],
            "biologicalSex": ["male"],
            "disease": ["end stage renal failure", "hemolytic-uremic syndrome"]
        }],
        "organoids": [],
        "cellSuspensions": [{
            "organ": ["kidney"],
            "organPart": ["cortex of kidney"],
            "selectedCellType": ["endothelial cell", "epithelial cell", "fibroblast", "monocyte", "myofibroblast cell"],
            "totalCells": 4000
        }],
        "fileTypeSummaries": [{"fileType": "fastq.gz", "count": 14, "totalSize": 47431062150}, {
            "fileType": "pdf",
            "count": 4,
            "totalSize": 22053225
        }]
    }, {
        "protocols": [{
            "libraryConstructionApproach": ["10X v2 sequencing", null],
            "instrumentManufacturerModel": ["Illumina NextSeq 500", null],
            "pairedEnd": [false, null],
            "workflow": ["optimus_v1.3.5", null],
            "assayType": [null]
        }],
        "entryId": "116965f3-f094-4769-9d28-ae675c1b569c",
        "projects": [{
            "projectTitle": "Single cell profiling of human induced dendritic cells generated by direct reprogramming of embryonic fibroblasts",
            "projectShortname": "Reprogrammed_Dendritic_Cells",
            "laboratory": ["Center for Neurobiology and Brain Restoration", "Department of Laboratory Medicine", "Human Cell Atlas Data coordination Platform"],
            "arrayExpressAccessions": [null],
            "geoSeriesAccessions": [null],
            "insdcProjectAccessions": [null],
            "insdcStudyAccessions": [null],
            "supplementaryLinks": [null]
        }],
        "samples": [{
            "sampleEntityType": ["cellLines", "specimens"],
            "effectiveOrgan": ["embryo", "immune system"],
            "id": ["Cell_line_1", "Cell_line_2", "Specimen1"],
            "cellLineType": ["primary", null],
            "source": ["specimen_from_organism", null],
            "disease": ["normal", null],
            "preservationMethod": [null],
            "organPart": ["skin epidermis", null],
            "organ": ["embryo", null],
            "modelOrgan": ["immune system", null]
        }],
        "specimens": [{
            "id": ["Specimen1"],
            "organ": ["embryo"],
            "organPart": ["skin epidermis"],
            "disease": ["normal"],
            "preservationMethod": [null],
            "source": ["specimen_from_organism"]
        }],
        "cellLines": [{
            "id": ["Cell_line_1", "Cell_line_2"],
            "cellLineType": ["primary"],
            "modelOrgan": ["immune system"]
        }],
        "donorOrganisms": [{
            "id": ["Donor1"],
            "donorCount": 1,
            "genusSpecies": ["Homo sapiens"],
            "organismAge": [null],
            "organismAgeRange": null,
            "biologicalSex": ["unknown"],
            "disease": ["normal"]
        }],
        "organoids": [],
        "cellSuspensions": [{
            "organ": ["embryo"],
            "organPart": ["skin epidermis"],
            "selectedCellType": ["embryonic fibroblast"],
            "totalCells": 0
        }, {
            "organ": ["embryo", "immune system"],
            "organPart": ["skin epidermis", null],
            "selectedCellType": ["dendritic cell"],
            "totalCells": 0
        }],
        "fileTypeSummaries": [{"fileType": "fastq.gz", "count": 36, "totalSize": 50140859942}, {
            "fileType": "unknown",
            "count": 15,
            "totalSize": 212437849
        }, {"fileType": "bam", "count": 3, "totalSize": 45541025177}, {
            "fileType": "matrix",
            "count": 3,
            "totalSize": 444
        }, {"fileType": "csv", "count": 3, "totalSize": 60478271}]
    }],
    "pagination": {
        "count": 15,
        "current_page": 1,
        "last_page": 2,
        "next": "foo",
        "previous": "bar",
        "total": 23,
        "size": 15,
        "search_after": "\"Single cell profiling of human induced dendritic cells generated by direct reprogramming of embryonic fibroblasts\"",
        "search_after_uid": "doc#116965f3-f094-4769-9d28-ae675c1b569c",
        "search_before": null,
        "search_before_uid": null,
        "pages": 2,
        "sort": "projectTitle",
        "order": "asc"
    },
    "termFacets": {
        "organ": {
            "terms": [{"term": "blood", "count": 6}, {"term": null, "count": 5}, {
                "term": "kidney",
                "count": 3
            }, {"term": "pancreas", "count": 3}, {"term": "eye", "count": 2}, {
                "term": "hematopoietic system",
                "count": 2
            }, {"term": "lung", "count": 2}, {"term": "brain", "count": 1}, {
                "term": "colon",
                "count": 1
            }, {"term": "decidua", "count": 1}, {"term": "embryo", "count": 1}, {
                "term": "esophagus",
                "count": 1
            }, {"term": "immune system", "count": 1}, {"term": "liver", "count": 1}, {
                "term": "mediastinal lymph node",
                "count": 1
            }, {"term": "placenta", "count": 1}, {"term": "spleen", "count": 1}], "total": 23, "type": "terms"
        },
        "sampleEntityType": {
            "terms": [{"term": "specimens", "count": 19}, {
                "term": "cell_lines",
                "count": 4
            }, {"term": "organoids", "count": 1}], "total": 23, "type": "terms"
        },
        "project": {
            "terms": [{
                "term": "1M Immune Cells",
                "count": 1,
                "projectId": ["cc95ff89-2e68-4a08-a234-480eca21ce79"]
            }, {
                "term": "BM_PC",
                "count": 1,
                "projectId": ["a29952d9-925e-40f4-8a1c-274f118f1f51"]
            }, {
                "term": "CD4+ cytotoxic T lymphocytes",
                "count": 1,
                "projectId": ["90bd6933-40c0-48d4-8d76-778c103bf545"]
            }, {
                "term": "Diabetic Nephropathy snRNA-seq",
                "count": 1,
                "projectId": ["577c946d-6de5-4b55-a854-cd3fde40bff2"]
            }, {
                "term": "Drop-seq, DroNc-seq, Fluidigm C1 Comparison",
                "count": 1,
                "projectId": ["a9c022b4-c771-4468-b769-cabcf9738de3"]
            }, {
                "term": "Fetal/Maternal Interface",
                "count": 1,
                "projectId": ["f83165c5-e2ea-4d15-a5cf-33f3550bffde"]
            }, {
                "term": "HPSI human cerebral organoids",
                "count": 1,
                "projectId": ["005d611a-14d5-4fbf-846e-571a1f874f70"]
            }, {
                "term": "Healthy and type 2 diabetes pancreas",
                "count": 1,
                "projectId": ["ae71be1d-ddd8-4feb-9bed-24c3ddb6e1ad"]
            }, {
                "term": "Human Hematopoietic Profiling",
                "count": 1,
                "projectId": ["091cf39b-01bc-42e5-9437-f419a66c8a45"]
            }, {
                "term": "HumanColonicMesenchymeIBD",
                "count": 1,
                "projectId": ["f8aa201c-4ff1-45a4-890e-840d63459ca2"]
            }, {
                "term": "HumanMousePancreas",
                "count": 1,
                "projectId": ["f86f1ab4-1fbb-4510-ae35-3ffd752d4dfc"]
            }, {
                "term": "HumanTissueTcellActivation",
                "count": 1,
                "projectId": ["4a95101c-9ffc-4f30-a809-f04518a23803"]
            }, {
                "term": "Kidney biopsy scRNA-seq",
                "count": 1,
                "projectId": ["027c51c6-0719-469f-a7f5-640fe57cbece"]
            }, {
                "term": "KidneySingleCellAtlas",
                "count": 1,
                "projectId": ["abe1a013-af7a-45ed-8c26-f3793c24a1f4"]
            }, {
                "term": "Multiplexed scRNA-seq with barcoded antibodies",
                "count": 1,
                "projectId": ["f81efc03-9f56-4354-aabb-6ce819c3d414"]
            }, {
                "term": "Reprogrammed_Dendritic_Cells",
                "count": 1,
                "projectId": ["116965f3-f094-4769-9d28-ae675c1b569c"]
            }, {
                "term": "Single cell RNAseq characterization of cell types produced over time in an in vitro model of human inhibitory interneuron differentiation.",
                "count": 1,
                "projectId": ["2043c65a-1cf8-4828-a656-9e247d4e64f1"]
            }, {
                "term": "Single cell transcriptome analysis of human pancreas",
                "count": 1,
                "projectId": ["cddab57b-6868-4be4-806f-395ed9dd635a"]
            }, {
                "term": "SingleCellLiverLandscape",
                "count": 1,
                "projectId": ["4d6f6c96-2a83-43d8-8fe1-0f53bffd4674"]
            }, {
                "term": "TissueStability",
                "count": 1,
                "projectId": ["c4077b3c-5c98-4d26-a614-246d12c2e5d7"]
            }, {
                "term": "WongAdultRetina",
                "count": 1,
                "projectId": ["8185730f-4113-40d3-9cc3-929271784c2b"]
            }, {
                "term": "scRNAseqSystemicComparison",
                "count": 1,
                "projectId": ["88ec040b-8705-4f77-8f41-f81e57632f7d"]
            }, {
                "term": "snRNA-seq_for_human_retina",
                "count": 1,
                "projectId": ["9c20a245-f2c0-43ae-82c9-2232ec6b594f"]
            }], "total": 23, "type": "terms"
        },
        "assayType": {"terms": [{"term": null, "count": 23}], "total": 0, "type": "terms"},
        "instrumentManufacturerModel": {
            "terms": [{"term": null, "count": 23}, {
                "term": "Illumina HiSeq 2500",
                "count": 10
            }, {"term": "Illumina HiSeq 4000", "count": 5}, {
                "term": "Illumina NextSeq 500",
                "count": 5
            }, {"term": "Illumina HiSeq 2000", "count": 2}, {
                "term": "Illumina HiSeq X",
                "count": 2
            }, {"term": "Illumina Hiseq 2500", "count": 2}, {"term": "Illumina NovaSeq 6000", "count": 1}],
            "total": 23,
            "type": "terms"
        },
        "institution": {
            "terms": [{"term": "EMBL-EBI", "count": 12}, {
                "term": "University of California, Santa Cruz",
                "count": 6
            }, {"term": "EMBL-EBI European Bioinformatics Institute", "count": 3}, {
                "term": "Broad Institute",
                "count": 2
            }, {
                "term": "European Bioinformatics Institute",
                "count": 2
            }, {"term": "University of California Santa Cruz", "count": 2}, {
                "term": "University of Cambridge",
                "count": 2
            }, {"term": "Washington University in St. Louis", "count": 2}, {
                "term": "Wellcome Sanger Institute",
                "count": 2
            }, {"term": "Australian Genome Research Facility", "count": 1}, {
                "term": "Baylor College of Medicine",
                "count": 1
            }, {"term": "Brigham and Women's Hospital", "count": 1}, {
                "term": "Celgene Corporation",
                "count": 1
            }, {
                "term": "Centre for Eye Research Australia",
                "count": 1
            }, {
                "term": "Columbia University Irving Medical Center",
                "count": 1
            }, {
                "term": "Department of Medicine,  University of Cambridge",
                "count": 1
            }, {"term": "Garvan Institute of Medical Research", "count": 1}, {
                "term": "Harvard Medical School",
                "count": 1
            }, {"term": "Harvard University", "count": 1}, {
                "term": "Hospital for Sick Children",
                "count": 1
            }, {"term": "Karolinska Institutet", "count": 1}, {
                "term": "La Jolla Institute for Allergy and Immunology",
                "count": 1
            }, {"term": "Lund University", "count": 1}, {"term": "MIT", "count": 1}, {
                "term": "MRC Cancer Unit",
                "count": 1
            }, {"term": "Max Planck Institute for Evolutionary Anthropology", "count": 1}, {
                "term": "Monash University",
                "count": 1
            }, {"term": "National Institutes of Health", "count": 1}, {
                "term": "New York Genome Center",
                "count": 1
            }, {"term": "Newcastle University", "count": 1}, {
                "term": "Novo Nordisk Research Centre Oxford",
                "count": 1
            }, {"term": "OncoResponse, Inc", "count": 1}, {
                "term": "Skolkovo Institute of Science and Technology",
                "count": 1
            }, {"term": "Sloan Kettering Institute", "count": 1}, {
                "term": "Stanford University",
                "count": 1
            }, {
                "term": "Swinburne University of Technology",
                "count": 1
            }, {
                "term": "Technion - Israel Institute of Technology",
                "count": 1
            }, {
                "term": "The Allen Institute for Brain Science",
                "count": 1
            }, {
                "term": "The Australian National University",
                "count": 1
            }, {
                "term": "The Broad Institute of MIT & Harvard",
                "count": 1
            }, {
                "term": "The Weizmann Institute of Science",
                "count": 1
            }, {
                "term": "UCL Great Ormond Street Institute of Child Health",
                "count": 1
            }, {"term": "University Health Network", "count": 1}, {
                "term": "University of Chicago",
                "count": 1
            }, {"term": "University of Maryland School of Medicine", "count": 1}, {
                "term": "University of Newcastle",
                "count": 1
            }, {"term": "University of Oxford", "count": 1}, {
                "term": "University of Queensland",
                "count": 1
            }, {"term": "University of Sydney", "count": 1}, {
                "term": "University of Toronto",
                "count": 1
            }, {"term": "University of Utah", "count": 1}, {"term": "Wellcome Trust Sanger Institute", "count": 1}],
            "total": 23,
            "type": "terms"
        },
        "donorDisease": {
            "terms": [{"term": "normal", "count": 19}, {
                "term": "type 2 diabetes mellitus",
                "count": 3
            }, {"term": "Enterococcus faecalis infection", "count": 1}, {
                "term": "Lyme disease",
                "count": 1
            }, {"term": "acoustic neuroma", "count": 1}, {
                "term": "acquired aneurysmal subarachnoid hemorrhage",
                "count": 1
            }, {"term": "acute kidney tubular necrosis", "count": 1}, {
                "term": "adrenal cortex adenoma",
                "count": 1
            }, {"term": "anxiety disorder", "count": 1}, {
                "term": "arthritis",
                "count": 1
            }, {"term": "asymptomatic dengue", "count": 1}, {
                "term": "benign prostatic hyperplasia (disease)",
                "count": 1
            }, {"term": "cardiac arrest", "count": 1}, {
                "term": "cataract (disease)",
                "count": 1
            }, {"term": "colitis (disease)", "count": 1}, {
                "term": "depressive disorder",
                "count": 1
            }, {"term": "diverticulitis", "count": 1}, {
                "term": "end stage renal failure",
                "count": 1
            }, {"term": "essential hypertension", "count": 1}, {
                "term": "gastroesophageal reflux disease",
                "count": 1
            }, {"term": "hemolytic-uremic syndrome", "count": 1}, {
                "term": "hereditary hemochromatosis",
                "count": 1
            }, {"term": "hiatus hernia (disease)", "count": 1}, {
                "term": "hyperlipidemia (disease)",
                "count": 1
            }, {"term": "hypertension", "count": 1}, {
                "term": "irritable bowel syndrome",
                "count": 1
            }, {"term": "kidney cancer", "count": 1}, {
                "term": "non-alcoholic fatty liver disease",
                "count": 1
            }, {"term": "obstructive sleep apnea syndrome", "count": 1}, {
                "term": "orofaciodigital syndrome VIII",
                "count": 1
            }, {"term": "osteoarthritis, hip", "count": 1}, {
                "term": "pericardial effusion (disease)",
                "count": 1
            }, {"term": "prostate cancer", "count": 1}, {
                "term": "pure autonomic failure",
                "count": 1
            }, {"term": "reversible cerebral vasoconstriction syndrome", "count": 1}, {
                "term": "stroke disorder",
                "count": 1
            }, {"term": "syndromic dyslipidemia", "count": 1}, {
                "term": "ulcerative colitis (disease)",
                "count": 1
            }, {"term": "ventricular tachycardia", "count": 1}, {"term": null, "count": 1}],
            "total": 23,
            "type": "terms"
        },
        "organismAge": {
            "terms": [{"term": null, "count": 7}, {"term": "52", "count": 4}, {
                "term": "21",
                "count": 3
            }, {"term": "44", "count": 3}, {"term": "50", "count": 3}, {"term": "53", "count": 3}, {
                "term": "57",
                "count": 3
            }, {"term": "65", "count": 3}, {"term": "1", "count": 2}, {"term": "22", "count": 2}, {
                "term": "26",
                "count": 2
            }, {"term": "29", "count": 2}, {"term": "35", "count": 2}, {"term": "38", "count": 2}, {
                "term": "50-55",
                "count": 2
            }, {"term": "54", "count": 2}, {"term": "55", "count": 2}, {"term": "69", "count": 2}, {
                "term": "73",
                "count": 2
            }, {"term": "78", "count": 2}, {"term": "80", "count": 2}, {"term": "0", "count": 1}, {
                "term": "10-12",
                "count": 1
            }, {"term": "12", "count": 1}, {"term": "13.85", "count": 1}, {"term": "16", "count": 1}, {
                "term": "17",
                "count": 1
            }, {"term": "18-60", "count": 1}, {"term": "19", "count": 1}, {"term": "20-25", "count": 1}, {
                "term": "23",
                "count": 1
            }, {"term": "25", "count": 1}, {"term": "27", "count": 1}, {"term": "28", "count": 1}, {
                "term": "30",
                "count": 1
            }, {"term": "30-35", "count": 1}, {"term": "32", "count": 1}, {"term": "35-40", "count": 1}, {
                "term": "36",
                "count": 1
            }, {"term": "37", "count": 1}, {"term": "39", "count": 1}, {"term": "40-44", "count": 1}, {
                "term": "40-45",
                "count": 1
            }, {"term": "41", "count": 1}, {"term": "42", "count": 1}, {"term": "43", "count": 1}, {
                "term": "45",
                "count": 1
            }, {"term": "45-49", "count": 1}, {"term": "48", "count": 1}, {"term": "49", "count": 1}, {
                "term": "5",
                "count": 1
            }, {"term": "51", "count": 1}, {"term": "55-59", "count": 1}, {"term": "55-60", "count": 1}, {
                "term": "59",
                "count": 1
            }, {"term": "6", "count": 1}, {"term": "60-65", "count": 1}, {"term": "61", "count": 1}, {
                "term": "62",
                "count": 1
            }, {"term": "63", "count": 1}, {"term": "65-69", "count": 1}, {"term": "65-70", "count": 1}, {
                "term": "68",
                "count": 1
            }, {"term": "7.85", "count": 1}, {"term": "70-75", "count": 1}, {"term": "72", "count": 1}, {
                "term": "74",
                "count": 1
            }, {"term": "76", "count": 1}, {"term": "8.14", "count": 1}, {"term": "84", "count": 1}, {
                "term": "85",
                "count": 1
            }, {"term": "9.14", "count": 1}], "total": 23, "type": "terms"
        },
        "pairedEnd": {
            "terms": [{"term": null, "count": 23}, {"term": "false", "count": 15}, {
                "term": "true",
                "count": 12
            }], "total": 23, "type": "terms"
        },
        "preservationMethod": {
            "terms": [{"term": null, "count": 14}, {
                "term": "fresh",
                "count": 5
            }, {
                "term": "cryopreservation, other",
                "count": 3
            }, {
                "term": "cryopreservation in liquid nitrogen (dead tissue)",
                "count": 1
            }, {
                "term": "cryopreservation of live cells in liquid nitrogen",
                "count": 1
            }, {"term": "hypothermic preservation media at 2-8C", "count": 1}], "total": 23, "type": "terms"
        },
        "genusSpecies": {
            "terms": [{"term": "Homo sapiens", "count": 23}, {"term": "Mus musculus", "count": 8}],
            "total": 28,
            "type": "terms"
        },
        "projectTitle": {
            "terms": [{
                "term": "A Single-Cell Transcriptomic Map of the Human and Mouse Pancreas Reveals Inter- and Intra-cell Population Structure",
                "count": 1
            }, {
                "term": "A single-cell reference map of transcriptional states for human blood and tissue T cell activation",
                "count": 1
            }, {
                "term": "A single-cell transcriptome atlas of the adult human retina",
                "count": 1
            }, {
                "term": "Assessing the relevance of organoids to model inter-individual variation",
                "count": 1
            }, {
                "term": "Bone marrow plasma cells from hip replacement surgeries",
                "count": 1
            }, {
                "term": "Cell hashing with barcoded antibodies enables multiplexing and doublet detection for single cell genomics",
                "count": 1
            }, {
                "term": "Census of Immune Cells",
                "count": 1
            }, {
                "term": "Comparison, calibration, and benchmarking of high-throughput single cell RNA-Seq techniques for unbiased cell-type classification",
                "count": 1
            }, {
                "term": "Dissecting the human liver cellular landscape by single cell RNA-seq reveals novel intrahepatic monocyte/ macrophage populations",
                "count": 1
            }, {
                "term": "Ischaemic sensitivity of human tissue by single cell RNA seq",
                "count": 1
            }, {
                "term": "Precursors of human CD4+ cytotoxic T lymphocytes identified by single-cell transcriptome analysis",
                "count": 1
            }, {
                "term": "Profiling of CD34+ cells from human bone marrow to understand hematopoiesis",
                "count": 1
            }, {
                "term": "Reconstructing the human first trimester fetal-maternal interface using single cell transcriptomics",
                "count": 1
            }, {
                "term": "Single Cell Transcriptomics of a Human Kidney Allograft Biopsy Defines a Diverse Inflammatory Response",
                "count": 1
            }, {
                "term": "Single cell profiling of human induced dendritic cells generated by direct reprogramming of embryonic fibroblasts",
                "count": 1
            }, {
                "term": "Single cell transcriptome analysis of human pancreas reveals transcriptional signatures of aging and somatic mutation patterns.",
                "count": 1
            }, {
                "term": "Single-cell RNA-seq analysis  throughout a 125-day differentiation protocol that converted H1 human embryonic stem cells to a variety of ventrally-derived cell types.",
                "count": 1
            }, {
                "term": "Single-cell RNA-seq analysis of human pancreas from healthy individuals and type 2 diabetes patients",
                "count": 1
            }, {
                "term": "Spatio-temporal immune zonation of the human kidney",
                "count": 1
            }, {
                "term": "Structural Remodeling of the Human Colonic Mesenchyme in Inflammatory Bowel Disease",
                "count": 1
            }, {
                "term": "Systematic comparative analysis of single cell RNA-sequencing methods",
                "count": 1
            }, {
                "term": "The Single Cell Transcriptomic Landscape of Early Human Diabetic Nephropathy",
                "count": 1
            }, {
                "term": "Transcriptomic classification of human retinal cell types with single-nuclei RNA-seq.",
                "count": 1
            }], "total": 23, "type": "terms"
        },
        "modelOrganPart": {"terms": [{"term": null, "count": 23}], "total": 23, "type": "terms"},
        "disease": {
            "terms": [{"term": null, "count": 14}, {"term": "normal", "count": 9}, {
                "term": "colitis (disease)",
                "count": 1
            }, {"term": "end stage renal failure", "count": 1}, {
                "term": "hemolytic-uremic syndrome",
                "count": 1
            }, {"term": "orofaciodigital syndrome VIII", "count": 1}, {
                "term": "type 2 diabetes mellitus",
                "count": 1
            }, {"term": "ulcerative colitis (disease)", "count": 1}], "total": 23, "type": "terms"
        },
        "specimenOrganPart": {
            "terms": [{"term": null, "count": 5}, {
                "term": "bone marrow",
                "count": 4
            }, {"term": "venous blood", "count": 3}, {"term": "cortex", "count": 2}, {
                "term": "cortex of kidney",
                "count": 2
            }, {"term": "islet of Langerhans", "count": 2}, {
                "term": "skin epidermis",
                "count": 2
            }, {"term": "Left lateral basal bronchopulmonary segment", "count": 1}, {
                "term": "blastocyst",
                "count": 1
            }, {"term": "caudate lobe", "count": 1}, {
                "term": "esophagus mucosa",
                "count": 1
            }, {"term": "fovea centralis", "count": 1}, {
                "term": "lamina propria of mucosa of colon",
                "count": 1
            }, {"term": "lower lobe of left lung", "count": 1}, {
                "term": "lower lobe of right lung",
                "count": 1
            }, {"term": "lung parenchyma", "count": 1}, {
                "term": "mediastinal lymph node",
                "count": 1
            }, {"term": "peripheral blood mononuclear cell", "count": 1}, {
                "term": "renal medulla",
                "count": 1
            }, {"term": "renal pelvis", "count": 1}, {"term": "retina", "count": 1}, {
                "term": "retinal neural layer",
                "count": 1
            }, {"term": "umbilical cord blood", "count": 1}, {"term": "ureter", "count": 1}],
            "total": 23,
            "type": "terms"
        },
        "workflow": {
            "terms": [{"term": null, "count": 23}, {
                "term": "optimus_v1.3.5",
                "count": 7
            }, {"term": "optimus_v1.3.2", "count": 4}, {
                "term": "smartseq2_v2.4.0",
                "count": 4
            }, {"term": "optimus_v1.3.1", "count": 3}, {
                "term": "smartseq2_v2.3.0",
                "count": 3
            }, {"term": "optimus_v1.3.3", "count": 1}], "total": 23, "type": "terms"
        },
        "contactName": {
            "terms": [{"term": "Mallory,Ann,Freeberg", "count": 8}, {
                "term": "Laura,,Huerta",
                "count": 4
            }, {"term": "Matthew,,Green", "count": 3}, {
                "term": "Parisa,, Nejad",
                "count": 3
            }, {"term": "William,G,Sullivan", "count": 3}, {
                "term": "Anja,,Fullgrabe",
                "count": 2
            }, {"term": "Aviv,,Regev", "count": 2}, {
                "term": "Benjamin,D,Humphreys",
                "count": 2
            }, {"term": "Chris,,Villarreal", "count": 2}, {
                "term": "Danielle,,Welter",
                "count": 2
            }, {"term": "Enrique,,Sapena Ventura", "count": 2}, {
                "term": "Haojia,,Wu",
                "count": 2
            }, {"term": "Kohei,,Uchimura", "count": 2}, {
                "term": "Marion,F,Shadbolt",
                "count": 2
            }, {"term": "Monika,S,Kowalczyk", "count": 2}, {
                "term": "Muzlifah,,Haniffa",
                "count": 2
            }, {"term": "Orit,,Rozenblatt-Rosen", "count": 2}, {
                "term": "Parisa,,Nejad",
                "count": 2
            }, {"term": "Sarah,A,Teichmann", "count": 2}, {
                "term": "Yuhei,,Kirita",
                "count": 2
            }, {"term": "Zinaida,A,Perova", "count": 2}, {
                "term": "Abigail,,Wall",
                "count": 1
            }, {"term": "Adrian,,Veres", "count": 1}, {
                "term": "Adrienne,,Mackey",
                "count": 1
            }, {"term": "Agata,M,Bartczak", "count": 1}, {
                "term": "Agne,,Antanaviciute",
                "count": 1
            }, {"term": "Akbar,,Shakoor", "count": 1}, {"term": "Albert,,Vitale", "count": 1}, {
                "term": "Alex,K,Shalek",
                "count": 1
            }, {"term": "Alex,W,Hewitt", "count": 1}, {
                "term": "Alexandra-Chlo\u00e9,,Villani",
                "count": 1
            }, {"term": "Alexei,A,Sharov", "count": 1}, {
                "term": "Alison,,Simmons",
                "count": 1
            }, {"term": "Allon,M,Klein", "count": 1}, {
                "term": "Amanda,J,Kedaigle",
                "count": 1
            }, {"term": "Amedeo,,Vetere", "count": 1}, {
                "term": "Anand,,Ghanekar",
                "count": 1
            }, {"term": "Andrew,,Malone", "count": 1}, {
                "term": "Angel,,Nelson",
                "count": 1
            }, {"term": "Anindita,, Basu", "count": 1}, {
                "term": "Anna,,Wilbrey-Clark",
                "count": 1
            }, {"term": "Anne,,Senabouth", "count": 1}, {
                "term": "Anne-Rachel,,Krogstag",
                "count": 1
            }, {"term": "Anthi,,Tsingene", "count": 1}, {
                "term": "Asa,,Segerstolpe",
                "count": 1
            }, {"term": "Ashley,,Moffett", "count": 1}, {
                "term": "Assaf Weiner",
                "count": 1
            }, {"term": "Athanasia,,Palasantza", "count": 1}, {
                "term": "Aubrey,L,Faust",
                "count": 1
            }, {"term": "Barbara,,Treutlein", "count": 1}, {
                "term": "Benjamin,,Stewart",
                "count": 1
            }, {"term": "Blair,K,Gage", "count": 1}, {"term": "Bo,,Li", "count": 1}, {
                "term": "Boaz,,Barak",
                "count": 1
            }, {"term": "Boaz,,Levi", "count": 1}, {"term": "Brendan,T,Innes", "count": 1}, {
                "term": "Bridget,K,Wagner",
                "count": 1
            }, {"term": "Camden,Y,Lo", "count": 1}, {
                "term": "Carol,,Thompson",
                "count": 1
            }, {"term": "Cristiana,,Pires", "count": 1}, {
                "term": "Cynthia,C,Hession",
                "count": 1
            }, {"term": "Damra,,Camat", "count": 1}, {"term": "Dana,, Pe'er", "count": 1}, {
                "term": "Danielle,,Dionne",
                "count": 1
            }, {"term": "David,,Ahern", "count": 1}, {
                "term": "David,,Fawkner-Corbett",
                "count": 1
            }, {"term": "David,,Grant", "count": 1}, {"term": "Denise,,Morgan", "count": 1}, {
                "term": "Donna,L,Farber",
                "count": 1
            }, {"term": "Douglas,A,Melton", "count": 1}, {"term": "Ed,,Lein", "count": 1}, {
                "term": "Elizabeth,,Lee",
                "count": 1
            }, {"term": "Elliot,,Thomsen", "count": 1}, {
                "term": "Elo,,Madissoon",
                "count": 1
            }, {"term": "Emily,,Relton", "count": 1}, {"term": "Emily,,Welby", "count": 1}, {
                "term": "Eric,, Gauchat",
                "count": 1
            }, {"term": "Erin,C,Bush", "count": 1}, {"term": "Erinn,,Donnelly", "count": 1}, {
                "term": "Eshita,,Sharma",
                "count": 1
            }, {"term": "Esther,,Mellado-Gomez", "count": 1}, {
                "term": "Eyal David",
                "count": 1
            }, {"term": "Felix,C,Richter", "count": 1}, {
                "term": "Filipe,,Pereira",
                "count": 1
            }, {"term": "Francois,,Gervais", "count": 1}, {
                "term": "F\u00e1bio,,Rosa",
                "count": 1
            }, {"term": "Gary,D,Bader", "count": 1}, {
                "term": "Gonzalo,,Sapisochin",
                "count": 1
            }, {"term": "Gordon,,Keller", "count": 1}, {"term": "Graeme,,Pollock", "count": 1}, {
                "term": "Guy Ledergor",
                "count": 1
            }, {"term": "Hanna,Mendes,Levitin", "count": 1}, {
                "term": "Hannah,H,Chen",
                "count": 1
            }, {"term": "Hashem,,Koohy", "count": 1}, {
                "term": "Hayley,S,Nguyen",
                "count": 1
            }, {"term": "Heather,, Eckart", "count": 1}, {"term": "Helmut,G,Rennke", "count": 1}, {
                "term": "Ian,,Glass",
                "count": 1
            }, {"term": "Ian,D,McGilvray", "count": 1}, {"term": "Ido Amit", "count": 1}, {
                "term": "Ilia,,Kurochkin",
                "count": 1
            }, {"term": "Itai,,Yana", "count": 1}, {"term": "Ivan,,Linares", "count": 1}, {
                "term": "Ivana,,Kim",
                "count": 1
            }, {"term": "J,Gray,Camp", "count": 1}, {"term": "Jafar,S,Jabbari", "count": 1}, {
                "term": "James,,Kinchen",
                "count": 1
            }, {"term": "Jane,,Lee", "count": 1}, {"term": "Jane,C,Sowden", "count": 1}, {
                "term": "Jason,E,Fish",
                "count": 1
            }, {"term": "Jeff,C,Liu", "count": 1}, {"term": "Jennie,,Close", "count": 1}, {
                "term": "Jennifer,Hyoje,Ryu",
                "count": 1
            }, {"term": "Jeremy,,Miller", "count": 1}, {"term": "Jiarui,,Ding", "count": 1}, {
                "term": "Jill,,Henault",
                "count": 1
            }, {"term": "Jinzhou,,Yuan", "count": 1}, {
                "term": "Johan,,Henriksson",
                "count": 1
            }, {"term": "John,,Ferdinand", "count": 1}, {"term": "John,,Mich", "count": 1}, {
                "term": "John,,Phillips",
                "count": 1
            }, {"term": "John,R,Ferdinand", "count": 1}, {"term": "John,Y,Kwon", "count": 1}, {
                "term": "Jonathan,,Ting",
                "count": 1
            }, {"term": "Joseph,,Gaut", "count": 1}, {
                "term": "Joseph,E,Powell",
                "count": 1
            }, {"term": "Joshua,,Grimley", "count": 1}, {
                "term": "Joshua,Z,Levin",
                "count": 1
            }, {"term": "Juan,,Echeverri", "count": 1}, {
                "term": "Julia,,Waldman",
                "count": 1
            }, {"term": "Justin,,Manuel", "count": 1}, {
                "term": "Kamal,D,Puri",
                "count": 1
            }, {"term": "Karol,,Nowicki-Osuch", "count": 1}, {
                "term": "Karthik,,Shekhar",
                "count": 1
            }, {"term": "Katie,, Rhodes", "count": 1}, {
                "term": "Kaushal,,Parikh",
                "count": 1
            }, {"term": "Kerstin,B,Meyer", "count": 1}, {"term": "Kevin,,Loudon", "count": 1}, {
                "term": "Kiet,,Ngo",
                "count": 1
            }, {"term": "Kourosh,,Saeb-Parsy", "count": 1}, {
                "term": "Krishnaa,,Mahbubani",
                "count": 1
            }, {"term": "Krzysztof,,Polanski", "count": 1}, {
                "term": "Lan,T,Nguyen",
                "count": 1
            }, {"term": "Laura,,Cubitt", "count": 1}, {"term": "Leah,,Owen", "count": 1}, {
                "term": "Lewis,Y,Liu",
                "count": 1
            }, {"term": "Liam,,Bolt", "count": 1}, {"term": "Ling,,Zhu", "count": 1}, {
                "term": "Lyujie,,Fang",
                "count": 1
            }, {"term": "Maayan,,Baron", "count": 1}, {"term": "Manu,, Setty", "count": 1}, {
                "term": "Marc,H,Wadsworth",
                "count": 1
            }, {"term": "Marcin,,Tabaka", "count": 1}, {
                "term": "Margaret,,DeAngelis",
                "count": 1
            }, {"term": "Mark,C,Gillies", "count": 1}, {
                "term": "Mark,E,Snyder",
                "count": 1
            }, {"term": "Markus,,Selzner", "count": 1}, {
                "term": "Marlon,,Stoeckius",
                "count": 1
            }, {"term": "Marta,,Jagielowicz", "count": 1}, {
                "term": "Martin, Enge",
                "count": 1
            }, {"term": "Matthew,,Young", "count": 1}, {
                "term": "Menna,,Clatworthy",
                "count": 1
            }, {"term": "Michael,D,Wilson", "count": 1}, {
                "term": "Michael,JT,Stubbington",
                "count": 1
            }, {"term": "Michael,L,Cheng", "count": 1}, {
                "term": "Michal,,Slyper",
                "count": 1
            }, {"term": "Michelle,,Miron", "count": 1}, {
                "term": "Mina,,Ogawa",
                "count": 1
            }, {"term": "Mirjana,,Efremova", "count": 1}, {
                "term": "Moustafa,,Attar",
                "count": 1
            }, {"term": "Nadiya,,Shapovalova", "count": 1}, {
                "term": "Nazia,,Selzner",
                "count": 1
            }, {"term": "Neil,,Ashley", "count": 1}, {
                "term": "Neil,,Winegarden",
                "count": 1
            }, {"term": "Nemanja,D,Marjanovic", "count": 1}, {
                "term": "Ni,,Huang",
                "count": 1
            }, {"term": "Nicholas,,Khuu", "count": 1}, {
                "term": "Nikitas,,Georgakopoulos",
                "count": 1
            }, {"term": "Nir,,Hacohen", "count": 1}, {"term": "Oliver,,Stegle", "count": 1}, {
                "term": "Olivia,,Fong",
                "count": 1
            }, {"term": "Orr,,Ashenberg", "count": 1}, {
                "term": "Oyedele,,Adeyi",
                "count": 1
            }, {"term": "Pandurangan,,Vijayanand", "count": 1}, {
                "term": "Parker,C,Wilson",
                "count": 1
            }, {"term": "Paul,,Greig", "count": 1}, {"term": "Paul,A,Welling", "count": 1}, {
                "term": "Peng-Yuna,,Wang",
                "count": 1
            }, {"term": "Peter,,Smibert", "count": 1}, {"term": "Peter,A,Sims", "count": 1}, {
                "term": "Peter,A,Szabo",
                "count": 1
            }, {"term": "Phillipa,,Harding", "count": 1}, {
                "term": "Pranay,,Dogra",
                "count": 1
            }, {"term": "Puspa,,Thapa", "count": 1}, {"term": "Qingnan,,Liang", "count": 1}, {
                "term": "Quan,,Nguyen",
                "count": 1
            }, {"term": "Quin,,Wills", "count": 1}, {"term": "Rahul,,Gupta", "count": 1}, {
                "term": "Rahul,,Satija",
                "count": 1
            }, {"term": "Raymond,CB,Wong", "count": 1}, {
                "term": "Rebecca,,Fitzgerald",
                "count": 1
            }, {"term": "Rebecca,,Hodge", "count": 1}, {
                "term": "Rebecca,K,Seliga",
                "count": 1
            }, {"term": "Reem,, Elorbany", "count": 1}, {
                "term": "Renaud,,Gaujoux",
                "count": 1
            }, {"term": "Ricardo,J,Miragaia", "count": 1}, {
                "term": "Rickard,,Sandberg",
                "count": 1
            }, {"term": "Rory,,Bowden", "count": 1}, {"term": "Roser,,Vento-Tormo", "count": 1}, {
                "term": "Rui,,Chen",
                "count": 1
            }, {"term": "Ryan,, Dohn", "count": 1}, {
                "term": "Sabina,,Kanton",
                "count": 1
            }, {"term": "Sai,,Ramakrishnan", "count": 1}, {"term": "Sai,W,Chung", "count": 1}, {
                "term": "Sam,,Behjati",
                "count": 1
            }, {"term": "Samuel,L,Wolock", "count": 1}, {
                "term": "Samuel,W,Lukowski",
                "count": 1
            }, {"term": "Sandy,SC,Hung", "count": 1}, {"term": "Sangbae,,Kim", "count": 1}, {
                "term": "Sarah,,Teichmann",
                "count": 1
            }, {"term": "Sean,K,Simmons", "count": 1}, {
                "term": "Sebastian,, Pott",
                "count": 1
            }, {"term": "Shai,S,Shen-Orr", "count": 1}, {
                "term": "Shaina,,Carroll",
                "count": 1
            }, {"term": "Sharad,,Ramanathan", "count": 1}, {
                "term": "Shinichiro,,Ogawa",
                "count": 1
            }, {"term": "Shiwei,,Zheng", "count": 1}, {
                "term": "Shuqiang,,Li",
                "count": 1
            }, {"term": "Sonya,A,MacParland", "count": 1}, {
                "term": "Soraya,,Shehata",
                "count": 1
            }, {"term": "Susan,,Bort", "count": 1}, {
                "term": "Sushrut,S, Waikar",
                "count": 1
            }, {"term": "Takashi,,Senda", "count": 1}, {"term": "Timothy,,Tickle", "count": 1}, {
                "term": "Ting,,Zhang",
                "count": 1
            }, {"term": "Tom,,Mitchell", "count": 1}, {
                "term": "Tracey,,Andrew",
                "count": 1
            }, {"term": "Travis,K,Hughes", "count": 1}, {
                "term": "Trevor,D,Lamb",
                "count": 1
            }, {"term": "Trygve,,Bakken", "count": 1}, {"term": "Tu,,Nguyen", "count": 1}, {
                "term": "Tyler,,Burks",
                "count": 1
            }, {"term": "Ulrike,,Gr\u00fcnert", "count": 1}, {
                "term": "Vaidotas,, Kiseliovas",
                "count": 1
            }, {"term": "Vilas,,Menon", "count": 1}, {"term": "William,,Ge", "count": 1}, {
                "term": "Xian,,Adiconis",
                "count": 1
            }, {"term": "Xue-Zhong,,Ma", "count": 1}, {"term": "Xuesen,,Cheng", "count": 1}, {
                "term": "Yim,Ling,Cheng",
                "count": 1
            }, {"term": "Yumei,,Li", "count": 1}, {"term": "Zhisong,,He", "count": 1}, {
                "term": "Zigong,,Shao",
                "count": 1
            }, {"term": "Zinaida, A, Perova", "count": 1}, {"term": "Zizhen,,Yao", "count": 1}],
            "total": 23,
            "type": "terms"
        },
        "specimenOrgan": {
            "terms": [{"term": "blood", "count": 7}, {
                "term": "hematopoietic system",
                "count": 3
            }, {"term": "kidney", "count": 3}, {"term": "pancreas", "count": 3}, {
                "term": "embryo",
                "count": 2
            }, {"term": "eye", "count": 2}, {"term": "lung", "count": 2}, {
                "term": "brain",
                "count": 1
            }, {"term": "colon", "count": 1}, {"term": "decidua", "count": 1}, {
                "term": "esophagus",
                "count": 1
            }, {"term": "immune system", "count": 1}, {"term": "liver", "count": 1}, {
                "term": "mediastinal lymph node",
                "count": 1
            }, {"term": "placenta", "count": 1}, {"term": "skin of body", "count": 1}, {"term": "spleen", "count": 1}],
            "total": 23,
            "type": "terms"
        },
        "effectiveOrgan": {
            "terms": [{"term": "blood", "count": 6}, {
                "term": "brain",
                "count": 3
            }, {"term": "hematopoietic system", "count": 3}, {"term": "kidney", "count": 3}, {
                "term": "pancreas",
                "count": 3
            }, {"term": "eye", "count": 2}, {"term": "immune system", "count": 2}, {
                "term": "lung",
                "count": 2
            }, {"term": "colon", "count": 1}, {"term": "decidua", "count": 1}, {
                "term": "embryo",
                "count": 1
            }, {"term": "esophagus", "count": 1}, {"term": "heart", "count": 1}, {
                "term": "liver",
                "count": 1
            }, {"term": "mediastinal lymph node", "count": 1}, {"term": "placenta", "count": 1}, {
                "term": "spleen",
                "count": 1
            }, {"term": "stem cell", "count": 1}], "total": 23, "type": "terms"
        },
        "organPart": {
            "terms": [{"term": null, "count": 10}, {"term": "bone marrow", "count": 3}, {
                "term": "cortex",
                "count": 2
            }, {"term": "cortex of kidney", "count": 2}, {
                "term": "islet of Langerhans",
                "count": 2
            }, {"term": "venous blood", "count": 2}, {
                "term": "Left lateral basal bronchopulmonary segment",
                "count": 1
            }, {"term": "caudate lobe", "count": 1}, {
                "term": "esophagus mucosa",
                "count": 1
            }, {"term": "fovea centralis", "count": 1}, {
                "term": "lamina propria of mucosa of colon",
                "count": 1
            }, {"term": "lower lobe of left lung", "count": 1}, {
                "term": "lower lobe of right lung",
                "count": 1
            }, {"term": "lung parenchyma", "count": 1}, {
                "term": "mediastinal lymph node",
                "count": 1
            }, {"term": "peripheral blood mononuclear cell", "count": 1}, {
                "term": "renal medulla",
                "count": 1
            }, {"term": "renal pelvis", "count": 1}, {"term": "retina", "count": 1}, {
                "term": "retinal neural layer",
                "count": 1
            }, {"term": "skin epidermis", "count": 1}, {"term": "umbilical cord blood", "count": 1}, {
                "term": "ureter",
                "count": 1
            }], "total": 23, "type": "terms"
        },
        "publicationTitle": {
            "terms": [{
                "term": null,
                "count": 7
            }, {
                "term": "A single\u2010cell transcriptome atlas of the adult human retina",
                "count": 1
            }, {
                "term": "Cell Hashing with barcoded antibodies enables multiplexing and doublet detection for single cell genomics",
                "count": 1
            }, {
                "term": "Lung, spleen and oesophagus tissue remains stable for scRNAseq in cold preservation",
                "count": 1
            }, {
                "term": "Palantir characterizes cell fate continuities in human hematopoiesis",
                "count": 1
            }, {
                "term": "Precursors of human CD4+ cytotoxic T lymphocytes identified by single-cell transcriptome analysis.",
                "count": 1
            }, {
                "term": "Single cell RNA sequencing of human liver reveals distinct intrahepatic macrophage populations",
                "count": 1
            }, {
                "term": "Single cell dissection of plasma cell heterogeneity in symptomatic and asymptomatic myeloma",
                "count": 1
            }, {
                "term": "Single-Cell Analysis of Human Pancreas Reveals Transcriptional Signatures of Aging and Somatic Mutation Patterns.",
                "count": 1
            }, {
                "term": "Single-Cell Profiling of an In\u00a0Vitro Model of Human Interneuron Development Reveals Temporal Dynamics of Cell Type Production and Maturation.",
                "count": 1
            }, {
                "term": "Single-Cell Transcriptome Profiling of Human Pancreatic Islets in Health and Type 2 Diabetes",
                "count": 1
            }, {
                "term": "Single-Cell Transcriptomics of a Human Kidney Allograft Biopsy Specimen Defines a Diverse Inflammatory Response",
                "count": 1
            }, {
                "term": "Spatiotemporal immune zonation of the human kidney",
                "count": 1
            }, {
                "term": "Structural Remodeling of the Human Colonic Mesenchyme in Inflammatory Bowel Disease",
                "count": 1
            }, {
                "term": "Systematic Comparison of High-throughput Single-Cell and  Single-Nucleus Transcriptomes during Cardiomyocyte Differentiation",
                "count": 1
            }, {
                "term": "Systematic comparative analysis of single cell RNA-sequencing methods",
                "count": 1
            }, {"term": "The Single Cell Transcriptomic Landscape of Early Human Diabetic Nephropathy", "count": 1}],
            "total": 23,
            "type": "terms"
        },
        "cellLineType": {
            "terms": [{"term": "induced pluripotent", "count": 2}, {
                "term": "primary",
                "count": 2
            }, {"term": "stem cell-derived", "count": 2}, {"term": "stem cell", "count": 1}, {
                "term": null,
                "count": 18
            }], "total": 23, "type": "terms"
        },
        "libraryConstructionApproach": {
            "terms": [{"term": null, "count": 23}, {
                "term": "10X v2 sequencing",
                "count": 11
            }, {"term": "Smart-seq2", "count": 6}, {"term": "inDrop", "count": 3}, {
                "term": "10X 3' v2 sequencing",
                "count": 1
            }, {"term": "10X 5' v2 sequencing", "count": 1}, {
                "term": "10x 3' v3 sequencing",
                "count": 1
            }, {"term": "10x v3 sequencing", "count": 1}, {"term": "CEL-seq2", "count": 1}, {
                "term": "CITE-seq",
                "count": 1
            }, {"term": "DNA library construction", "count": 1}, {
                "term": "DroNc-Seq",
                "count": 1
            }, {"term": "DroNc-seq", "count": 1}, {"term": "Drop-Seq", "count": 1}, {
                "term": "Drop-seq",
                "count": 1
            }, {"term": "MARS-seq", "count": 1}, {"term": "Seq-Well", "count": 1}, {
                "term": "Smart-Seq",
                "count": 1
            }, {"term": "cDNA library construction", "count": 1}, {"term": "sci-RNA-seq", "count": 1}],
            "total": 23,
            "type": "terms"
        },
        "biologicalSex": {
            "terms": [{"term": "male", "count": 19}, {"term": "female", "count": 17}, {
                "term": "unknown",
                "count": 5
            }], "total": 23, "type": "terms"
        },
        "laboratory": {
            "terms": [{
                "term": "Human Cell Atlas Data Coordination Platform",
                "count": 21
            }, {"term": "Molecular Atlas", "count": 4}, {"term": "Adeyi", "count": 1}, {
                "term": "ArrayExpress",
                "count": 1
            }, {"term": "Bader", "count": 1}, {"term": "Basu", "count": 1}, {
                "term": "Behjati Lab",
                "count": 1
            }, {"term": "CGaP", "count": 1}, {
                "term": "Cambridge Biorepository for Translational Medicine",
                "count": 1
            }, {
                "term": "Cellular Reprogramming Unit",
                "count": 1
            }, {
                "term": "Center for Neurobiology and Brain Restoration",
                "count": 1
            }, {
                "term": "Center for the Science of Therapeutics",
                "count": 1
            }, {"term": "Centre for Trophoblast Research", "count": 1}, {
                "term": "Clatworthy Lab",
                "count": 1
            }, {
                "term": "Clinical Genetics Unit",
                "count": 1
            }, {
                "term": "Department of Cell and Molecular Biology (CMB)",
                "count": 1
            }, {
                "term": "Department of Chemistry and Biotechnology",
                "count": 1
            }, {
                "term": "Department of Immunology, Faculty of Medicine",
                "count": 1
            }, {
                "term": "Department of Laboratory Medicine",
                "count": 1
            }, {
                "term": "Department of Medicine, Division of Nephrology",
                "count": 1
            }, {
                "term": "Department of Medicine, Division of Renal Medicine",
                "count": 1
            }, {
                "term": "Department of Ophthalmology and Visual Sciences",
                "count": 1
            }, {
                "term": "Department of Pathology and Immunology",
                "count": 1
            }, {
                "term": "Department of Pathology, Brigham and Women\u2019s Hospital",
                "count": 1
            }, {
                "term": "Department of Stem Cell and Regenerative Biology",
                "count": 1
            }, {"term": "Department of Systems Biology", "count": 1}, {
                "term": "Division of Vaccine Discovery",
                "count": 1
            }, {
                "term": "Faculty of Biology",
                "count": 1
            }, {"term": "Farber Lab; Columbia Center for Translational Immunology", "count": 1}, {
                "term": "Fish",
                "count": 1
            }, {"term": "Garvan\u2010Weizmann Centre for Cellular Genomics", "count": 1}, {
                "term": "Ghanekar",
                "count": 1
            }, {"term": "Grant", "count": 1}, {"term": "Greig", "count": 1}, {
                "term": "Haniffa Lab",
                "count": 1
            }, {
                "term": "Human Cell Atlas (Mike Stubbington)",
                "count": 1
            }, {
                "term": "Human Cell Atlas (Sarah Teichmann)",
                "count": 1
            }, {"term": "Human Cell Atlas Data coordination Platform", "count": 1}, {
                "term": "Human Cell Atlas UK",
                "count": 1
            }, {
                "term": "Human Genome Sequencing Center, Department of Molecular and Human Genetics,",
                "count": 1
            }, {"term": "Institute for Molecular Bioscience", "count": 1}, {
                "term": "Institute of Cellular Medicine",
                "count": 1
            }, {"term": "John Curtin School of Medical Research", "count": 1}, {
                "term": "Keller",
                "count": 1
            }, {"term": "Kennedy Institute of Rheumatology", "count": 1}, {
                "term": "Klarman Cell Observatory",
                "count": 1
            }, {
                "term": "Lions Eye Donation Services",
                "count": 1
            }, {
                "term": "MRC Human Immunology Unit, MRC Weatherall Institute of Molecular Medicine",
                "count": 1
            }, {"term": "MacParland", "count": 1}, {
                "term": "McGilvray",
                "count": 1
            }, {
                "term": "McGovern Institute for Brain Research",
                "count": 1
            }, {
                "term": "Molecular Immunity Unit, Department of Medicine",
                "count": 1
            }, {"term": "National Institute for Aging", "count": 1}, {
                "term": "Oliver Stegle Group",
                "count": 1
            }, {"term": "Pe'er", "count": 1}, {"term": "Pott", "count": 1}, {
                "term": "Prof. Ido Amit",
                "count": 1
            }, {"term": "Rebecca Fitzgerald", "count": 1}, {"term": "Regev Lab", "count": 1}, {
                "term": "Sapisochin",
                "count": 1
            }, {"term": "Sarah Teichmann Lab", "count": 1}, {
                "term": "Satija Lab",
                "count": 1
            }, {"term": "Save Sight Institute", "count": 1}, {
                "term": "Selzner",
                "count": 1
            }, {
                "term": "Sims Lab; Department of Systems Biology",
                "count": 1
            }, {
                "term": "Stem Cells and Regenerative Medicine Section, NIHR Great Ormond Street Hospital Biomedical Research Centre",
                "count": 1
            }, {"term": "Technology Development and Innovation", "count": 1}, {
                "term": "Teichmann Lab",
                "count": 1
            }, {"term": "The Humphreys' Lab", "count": 1}, {
                "term": "Translational Development",
                "count": 1
            }, {
                "term": "Weatherall Institute of Molecular Medicine",
                "count": 1
            }, {"term": "Wellcome Trust Centre for Human Genetics", "count": 1}, {
                "term": "Wilson",
                "count": 1
            }, {"term": "Winegarden", "count": 1}], "total": 23, "type": "terms"
        },
        "projectDescription": {
            "terms": [{
                "term": "Our aims are to generate a full representation of human hematopoiesis in blood and bone marrow of humans using a multi-tier and iterative collection and analysis of 200,000 cells from ten healthy human bone",
                "count": 1
            }, {"term": null, "count": 22}], "total": 23, "type": "terms"
        },
        "selectedCellType": {
            "terms": [{"term": null, "count": 8}, {
                "term": "T cell",
                "count": 2
            }, {"term": "endothelial cell", "count": 2}, {"term": "epithelial cell", "count": 2}, {
                "term": "fibroblast",
                "count": 2
            }, {"term": "monocyte", "count": 2}, {
                "term": "myofibroblast cell",
                "count": 2
            }, {
                "term": "peripheral blood mononuclear cell",
                "count": 2
            }, {"term": "CD34-positive, CD38-negative hematopoietic stem cell", "count": 1}, {
                "term": "CD45-",
                "count": 1
            }, {"term": "CD8-positive, alpha-beta T cell", "count": 1}, {
                "term": "Epcam+",
                "count": 1
            }, {"term": "HLAG+", "count": 1}, {
                "term": "Plasma cell",
                "count": 1
            }, {"term": "bone marrow hematopoietic cell", "count": 1}, {
                "term": "cord blood hematopoietic stem cell",
                "count": 1
            }, {
                "term": "dendritic cell",
                "count": 1
            }, {
                "term": "effector memory CD8-positive, alpha-beta T cell, terminally differentiated",
                "count": 1
            }, {"term": "embryonic fibroblast", "count": 1}, {
                "term": "epithelial cell of esophagus",
                "count": 1
            }, {"term": "inhibitory interneuron", "count": 1}, {
                "term": "kidney cell",
                "count": 1
            }, {"term": "leukocyte", "count": 1}, {"term": "live", "count": 1}, {
                "term": "mononuclear cell",
                "count": 1
            }, {"term": "myeloid cell", "count": 1}, {
                "term": "natural killer cell",
                "count": 1
            }, {"term": "neural cell", "count": 1}, {"term": "neuron", "count": 1}, {
                "term": "pancreatic PP cell",
                "count": 1
            }, {"term": "splenocyte", "count": 1}, {"term": "stromal cell", "count": 1}], "total": 23, "type": "terms"
        },
        "specimenDisease": {
            "terms": [{"term": "normal", "count": 13}, {
                "term": null,
                "count": 9
            }, {"term": "colitis (disease)", "count": 1}, {
                "term": "end stage renal failure",
                "count": 1
            }, {"term": "hemolytic-uremic syndrome", "count": 1}, {
                "term": "orofaciodigital syndrome VIII",
                "count": 1
            }, {"term": "type 2 diabetes mellitus", "count": 1}, {"term": "ulcerative colitis (disease)", "count": 1}],
            "total": 23,
            "type": "terms"
        },
        "fileFormat": {
            "terms": [{"term": "fastq.gz", "count": 23}, {"term": "bam", "count": 14}, {
                "term": "csv",
                "count": 14
            }, {"term": "matrix", "count": 14}, {"term": "unknown", "count": 11}, {
                "term": "pdf",
                "count": 6
            }, {"term": "bai", "count": 4}, {"term": "results", "count": 4}, {
                "term": "txt",
                "count": 4
            }, {"term": "csv.gz", "count": 2}, {"term": "npy", "count": 2}, {
                "term": "npz",
                "count": 2
            }, {"term": "docx", "count": 1}], "total": 23, "type": "terms"
        },
        "modelOrgan": {
            "terms": [{"term": null, "count": 19}, {"term": "brain", "count": 2}, {
                "term": "heart",
                "count": 1
            }, {"term": "hematopoietic system", "count": 1}, {
                "term": "immune system",
                "count": 1
            }, {"term": "stem cell", "count": 1}], "total": 23, "type": "terms"
        }
    }
};
