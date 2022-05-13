/**
 * Container component that will wrap all presentational components used by the project's detail page
 */
import React from "react";
import { PrettyJSON } from "../../components";
import { ProjectViewModel } from "../../models";

export const ProjectDetailContainer = ({
  json,
  projectName,
}: ProjectViewModel) => {
  return (
    <>
      <h1>{projectName}</h1>
      <PrettyJSON value={json} />
    </>
  );
};
