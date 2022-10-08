/**
 * Response from Dug API call
 */

export interface DugVariableResponse {
  result: DugDbGapResponse;
  status: string;
}

export interface DugDbGapResponse {
  DBGapId: DugVariableResponseElement[];
}

export interface DugVariableResponseElement {
  "dbGap Id": string;
}
