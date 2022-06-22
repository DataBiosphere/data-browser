/**
 * Container component that will wrap all presentational components used by an entity detail page
 */

// Core dependencies
import React from "react";

// App dependencies
import { ComponentCreator } from "app/components/ComponentCreator/ComponentCreator";
import { Layout } from "app/components/Layout/Layout";
import { useCurrentEntity } from "app/hooks/useCurrentEntity";
import { useFetchEntity } from "app/hooks/useFetchEntity";
import { DetailResponseType } from "app/models/responses";
import { DetailModel } from "../../models/viewModels";

export const DetailContainer = (props: DetailModel) => {
  const { response, isLoading } = useFetchEntity(props);
  const entity = useCurrentEntity();
  const mainColumn = entity?.detail?.mainColumn;
  const sideColumn = entity?.detail?.sideColumn;
  const top = entity?.detail?.top;

  if (isLoading || !response) {
    return <span>LOADING...</span>; //TODO: return the loading UI component
  }

  if (!mainColumn || !sideColumn || !top) {
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
      top={
        <ComponentCreator<DetailResponseType>
          components={top}
          response={response}
        />
      }
    />
  );
};
