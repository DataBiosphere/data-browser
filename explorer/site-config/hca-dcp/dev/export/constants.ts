import { HCA_DCP_CATEGORY_KEY } from "../../category";

export const FORM_FACETS = [
  { key: HCA_DCP_CATEGORY_KEY.GENUS_SPECIES, label: "Species" },
  {
    key: HCA_DCP_CATEGORY_KEY.FILE_FORMAT,
    label: "File Type",
  },
];

export const ROUTE_BULK_DOWNLOAD = "/export/get-curl-command";
export const ROUTE_EXPORT_TO_TERRA = "/export/export-to-terra";
