import { AzulHit } from "../../common/entities";
import { FilesEntityResponse } from "./entities";
import { AggregatedProjectResponse } from "./aggregatedEntities";

export type FilesResponse = AzulHit &
  FilesEntityResponse &
  AggregatedProjectResponse;
