/**
 * Container component that will wrap all presentational components used by an entity detail page
 */
import { Layout } from "app/components";
import { ComponentCreator } from "app/components/ComponentCreator/ComponentCreator";
import { useConfig } from "app/hooks/useConfig";
import { useFetchEntity } from "app/hooks/useFetchEntity";
import { DetailResponseType } from "app/models/responses";
import React from "react";
import { DetailModel } from "../../models/viewModels";

export const DetailContainer = (props: DetailModel) => {
  const { response, isLoading } = useFetchEntity(props);
  const config = useConfig();
  const mainColumn = config.detail?.mainColumn;
  const sideColumn = config.detail?.sideColumn;

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
