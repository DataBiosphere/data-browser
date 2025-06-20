import { CategoryGroup } from "@databiosphere/findable-ui/lib/config/entities";
import { CategoryConfig } from "@databiosphere/findable-ui/lib/common/categories/config/types";
import {
  HCA_DCP_CATEGORY_KEY,
  HCA_DCP_CATEGORY_LABEL,
} from "../../../category";

export const ANALYSIS_PROTOCOL: CategoryConfig = {
  key: HCA_DCP_CATEGORY_KEY.ANALYSIS_PROTOCOL,
  label: HCA_DCP_CATEGORY_LABEL.ANALYSIS_PROTOCOL,
};

export const ANATOMICAL_ENTITY: CategoryConfig = {
  key: HCA_DCP_CATEGORY_KEY.ANATOMICAL_ENTITY,
  label: HCA_DCP_CATEGORY_LABEL.ANATOMICAL_ENTITY,
};

export const BIOLOGICAL_SEX: CategoryConfig = {
  key: HCA_DCP_CATEGORY_KEY.BIOLOGICAL_SEX,
  label: HCA_DCP_CATEGORY_LABEL.BIOLOGICAL_SEX,
};

export const BIONETWORK_NAME: CategoryConfig = {
  key: HCA_DCP_CATEGORY_KEY.BIONETWORK_NAME,
  label: HCA_DCP_CATEGORY_LABEL.BIONETWORK_NAME,
};

export const CONTACT_NAME: CategoryConfig = {
  enableChartView: false,
  key: HCA_DCP_CATEGORY_KEY.CONTACT_NAME,
  label: HCA_DCP_CATEGORY_LABEL.CONTACT_NAME,
};

export const CONTENT_DESCRIPTION: CategoryConfig = {
  key: HCA_DCP_CATEGORY_KEY.CONTENT_DESCRIPTION,
  label: HCA_DCP_CATEGORY_LABEL.CONTENT_DESCRIPTION,
};

export const DEVELOPMENT_STAGE: CategoryConfig = {
  enableChartView: false,
  key: HCA_DCP_CATEGORY_KEY.DEVELOPMENT_STAGE,
  label: HCA_DCP_CATEGORY_LABEL.DEVELOPMENT_STAGE,
};

export const DONOR_DISEASE: CategoryConfig = {
  enableChartView: false,
  key: HCA_DCP_CATEGORY_KEY.DONOR_DISEASE,
  label: HCA_DCP_CATEGORY_LABEL.DONOR_DISEASE,
};

export const FILE_FORMAT: CategoryConfig = {
  key: HCA_DCP_CATEGORY_KEY.FILE_FORMAT,
  label: HCA_DCP_CATEGORY_LABEL.FILE_FORMAT,
};

export const FILE_SOURCE: CategoryConfig = {
  key: HCA_DCP_CATEGORY_KEY.FILE_SOURCE,
  label: HCA_DCP_CATEGORY_LABEL.FILE_SOURCE,
};

export const GENUS_SPECIES: CategoryConfig = {
  key: HCA_DCP_CATEGORY_KEY.GENUS_SPECIES,
  label: HCA_DCP_CATEGORY_LABEL.GENUS_SPECIES,
};

export const INSTITUTION: CategoryConfig = {
  enableChartView: false,
  key: HCA_DCP_CATEGORY_KEY.INSTITUTION,
  label: HCA_DCP_CATEGORY_LABEL.INSTITUTION,
};

export const INSTRUMENT_MANUFACTURER_MODEL: CategoryConfig = {
  key: HCA_DCP_CATEGORY_KEY.INSTRUMENT_MANUFACTURER_MODEL,
  label: HCA_DCP_CATEGORY_LABEL.INSTRUMENT_MANUFACTURER_MODEL,
};

export const LIBRARY_CONSTRUCTION_METHOD: CategoryConfig = {
  key: HCA_DCP_CATEGORY_KEY.LIBRARY_CONSTRUCTION_METHOD,
  label: HCA_DCP_CATEGORY_LABEL.LIBRARY_CONSTRUCTION_METHOD,
};

export const MODEL_ORGAN: CategoryConfig = {
  key: HCA_DCP_CATEGORY_KEY.MODEL_ORGAN,
  label: HCA_DCP_CATEGORY_LABEL.MODEL_ORGAN,
};

export const NUCLEIC_ACID_SOURCE: CategoryConfig = {
  key: HCA_DCP_CATEGORY_KEY.NUCLEIC_ACID_SOURCE,
  label: HCA_DCP_CATEGORY_LABEL.NUCLEIC_ACID_SOURCE,
};

export const ORGAN_PART: CategoryConfig = {
  key: HCA_DCP_CATEGORY_KEY.ORGAN_PART,
  label: HCA_DCP_CATEGORY_LABEL.ORGAN_PART,
};

export const PAIRED_END: CategoryConfig = {
  key: HCA_DCP_CATEGORY_KEY.PAIRED_END,
  label: HCA_DCP_CATEGORY_LABEL.PAIRED_END,
};

export const PRESERVATION_METHOD: CategoryConfig = {
  key: HCA_DCP_CATEGORY_KEY.PRESERVATION_METHOD,
  label: HCA_DCP_CATEGORY_LABEL.PRESERVATION_METHOD,
};

export const PROJECT_TITLE: CategoryConfig = {
  enableChartView: false,
  key: HCA_DCP_CATEGORY_KEY.PROJECT_TITLE,
  label: HCA_DCP_CATEGORY_LABEL.PROJECT_TITLE,
};

export const SAMPLE_ENTITY_TYPE: CategoryConfig = {
  key: HCA_DCP_CATEGORY_KEY.SAMPLE_ENTITY_TYPE,
  label: HCA_DCP_CATEGORY_LABEL.SAMPLE_ENTITY_TYPE,
};

export const SELECTED_CELL_TYPE: CategoryConfig = {
  key: HCA_DCP_CATEGORY_KEY.SELECTED_CELL_TYPE,
  label: HCA_DCP_CATEGORY_LABEL.SELECTED_CELL_TYPE,
};

export const SPECIMEN_DISEASE: CategoryConfig = {
  key: HCA_DCP_CATEGORY_KEY.SPECIMEN_DISEASE,
  label: HCA_DCP_CATEGORY_LABEL.SPECIMEN_DISEASE,
};

export const CATEGORY_GROUP: Record<string, CategoryGroup> = {
  DONOR: {
    categoryConfigs: [
      BIOLOGICAL_SEX,
      DEVELOPMENT_STAGE,
      DONOR_DISEASE,
      GENUS_SPECIES,
    ],
    label: "Donor",
  },
  FILE: {
    categoryConfigs: [CONTENT_DESCRIPTION, FILE_FORMAT, FILE_SOURCE],
    label: "File",
  },
  PROJECT: {
    categoryConfigs: [
      PROJECT_TITLE,
      CONTACT_NAME,
      INSTITUTION,
      BIONETWORK_NAME,
    ],
    label: "Project",
  },
  PROTOCOL: {
    categoryConfigs: [
      ANALYSIS_PROTOCOL, // workflow
      INSTRUMENT_MANUFACTURER_MODEL,
      LIBRARY_CONSTRUCTION_METHOD,
      NUCLEIC_ACID_SOURCE,
      PAIRED_END,
    ],
    label: "Protocol",
  },
  SAMPLE: {
    categoryConfigs: [
      ANATOMICAL_ENTITY, // specimenOrgan
      ORGAN_PART,
      PRESERVATION_METHOD,
      MODEL_ORGAN,
      SAMPLE_ENTITY_TYPE,
      SELECTED_CELL_TYPE,
      SPECIMEN_DISEASE,
    ],
    label: "Sample",
  },
};

export const CATEGORY_GROUPS: CategoryGroup[] = [
  CATEGORY_GROUP.PROJECT,
  CATEGORY_GROUP.DONOR,
  CATEGORY_GROUP.SAMPLE,
  CATEGORY_GROUP.PROTOCOL,
  CATEGORY_GROUP.FILE,
];
