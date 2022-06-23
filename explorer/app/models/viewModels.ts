import { ListResponseType } from "./responses";

//Project
export interface DetailModel<T = any> {
  data?: T;
}

export interface ItemViewModel {
  uuid: string;
  name: string;
}

export interface ListModel {
  data?: ListResponseType;
}
