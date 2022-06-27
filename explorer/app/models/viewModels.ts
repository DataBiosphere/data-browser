import { ListResponseType } from "./responses";

//Project
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- this data type can't be determined beforehand
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
