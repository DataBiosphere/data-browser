import { SiteConfig } from "../../../common/entities";
import { CATEGORY_CONFIG } from "../../../hca-dcp/ma-dev/categoryGroup/categoryGroupConfig";

export const CATEGORY_GROUP_CONFIG: SiteConfig["categoryGroupConfig"] = {
  categoryGroups: [
    {
      categoryConfigs: [
        CATEGORY_CONFIG.PROJECT_TITLE,
        CATEGORY_CONFIG.CONTACT_NAME,
        CATEGORY_CONFIG.INSTITUTION,
      ],
      label: "Project",
    },
    {
      categoryConfigs: [
        CATEGORY_CONFIG.BIOLOGICAL_SEX,
        CATEGORY_CONFIG.DEVELOPMENT_STAGE,
        CATEGORY_CONFIG.DONOR_DISEASE,
        CATEGORY_CONFIG.GENUS_SPECIES,
      ],
      label: "Donor",
    },
    {
      categoryConfigs: [
        CATEGORY_CONFIG.SPECIMEN_ORGAN,
        CATEGORY_CONFIG.ORGAN_PART,
        CATEGORY_CONFIG.PRESERVATION_METHOD,
        CATEGORY_CONFIG.MODEL_ORGAN,
        CATEGORY_CONFIG.SAMPLE_ENTITY_TYPE,
        CATEGORY_CONFIG.SELECTED_CELL_TYPE,
        CATEGORY_CONFIG.SPECIMEN_DISEASE,
      ],
      label: "Sample",
    },
    {
      categoryConfigs: [
        CATEGORY_CONFIG.WORKFLOW,
        CATEGORY_CONFIG.INSTRUMENT_MANUFACTURER_MODEL,
        CATEGORY_CONFIG.LIBRARY_CONSTRUCTION_APPROACH,
        CATEGORY_CONFIG.NUCLEIC_ACID_SOURCE,
        CATEGORY_CONFIG.PAIRED_END,
      ],
      label: "Protocol",
    },
    {
      categoryConfigs: [
        CATEGORY_CONFIG.CONTENT_DESCRIPTION,
        CATEGORY_CONFIG.FILE_FORMAT,
        CATEGORY_CONFIG.FILE_SOURCE,
      ],
      label: "File",
    },
  ],
  key: "lungmap",
};
