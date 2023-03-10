import { GridPaper } from "@clevercanary/data-explorer-ui/lib/components/common/Paper/paper.styles";
import { Table } from "@clevercanary/data-explorer-ui/lib/components/Detail/components/Table/table";
import { Divider } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import React, { Fragment } from "react";
import { GenusSpecies } from "../../../../viewModelBuilders/azul/common/constants";
import { ProjectMatrixTableView } from "../../../../viewModelBuilders/azul/common/entities";
import { Alert, SectionTitle } from "./generatedMatricesTables.styles";

interface GeneratedMatricesTablesProps<T extends object> {
  columns: ColumnDef<T>[];
  gridTemplateColumns: string;
  projectMatrixViewsBySpecies: ProjectMatrixTableView[];
}

export const GeneratedMatricesTables = <T extends object>({
  columns,
  gridTemplateColumns,
  projectMatrixViewsBySpecies,
}: GeneratedMatricesTablesProps<T>): JSX.Element => {
  return (
    <>
      {projectMatrixViewsBySpecies.length > 0 ? (
        projectMatrixViewsBySpecies.map(
          ({ projectMatrixViews, species }, i) => {
            const title = getSpeciesDisplayText(species);
            const items = projectMatrixViews as T[]; // TODO review type assertion.
            return (
              <Fragment key={title}>
                {i > 0 && <Divider />}
                <SectionTitle>{title}</SectionTitle>
                <Divider />
                <GridPaper>
                  <Table
                    columns={columns}
                    gridTemplateColumns={gridTemplateColumns}
                    items={items}
                  />
                </GridPaper>
              </Fragment>
            );
          }
        )
      ) : (
        <Alert icon={false} severity="info" variant="neutral">
          There are currently no DCP generated matrices for this project.
        </Alert>
      )}
    </>
  );
};

/**
 * Return the display text for the specified set of species.
 * @param species - A list of genus specie.
 * @returns species display text.
 */
function getSpeciesDisplayText(species: GenusSpecies[]): string {
  return species.join(", ");
}
