import { DetailResponseType, ListResponseType } from "app/models/responses";
import { DetailViewModel, ListViewModel } from "app/models/viewModels";
import { HeaderProps } from "../components/Header/Header";

type ListTransformerFunction<T extends ListResponseType> = (
  response: T
) => ListViewModel;

type DetailTransformerFunction<T extends DetailResponseType> = (
  response: T
) => DetailViewModel;

type GetIdFunction<T extends DetailResponseType> = (detail: T) => string;

export interface EntityConfig<
  L extends ListResponseType = any,
  D extends DetailResponseType = any
> {
  label: string;
  route: string;
  apiPath: string;
  listTransformer: ListTransformerFunction<L>;
  detailTransformer: DetailTransformerFunction<D>;
  getId?: GetIdFunction<D>;
  staticLoad?: boolean;
}

export interface SiteConfig {
  redirectRootToPath?: string;
  datasources: {
    catalog: string;
    url: string;
  };
  layout: {
    header: HeaderProps;
  };
  entities: EntityConfig[];
}
