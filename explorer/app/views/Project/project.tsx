// Core dependencies
import React from "react";

// App dependencies
import { ComponentCreator } from "app/components/ComponentCreator/ComponentCreator";
import { Project as ProjectView } from "app/components/Project/project";
import { useCurrentEntity } from "app/hooks/useCurrentEntity";
import { useFetchEntity } from "app/hooks/useFetchEntity";
import { DetailModel } from "../../models/viewModels";

export const Project = (props: DetailModel) => {
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
    <ProjectView
      mainColumn={
        <ComponentCreator components={mainColumn} response={response} />
      }
      sideColumn={
        <ComponentCreator components={sideColumn} response={response} />
      }
      top={<ComponentCreator components={top} response={response} />}
    />
  );
};
