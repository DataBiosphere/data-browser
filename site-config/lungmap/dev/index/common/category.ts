import { CategoryGroup } from "@databiosphere/findable-ui/lib/config/entities";
import {
  ANALYSIS_PROTOCOL,
  ANATOMICAL_ENTITY,
  BIOLOGICAL_SEX,
  CONTACT_NAME,
  CONTENT_DESCRIPTION,
  DEVELOPMENT_STAGE,
  DONOR_DISEASE,
  FILE_FORMAT,
  FILE_SOURCE,
  GENUS_SPECIES,
  INSTITUTION,
  INSTRUMENT_MANUFACTURER_MODEL,
  LIBRARY_CONSTRUCTION_METHOD,
  MODEL_ORGAN,
  NUCLEIC_ACID_SOURCE,
  ORGAN_PART,
  PAIRED_END,
  PRESERVATION_METHOD,
  PROJECT_TITLE,
  SAMPLE_ENTITY_TYPE,
  SELECTED_CELL_TYPE,
  SPECIMEN_DISEASE,
} from "../../../../hca-dcp/dev/index/common/category";

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
    categoryConfigs: [PROJECT_TITLE, CONTACT_NAME, INSTITUTION],
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
