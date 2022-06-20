import { DetailResponseType, ListResponseType } from "./responses";

//Project
export interface DetailModel {
  data?: DetailResponseType;
}

export interface ItemViewModel {
  uuid: string;
  name: string;
}

export interface ListModel {
  data?: ListResponseType;
}
