import { DetailResponseType } from "./responses";

//Project
export interface DetailModel {
  data?: DetailResponseType;
}

export interface ItemViewModel {
  uuid: string;
  name: string;
}

export interface ListViewModel {
  items: ItemViewModel[];
}
