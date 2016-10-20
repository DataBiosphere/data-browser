export interface RepositoryFiles {
    hits: File[];
    pagination: FilePagination;
    termFacets: {
        [key: string]: TermFacet;
    };
}

export interface TermFacet {
    missing: number;
    total: number;
    terms: Term[];
    type: "terms";
}

interface Term {
    term: string;
    count: number;
}

export interface FilePagination {
    count: number;
    from: number;
    order: "asc" | "desc";
    page: number;
    pages: number;
    size: number;
    sort: string;
    total: number;
}

interface File {
    id?: string;
    objectId?: string;
    access?: string;
    study?: string[];
    dataCategorization?: DataCategorization;
    dataBundle?: DataBundle;
    fileCopies?: FileCopy[];
    donors?: Donor[];
    analysisMethod?: AnalysisMethod;
    referenceGenome?: ReferenceGenome;
}


interface FileCopy {
    repoDataBundleId?: string;
    repoFileId?: string;
    repoDataSetIds?: string[];
    repoCode?: string;
    repoOrg?: string;
    repoName?: string;
    repoType?: string;
    repoCountry?: string;
    repoBaseUrl?: string;
    repoDataPath?: string;
    repoMetadataPath?: string;
    indexFile?: IndexFile;
    fileName?: string;
    fileFormat?: string;
    fileMd5sum?: string;
    fileSize?: number;
    lastModified?: number;
}


interface DataCategorization {
    dataType?: string;
    experimentalStrategy?: string;
}
interface DataBundle {
    dataBundleId?: string;
}

interface Donor {
    id: string;
    submittedDonorId: string;
    projectId: string;
    projectName: string;
    primarySite: string;
    tumourSubtype: string;
    tumourType: string;
    ssmCount: number;
    ssmAffectedGenes: number;
    cnsmExists: boolean;
    stsmExists: boolean;
    sgvExists: boolean;
    methSeqExists: boolean;
    methArrayExists: boolean;
    expSeqExists: boolean;
    expArrayExists: boolean;
    pexpExists: boolean;
    mirnaSeqExists: boolean;
    jcnExists: boolean;
    ageAtDiagnosis: number;
    ageAtDiagnosisGroup: string;
    ageAtEnrollment: number;
    ageAtLastFollowup: number;
    intervalOfLastFollowup: number;
    relapseInterval: number;
    survivalTime: number;
    relapseType: string;
    diagnosisIcd10: string;
    diseaseStatusLastFollowup: string;
    gender: string;
    vitalStatus: string;
    tumourStageAtDiagnosis: string;
    tumourStagingSystemAtDiagnosis: string;
    tumourStageAtDiagnosisSupplemental: string;
    availableDataTypes: string[];
    analysisTypes: string[];
    priorMalignancy: string;
    cancerTypePriorMalignancy: string;
    cancerHistoryFirstDegreeRelative: string;
    studies: string[];
    specimen?: Specimen[];
    family?: Family[];
    therapy?: Therapy[];
    exposure?: Exposure[];
    state?: string;
}
interface AnalysisMethod {
    analysisType?: string;
    software?: string;
}
interface ReferenceGenome {
    genomeBuild?: string;
    referenceName?: string;
    downloadUrl?: string;
}
interface IndexFile {
    id?: string;
    objectId?: string;
    fileName?: string;
    fileFormat?: string;
    fileMd5sum?: string;
    fileSize?: number;
}

interface Specimen {
    id: string;
    submittedId: string;
    available: boolean;
    digitalImageOfStainedSection: string;
    dbXref: string;
    biobank: string;
    biobankId: string;
    treatmentType: string;
    treatmentTypeOther: string;
    processing: string;
    processingOther: string;
    storage: string;
    type: string;
    typeOther: string;
    uri: string;
    interval: number;
    tumourConfirmed: boolean;
    tumourGrade: string;
    tumourGradeSupplemental: string;
    tumourHistologicalType: string;
    tumourStage: string;
    tumourStageSupplemental: string;
    tumourStageSystem: string;
    percentCellularity: number;
    levelOfCellularity: string;
    samples: Sample[];
}

interface Family {
    donorHasRelativeWithCancerHistory: string;
    relationshipType: string;
    relationshipTypeOther: string;
    relationshipSex: string;
    relationshipAge: number;
    relationshipDiseaseICD10: string;
    relationshipDisease: string;
}

interface Therapy {
    firstTherapyType: string;
    firstTherapyTherapeuticIntent: string;
    firstTherapyStartInterval: number;
    firstTherapyDuration: number;
    firstTherapyResponse: string;
    secondTherapyType: string;
    secondTherapyTherapeuticIntent: string;
    secondTherapyStartInterval: number;
    secondTherapyDuration: number;
    secondTherapyResponse: string;
    otherTherapy: string;
    otherTherapyResponse: string;
}
interface Exposure {
    exposureType: string;
    exposureIntesity: number;
    tobaccoSmokingHistoryIndicator: string;
    tobaccoSmokingIntensity: number;
    alcoholHistory: string;
    alcoholHistoryIntensity: string;
}

interface Sample {
    id: string;
    analyzedId: string;
    analyzedInterval: number;
    study: string;
    availableRawSequenceData: RawSeqData[];
}

interface RawSeqData {
    id: string;
    platform?: string;
    state?: string;
    type?: string;
    libraryStrategy?: string;
    analyteCode?: string;
    dataUri?: string;
    repository?: string;
    filename?: string;
    rawDataAccession?: string;
}
