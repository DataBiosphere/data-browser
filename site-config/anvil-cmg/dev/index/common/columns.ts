import { ColumnConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { RowData } from "@tanstack/react-table";
import { ANVIL_CMG_CATEGORY_KEY } from "../../../category";

type ColumnSizing = Pick<ColumnConfig<RowData>, "meta" | "width">;

const DEFAULT_MAX_WIDTH = 280;

// 90th percentile value length in the anvil15 catalog at ~7.4px/char, clamped to 120-400px.
const MAX_WIDTH: Record<string, number> = {
  [ANVIL_CMG_CATEGORY_KEY.ACTIVITY_ACTIVITY_TYPE]: 120,
  [ANVIL_CMG_CATEGORY_KEY.BIOSAMPLE_ANATOMICAL_SITE]: 290,
  [ANVIL_CMG_CATEGORY_KEY.BIOSAMPLE_BIOSAMPLE_TYPE]: 120,
  [ANVIL_CMG_CATEGORY_KEY.DATASET_CONSENT_GROUP]: 150,
  [ANVIL_CMG_CATEGORY_KEY.DATASET_REGISTERED_ID]: 120,
  [ANVIL_CMG_CATEGORY_KEY.DATASET_TITLE]: 400,
  [ANVIL_CMG_CATEGORY_KEY.DIAGNOSE_DISEASE]: 400,
  [ANVIL_CMG_CATEGORY_KEY.DIAGNOSIS_PHENOTYPE]: 400,
  [ANVIL_CMG_CATEGORY_KEY.DONOR_ORGANISM_TYPE]: 120,
  [ANVIL_CMG_CATEGORY_KEY.DONOR_PHENOTYPIC_SEX]: 120,
  [ANVIL_CMG_CATEGORY_KEY.DONOR_REPORTED_ETHNICITY]: 270,
  [ANVIL_CMG_CATEGORY_KEY.FILE_DATA_MODALITY]: 300,
  [ANVIL_CMG_CATEGORY_KEY.FILE_FILE_FORMAT]: 120,
  [ANVIL_CMG_CATEGORY_KEY.FILE_FILE_SIZE]: 120,
};

export function getValueColumnSizing(key: string): ColumnSizing {
  return {
    meta: { maxLines: 2 },
    width: `fit-content(${MAX_WIDTH[key] ?? DEFAULT_MAX_WIDTH}px)`,
  };
}
