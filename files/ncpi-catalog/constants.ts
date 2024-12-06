export const tsvPath = "ncpi-catalog/files/dashboard-source-ncpi.tsv";

export enum Platform {
  ANVIL = "AnVIL",
  BDC = "BDC",
  CRDC = "CRDC",
  KFDRC = "KFDRC",
}

const SOURCE_HEADER_KEY = {
  DB_GAP_ID: "identifier",
  PLATFORM: "platform",
};

export const SOURCE_FIELD_KEY = {
  [SOURCE_HEADER_KEY.DB_GAP_ID]: "dbGapId",
  [SOURCE_HEADER_KEY.PLATFORM]: "platform",
};

export const SOURCE_FIELD_TYPE = {
  [SOURCE_HEADER_KEY.DB_GAP_ID]: "string",
  [SOURCE_HEADER_KEY.PLATFORM]: "string",
};
