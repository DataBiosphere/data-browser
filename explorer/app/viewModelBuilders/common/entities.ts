// eslint-disable-next-line @typescript-eslint/no-explicit-any -- type is unused and therefore possibly unknown.
export type Unused = any;

export interface Override {
  deprecated?: boolean;
  duplicateOf?: string;
  entryId: string;
  redirectUrl?: string;
  supersededBy?: string;
  withdrawn?: boolean;
}
