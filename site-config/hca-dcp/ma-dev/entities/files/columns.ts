import {
  ColumnConfig,
  ComponentConfig,
  EntityConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import { FilesResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../../app/components";
import * as V from "../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import {
  HCA_DCP_CATEGORY_KEY,
  HCA_DCP_CATEGORY_LABEL,
} from "../../../category";

const AZUL_FILE_DOWNLOAD: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.AzulFileDownload,
    viewBuilder: V.buildFileDownload,
  } as ComponentConfig<typeof C.AzulFileDownload, FilesResponse>,
  enableHiding: false,
  enableSorting: false,
  header: HCA_DCP_CATEGORY_LABEL.AZUL_FILE_DOWNLOAD,
  id: HCA_DCP_CATEGORY_KEY.AZUL_FILE_DOWNLOAD,
  width: { max: "auto", min: "76px" },
};

const BIOLOGICAL_SEX: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.BasicCell,
    viewBuilder: V.buildAggregatedDonorBiologicalSex,
  } as ComponentConfig<typeof C.BasicCell, FilesResponse>,
  header: "Sex",
  id: HCA_DCP_CATEGORY_KEY.BIOLOGICAL_SEX,
  width: { max: "1fr", min: "120px" },
};

const CELL_COUNT: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.BasicCell,
    viewBuilder: V.buildTotalCells,
  } as ComponentConfig<typeof C.BasicCell, FilesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.CELL_COUNT,
  id: HCA_DCP_CATEGORY_KEY.CELL_COUNT,
  width: { max: "1fr", min: "124px" },
};

const CONTENT_DESCRIPTION: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildFileContentDescriptions,
  } as ComponentConfig<typeof C.NTagCell, FilesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.CONTENT_DESCRIPTION,
  id: HCA_DCP_CATEGORY_KEY.CONTENT_DESCRIPTION,
  width: { max: "1fr", min: "124px" },
};

const DATA_USE_RESTRICTION: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedDataUseRestriction,
  } as ComponentConfig<typeof C.NTagCell, FilesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.DATA_USE_RESTRICTION,
  id: HCA_DCP_CATEGORY_KEY.DATA_USE_RESTRICTION,
  width: { max: "1fr", min: "124px" },
};

const DEVELOPMENT_STAGE: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedDonorDevelopmentStage,
  } as ComponentConfig<typeof C.NTagCell, FilesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.DEVELOPMENT_STAGE,
  id: HCA_DCP_CATEGORY_KEY.DEVELOPMENT_STAGE,
  width: { max: "1fr", min: "148px" },
};

const DONOR_DISEASE: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedDonorDisease,
  } as ComponentConfig<typeof C.NTagCell, FilesResponse>,
  header: "Disease (Donor)",
  id: HCA_DCP_CATEGORY_KEY.DONOR_DISEASE,
  width: { max: "1fr", min: "120px" },
};

const FILE_FORMAT: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.BasicCell,
    viewBuilder: V.buildFileFormat,
  } as ComponentConfig<typeof C.BasicCell, FilesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.FILE_FORMAT,
  id: HCA_DCP_CATEGORY_KEY.FILE_FORMAT,
  width: { max: "1fr", min: "120px" },
};

const FILE_NAME: ColumnConfig<FilesResponse> = {
  columnPinned: true,
  componentConfig: {
    component: C.BasicCell,
    viewBuilder: V.buildFileName,
  } as ComponentConfig<typeof C.BasicCell, FilesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.FILE_NAME,
  id: HCA_DCP_CATEGORY_KEY.FILE_NAME,
  width: { max: "2fr", min: "240px" },
};

const FILE_SIZE: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.BasicCell,
    viewBuilder: V.buildFileSize,
  } as ComponentConfig<typeof C.BasicCell, FilesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.FILE_SIZE,
  id: HCA_DCP_CATEGORY_KEY.FILE_SIZE,
  width: { max: "1fr", min: "120px" },
};

const FILE_SOURCE: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.BasicCell,
    viewBuilder: V.buildFileSource,
  } as ComponentConfig<typeof C.BasicCell, FilesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.FILE_SOURCE,
  id: HCA_DCP_CATEGORY_KEY.FILE_SOURCE,
  width: { max: "1fr", min: "120px" },
};

const GENUS_SPECIES: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedDonorGenusSpecies,
  } as ComponentConfig<typeof C.NTagCell, FilesResponse>,
  header: "Species",
  id: HCA_DCP_CATEGORY_KEY.GENUS_SPECIES,
  width: { max: "1fr", min: "120px" },
};

const LIBRARY_CONSTRUCTION_APPROACH: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedProtocolLibraryConstructionApproach,
  } as ComponentConfig<typeof C.NTagCell, FilesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.LIBRARY_CONSTRUCTION_METHOD,
  id: HCA_DCP_CATEGORY_KEY.LIBRARY_CONSTRUCTION_METHOD,
  width: { max: "1fr", min: "120px" },
};

const MODEL_ORGAN: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedSampleModelOrgan,
  } as ComponentConfig<typeof C.NTagCell, FilesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.MODEL_ORGAN,
  id: HCA_DCP_CATEGORY_KEY.MODEL_ORGAN,
  width: { max: "1fr", min: "120px" },
};

const NUCLEIC_ACID_SOURCE: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedProtocolNucleicAcidSource,
  } as ComponentConfig<typeof C.NTagCell, FilesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.NUCLEIC_ACID_SOURCE,
  id: HCA_DCP_CATEGORY_KEY.NUCLEIC_ACID_SOURCE,
  width: { max: "1fr", min: "120px" },
};

const ORGANISM_AGE: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedDonorOrganismAge,
  } as ComponentConfig<typeof C.NTagCell, FilesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.ORGANISM_AGE,
  id: HCA_DCP_CATEGORY_KEY.ORGANISM_AGE,
  width: { max: "1fr", min: "120px" },
};

const ORGAN_PART: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedSpecimenOrganPart,
  } as ComponentConfig<typeof C.NTagCell, FilesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.ORGAN_PART,
  id: HCA_DCP_CATEGORY_KEY.ORGAN_PART,
  width: { max: "1fr", min: "120px" },
};

const PAIRED_END: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.BasicCell,
    viewBuilder: V.buildAggregatedProtocolPairedEnd,
  } as ComponentConfig<typeof C.BasicCell, FilesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.PAIRED_END,
  id: HCA_DCP_CATEGORY_KEY.PAIRED_END,
  width: { max: "1fr", min: "120px" },
};

const PROJECT_TITLE: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.Link,
    viewBuilder: V.buildAggregatedProjectTitle,
  } as ComponentConfig<typeof C.Link, FilesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.PROJECT_TITLE,
  id: HCA_DCP_CATEGORY_KEY.PROJECT_TITLE,
  width: { max: "2fr", min: "240px" },
};

const SAMPLE_ENTITY_TYPE: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedSampleEntityType,
  } as ComponentConfig<typeof C.NTagCell, FilesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.SAMPLE_ENTITY_TYPE,
  id: HCA_DCP_CATEGORY_KEY.SAMPLE_ENTITY_TYPE,
  width: { max: "1fr", min: "120px" },
};

const SAMPLE_ID: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedSampleId,
  } as ComponentConfig<typeof C.NTagCell, FilesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.SAMPLE_ID,
  id: HCA_DCP_CATEGORY_KEY.SAMPLE_ID,
  width: { max: "1fr", min: "120px" },
};

const SELECTED_CELL_TYPE: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedCellSuspensionSelectedCellType,
  } as ComponentConfig<typeof C.NTagCell, FilesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.SELECTED_CELL_TYPE,
  id: HCA_DCP_CATEGORY_KEY.SELECTED_CELL_TYPE,
  width: { max: "1fr", min: "120px" },
};

const SPECIMEN_DISEASE: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedSpecimenDisease,
  } as ComponentConfig<typeof C.NTagCell, FilesResponse>,
  header: "Disease (Specimen)",
  id: HCA_DCP_CATEGORY_KEY.SPECIMEN_DISEASE,
  width: { max: "1fr", min: "120px" },
};

const SPECIMEN_ORGAN: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedSpecimenOrgan,
  } as ComponentConfig<typeof C.NTagCell, FilesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.SPECIMEN_ORGAN,
  id: HCA_DCP_CATEGORY_KEY.SPECIMEN_ORGAN,
  width: { max: "1fr", min: "120px" },
};

const WORKFLOW: ColumnConfig<FilesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedProtocolWorkflow,
  } as ComponentConfig<typeof C.NTagCell, FilesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.WORKFLOW,
  id: HCA_DCP_CATEGORY_KEY.WORKFLOW,
  width: { max: "1fr", min: "120px" },
};

export const COLUMNS: EntityConfig<FilesResponse>["list"]["columns"] = [
  AZUL_FILE_DOWNLOAD,
  FILE_NAME,
  DATA_USE_RESTRICTION,
  FILE_FORMAT,
  FILE_SIZE,
  WORKFLOW,
  CONTENT_DESCRIPTION,
  FILE_SOURCE,
  PROJECT_TITLE,
  SAMPLE_ID,
  GENUS_SPECIES,
  SAMPLE_ENTITY_TYPE,
  SPECIMEN_ORGAN,
  ORGAN_PART,
  MODEL_ORGAN,
  SELECTED_CELL_TYPE,
  LIBRARY_CONSTRUCTION_APPROACH,
  NUCLEIC_ACID_SOURCE,
  PAIRED_END,
  ORGANISM_AGE,
  BIOLOGICAL_SEX,
  SPECIMEN_DISEASE,
  DONOR_DISEASE,
  DEVELOPMENT_STAGE,
  CELL_COUNT,
];
