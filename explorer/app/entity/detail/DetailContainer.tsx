/**
 * Container component that will wrap all presentational components used by an entity detail page
 */
import { useEntityDetailData } from "app/hooks/useEntityData";
import React from "react";
import { PrettyJSON } from "../../components/PrettyJSON/PrettyJSON";
import { DetailViewModel } from "../../models/viewModels";

export const DetailContainer = (props: DetailViewModel) => {
  const { data, isLoading } = useEntityDetailData(props);

  if (isLoading || !data) {
    return <span>LOADING...</span>; //TODO: return the loading UI component
  }

  const { detailName, json } = data;

  return (
    <>
      <h1>{detailName}</h1>
      {json && <PrettyJSON value={json} />}
    </>
  );
};
