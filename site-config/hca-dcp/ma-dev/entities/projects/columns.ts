import {
  ColumnConfig,
  ComponentConfig,
  EntityConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import { ProjectsResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../../app/components";
import * as V from "../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import {
  HCA_DCP_CATEGORY_KEY,
  HCA_DCP_CATEGORY_LABEL,
} from "../../../category";

const ACCESSIBLE: ColumnConfig<ProjectsResponse> = {
  componentConfig: {
    component: C.StatusBadge,
    viewBuilder: V.buildProjectAccess,
  } as ComponentConfig<typeof C.StatusBadge, ProjectsResponse>,
  enableSorting: false,
  header: HCA_DCP_CATEGORY_LABEL.ACCESSIBLE,
  id: HCA_DCP_CATEGORY_KEY.ACCESSIBLE,
  width: "auto",
};

const AGGREGATE_LAST_MODIFIED_DATE: ColumnConfig<ProjectsResponse> = {
  componentConfig: {
    component: C.BasicCell,
    viewBuilder: V.buildAggregateLastModifiedDate,
  } as ComponentConfig<typeof C.BasicCell, ProjectsResponse>,
  header: HCA_DCP_CATEGORY_LABEL.AGGREGATE_LAST_MODIFIED_DATE,
  id: HCA_DCP_CATEGORY_KEY.AGGREGATE_LAST_MODIFIED_DATE,
  width: { max: "1fr", min: "224px" },
};

const AGGREGATE_SUBMISSION_DATE: ColumnConfig<ProjectsResponse> = {
  componentConfig: {
    component: C.BasicCell,
    viewBuilder: V.buildAggregateSubmissionDate,
  } as ComponentConfig<typeof C.BasicCell, ProjectsResponse>,
  header: HCA_DCP_CATEGORY_LABEL.AGGREGATE_SUBMISSION_DATE,
  id: HCA_DCP_CATEGORY_KEY.AGGREGATE_SUBMISSION_DATE,
  width: { max: "1fr", min: "224px" },
};

const BIONETWORK_NAME: ColumnConfig<ProjectsResponse> = {
  componentConfig: {
    component: C.BioNetworkCell,
    viewBuilder: V.buildBioNetwork,
  } as ComponentConfig<typeof C.BioNetworkCell, ProjectsResponse>,
  header: HCA_DCP_CATEGORY_LABEL.BIONETWORK_NAME,
  id: HCA_DCP_CATEGORY_KEY.BIONETWORK_NAME,
  width: { max: "1fr", min: "126px" },
};

const DATA_USE_RESTRICTION: ColumnConfig<ProjectsResponse> = {
  componentConfig: {
    component: C.BasicCell,
    viewBuilder: V.buildDataUseRestriction,
  } as ComponentConfig<typeof C.BasicCell, ProjectsResponse>,
  header: HCA_DCP_CATEGORY_LABEL.DATA_USE_RESTRICTION,
  id: HCA_DCP_CATEGORY_KEY.DATA_USE_RESTRICTION,
  width: { max: "1fr", min: "124px" },
};

const DEVELOPMENT_STAGE: ColumnConfig<ProjectsResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedDonorDevelopmentStage,
  } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
  header: HCA_DCP_CATEGORY_LABEL.DEVELOPMENT_STAGE,
  id: HCA_DCP_CATEGORY_KEY.DEVELOPMENT_STAGE,
  width: { max: "1fr", min: "148px" },
};

const DONOR_COUNT: ColumnConfig<ProjectsResponse> = {
  componentConfig: {
    component: C.BasicCell,
    viewBuilder: V.buildAggregatedDonorCount,
  } as ComponentConfig<typeof C.BasicCell, ProjectsResponse>,
  header: HCA_DCP_CATEGORY_LABEL.DONOR_COUNT,
  id: HCA_DCP_CATEGORY_KEY.DONOR_COUNT,
  width: { max: "1fr", min: "124px" },
};

const DONOR_DISEASE: ColumnConfig<ProjectsResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedDonorDisease,
  } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
  header: "Disease (Donor)",
  id: HCA_DCP_CATEGORY_KEY.DONOR_DISEASE,
  width: { max: "1fr", min: "128px" },
};

const EFFECTIVE_CELL_COUNT: ColumnConfig<ProjectsResponse> = {
  componentConfig: {
    component: C.BasicCell,
    viewBuilder: V.buildEstimateCellCount,
  } as ComponentConfig<typeof C.BasicCell, ProjectsResponse>,
  header: HCA_DCP_CATEGORY_LABEL.EFFECTIVE_CELL_COUNT,
  id: HCA_DCP_CATEGORY_KEY.EFFECTIVE_CELL_COUNT,
  width: { max: "1fr", min: "124px" },
};

const GENUS_SPECIES: ColumnConfig<ProjectsResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedDonorGenusSpecies,
  } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
  header: "Species",
  id: HCA_DCP_CATEGORY_KEY.GENUS_SPECIES,
  width: { max: "1fr", min: "136px" },
};

const LIBRARY_CONSTRUCTION_APPROACH: ColumnConfig<ProjectsResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedProtocolLibraryConstructionApproach,
  } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
  header: HCA_DCP_CATEGORY_LABEL.LIBRARY_CONSTRUCTION_METHOD,
  id: HCA_DCP_CATEGORY_KEY.LIBRARY_CONSTRUCTION_METHOD,
  width: { max: "1fr", min: "126px" },
};

const MODEL_ORGAN: ColumnConfig<ProjectsResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedSampleModelOrgan,
  } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
  header: HCA_DCP_CATEGORY_LABEL.MODEL_ORGAN,
  id: HCA_DCP_CATEGORY_KEY.MODEL_ORGAN,
  width: { max: "1fr", min: "146px" },
};

const NUCLEIC_ACID_SOURCE: ColumnConfig<ProjectsResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedProtocolNucleicAcidSource,
  } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
  header: HCA_DCP_CATEGORY_LABEL.NUCLEIC_ACID_SOURCE,
  id: HCA_DCP_CATEGORY_KEY.NUCLEIC_ACID_SOURCE,
  width: { max: "1fr", min: "146px" },
};

const ORGAN_PART: ColumnConfig<ProjectsResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedSpecimenOrganPart,
  } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
  header: HCA_DCP_CATEGORY_LABEL.ORGAN_PART,
  id: HCA_DCP_CATEGORY_KEY.ORGAN_PART,
  width: { max: "1fr", min: "146px" },
};

const PAIRED_END: ColumnConfig<ProjectsResponse> = {
  componentConfig: {
    component: C.BasicCell,
    viewBuilder: V.buildAggregatedProtocolPairedEnd,
  } as ComponentConfig<typeof C.BasicCell, ProjectsResponse>,
  header: HCA_DCP_CATEGORY_LABEL.PAIRED_END,
  id: HCA_DCP_CATEGORY_KEY.PAIRED_END,
  width: { max: "1fr", min: "146px" },
};

const PROJECT_TITLE: ColumnConfig<ProjectsResponse> = {
  componentConfig: {
    component: C.Link,
    viewBuilder: V.buildProjectTitle,
  } as ComponentConfig<typeof C.Link, ProjectsResponse>,
  header: HCA_DCP_CATEGORY_LABEL.PROJECT_TITLE,
  id: HCA_DCP_CATEGORY_KEY.PROJECT_TITLE,
  width: { max: "2fr", min: "374px" },
};

const SAMPLE_ENTITY_TYPE: ColumnConfig<ProjectsResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedSampleEntityType,
  } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
  header: HCA_DCP_CATEGORY_LABEL.SAMPLE_ENTITY_TYPE,
  id: HCA_DCP_CATEGORY_KEY.SAMPLE_ENTITY_TYPE,
  width: { max: "1fr", min: "148px" },
};

const SELECTED_CELL_TYPE: ColumnConfig<ProjectsResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedCellSuspensionSelectedCellType,
  } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
  header: HCA_DCP_CATEGORY_LABEL.SELECTED_CELL_TYPE,
  id: HCA_DCP_CATEGORY_KEY.SELECTED_CELL_TYPE,
  width: { max: "1fr", min: "146px" },
};

const SPECIMEN_DISEASE: ColumnConfig<ProjectsResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedSpecimenDisease,
  } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
  header: "Disease (Specimen)",
  id: HCA_DCP_CATEGORY_KEY.SPECIMEN_DISEASE,
  width: { max: "1fr", min: "146px" },
};

const SPECIMEN_ORGAN: ColumnConfig<ProjectsResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedSpecimenOrgan,
  } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
  header: HCA_DCP_CATEGORY_LABEL.ANATOMICAL_ENTITY,
  id: HCA_DCP_CATEGORY_KEY.ANATOMICAL_ENTITY,
  width: { max: "1fr", min: "146px" },
};

const WORKFLOW: ColumnConfig<ProjectsResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedProtocolWorkflow,
  } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
  header: HCA_DCP_CATEGORY_LABEL.WORKFLOW,
  id: HCA_DCP_CATEGORY_KEY.WORKFLOW,
  width: { max: "1fr", min: "146px" },
};

export const COLUMNS: EntityConfig<ProjectsResponse>["list"]["columns"] = [
  PROJECT_TITLE,
  ACCESSIBLE,
  DATA_USE_RESTRICTION,
  BIONETWORK_NAME,
  GENUS_SPECIES,
  SAMPLE_ENTITY_TYPE,
  SPECIMEN_ORGAN,
  ORGAN_PART,
  MODEL_ORGAN,
  SELECTED_CELL_TYPE,
  LIBRARY_CONSTRUCTION_APPROACH,
  NUCLEIC_ACID_SOURCE,
  PAIRED_END,
  WORKFLOW,
  SPECIMEN_DISEASE,
  DONOR_DISEASE,
  DEVELOPMENT_STAGE,
  DONOR_COUNT,
  EFFECTIVE_CELL_COUNT,
  AGGREGATE_SUBMISSION_DATE,
  AGGREGATE_LAST_MODIFIED_DATE,
];
