import {
  ColumnConfig,
  ComponentConfig,
  EntityConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import { SamplesResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../../app/components";
import * as V from "../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import {
  HCA_DCP_CATEGORY_KEY,
  HCA_DCP_CATEGORY_LABEL,
} from "../../../category";

const BIOLOGICAL_SEX: ColumnConfig<SamplesResponse> = {
  componentConfig: {
    component: C.BasicCell,
    viewBuilder: V.buildAggregatedDonorBiologicalSex,
  } as ComponentConfig<typeof C.BasicCell, SamplesResponse>,
  header: "Sex",
  id: HCA_DCP_CATEGORY_KEY.BIOLOGICAL_SEX,
  width: { max: "1fr", min: "124px" },
};

const CELL_COUNT: ColumnConfig<SamplesResponse> = {
  componentConfig: {
    component: C.BasicCell,
    viewBuilder: V.buildTotalCells,
  } as ComponentConfig<typeof C.BasicCell, SamplesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.CELL_COUNT,
  id: HCA_DCP_CATEGORY_KEY.CELL_COUNT,
  width: { max: "1fr", min: "124px" },
};

const DEVELOPMENT_STAGE: ColumnConfig<SamplesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedDonorDevelopmentStage,
  } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.DEVELOPMENT_STAGE,
  id: HCA_DCP_CATEGORY_KEY.DEVELOPMENT_STAGE,
  width: { max: "1fr", min: "148px" },
};

const DONOR_DISEASE: ColumnConfig<SamplesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedDonorDisease,
  } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
  header: "Disease (Donor)",
  id: HCA_DCP_CATEGORY_KEY.DONOR_DISEASE,
  width: { max: "1fr", min: "124px" },
};

const GENUS_SPECIES: ColumnConfig<SamplesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedDonorGenusSpecies,
  } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
  header: "Species",
  id: HCA_DCP_CATEGORY_KEY.GENUS_SPECIES,
  width: { max: "1fr", min: "124px" },
};

const LIBRARY_CONSTRUCTION_APPROACH: ColumnConfig<SamplesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedProtocolLibraryConstructionApproach,
  } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.LIBRARY_CONSTRUCTION_METHOD,
  id: HCA_DCP_CATEGORY_KEY.LIBRARY_CONSTRUCTION_METHOD,
  width: { max: "1fr", min: "124px" },
};

const MODEL_ORGAN: ColumnConfig<SamplesResponse> = {
  componentConfig: {
    component: C.BasicCell,
    viewBuilder: V.buildSampleModelOrgan,
  } as ComponentConfig<typeof C.BasicCell, SamplesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.MODEL_ORGAN,
  id: HCA_DCP_CATEGORY_KEY.MODEL_ORGAN,
  width: { max: "1fr", min: "124px" },
};

const NUCLEIC_ACID_SOURCE: ColumnConfig<SamplesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedProtocolNucleicAcidSource,
  } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.NUCLEIC_ACID_SOURCE,
  id: HCA_DCP_CATEGORY_KEY.NUCLEIC_ACID_SOURCE,
  width: { max: "1fr", min: "124px" },
};

const ORGANISM_AGE: ColumnConfig<SamplesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedDonorOrganismAge,
  } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.ORGANISM_AGE,
  id: HCA_DCP_CATEGORY_KEY.ORGANISM_AGE,
  width: { max: "1fr", min: "124px" },
};

const ORGAN_PART: ColumnConfig<SamplesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedSpecimenOrganPart,
  } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.ORGAN_PART,
  id: HCA_DCP_CATEGORY_KEY.ORGAN_PART,
  width: { max: "1fr", min: "124px" },
};

const PAIRED_END: ColumnConfig<SamplesResponse> = {
  componentConfig: {
    component: C.BasicCell,
    viewBuilder: V.buildAggregatedProtocolPairedEnd,
  } as ComponentConfig<typeof C.BasicCell, SamplesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.PAIRED_END,
  id: HCA_DCP_CATEGORY_KEY.PAIRED_END,
  width: { max: "1fr", min: "124px" },
};

const PROJECT_TITLE: ColumnConfig<SamplesResponse> = {
  componentConfig: {
    component: C.Link,
    viewBuilder: V.buildAggregatedProjectTitle,
  } as ComponentConfig<typeof C.Link, SamplesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.PROJECT_TITLE,
  id: HCA_DCP_CATEGORY_KEY.PROJECT_TITLE,
  width: { max: "2fr", min: "240px" },
};

const SAMPLE_ENTITY_TYPE: ColumnConfig<SamplesResponse> = {
  componentConfig: {
    component: C.BasicCell,
    viewBuilder: V.buildSampleEntityType,
  } as ComponentConfig<typeof C.BasicCell, SamplesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.SAMPLE_TYPE,
  id: HCA_DCP_CATEGORY_KEY.SAMPLE_ENTITY_TYPE,
  width: { max: "1fr", min: "124px" },
};

const SAMPLE_ID: ColumnConfig<SamplesResponse> = {
  componentConfig: {
    component: C.BasicCell,
    viewBuilder: V.buildSampleId,
  } as ComponentConfig<typeof C.BasicCell, SamplesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.SAMPLE_ID,
  id: HCA_DCP_CATEGORY_KEY.SAMPLE_ID,
  width: { max: "1fr", min: "120px" },
};

const SELECTED_CELL_TYPE: ColumnConfig<SamplesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedCellSuspensionSelectedCellType,
  } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.SELECTED_CELL_TYPE,
  id: HCA_DCP_CATEGORY_KEY.SELECTED_CELL_TYPE,
  width: { max: "1fr", min: "124px" },
};

const SPECIMEN_DISEASE: ColumnConfig<SamplesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedSpecimenDisease,
  } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
  header: "Disease (Specimen)",
  id: HCA_DCP_CATEGORY_KEY.SPECIMEN_DISEASE,
  width: { max: "1fr", min: "124px" },
};

const SPECIMEN_ORGAN: ColumnConfig<SamplesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedSpecimenOrgan,
  } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.ANATOMICAL_ENTITY,
  id: HCA_DCP_CATEGORY_KEY.ANATOMICAL_ENTITY,
  width: { max: "1fr", min: "124px" },
};

const WORKFLOW: ColumnConfig<SamplesResponse> = {
  componentConfig: {
    component: C.NTagCell,
    viewBuilder: V.buildAggregatedProtocolWorkflow,
  } as ComponentConfig<typeof C.NTagCell, SamplesResponse>,
  header: HCA_DCP_CATEGORY_LABEL.WORKFLOW,
  id: HCA_DCP_CATEGORY_KEY.WORKFLOW,
  width: { max: "1fr", min: "124px" },
};

export const COLUMNS: EntityConfig<SamplesResponse>["list"]["columns"] = [
  SAMPLE_ID,
  PROJECT_TITLE,
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
  ORGANISM_AGE,
  BIOLOGICAL_SEX,
  SPECIMEN_DISEASE,
  DONOR_DISEASE,
  DEVELOPMENT_STAGE,
  CELL_COUNT,
];
