import {
  ProjectListResponse,
  ProjectListViewModel,
  ProjectResponse,
  ProjectViewModel,
} from "../models";
import { detailToView, listToView } from "./project";

interface TransformerConfig {
  project: {
    detail: (value: ProjectResponse) => ProjectViewModel;
    list: (value: ProjectListResponse) => ProjectListViewModel;
  };
}

export const TRANSFORMERS: TransformerConfig = {
  project: {
    detail: detailToView,
    list: listToView,
  },
};
