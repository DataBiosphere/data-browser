/**
 * Container component that will wrap all presentational components used by an entity detail page
 */
import { Layout } from "app/components/Layout/Layout";
import { ComponentCreator } from "app/components/ComponentCreator/ComponentCreator";
import { useCurrentEntity } from "app/hooks/useCurrentEntity";
import { useFetchEntity } from "app/hooks/useFetchEntity";
import { DetailResponseType } from "app/models/responses";
import React from "react";
import { DetailModel } from "../../models/viewModels";

export const DetailContainer = (props: DetailModel) => {
  const { response, isLoading } = useFetchEntity(props);
  const entity = useCurrentEntity();
  const mainColumn = entity?.detail?.mainColumn;
  const sideColumn = entity?.detail?.sideColumn;

  if (isLoading || !response) {
    return <span>LOADING...</span>; //TODO: return the loading UI component
  }

  if (!mainColumn || !sideColumn) {
    return null;
  }

  return (
    <Layout
      mainColumn={
        <ComponentCreator<DetailResponseType>
          components={mainColumn}
          response={response}
        />
      }
      sideColumn={
        <ComponentCreator<DetailResponseType>
          components={sideColumn}
          response={response}
        />
      }
    />
  );
};
