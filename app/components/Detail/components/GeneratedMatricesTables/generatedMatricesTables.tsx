import { ALERT_PROPS } from "@databiosphere/findable-ui/lib/components/common/Alert/constants";
import { GridPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { Table } from "@databiosphere/findable-ui/lib/components/Detail/components/Table/table";
import { COLUMN_IDENTIFIER } from "@databiosphere/findable-ui/lib/components/Table/common/columnIdentifier";
import { Divider } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { Fragment } from "react";
import { GenusSpecies } from "../../../../viewModelBuilders/azul/hca-dcp/common/projectMatrixMapper/constants";
import { ProjectMatrixTableView } from "../../../../viewModelBuilders/azul/hca-dcp/common/projectMatrixMapper/entities";
import { SectionTitle, StyledAlert } from "./generatedMatricesTables.styles";

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
                    tableOptions={{
                      initialState: {
                        columnVisibility: {
                          [COLUMN_IDENTIFIER.ROW_POSITION]: false,
                        },
                      },
                    }}
                  />
                </GridPaper>
              </Fragment>
            );
          }
        )
      ) : (
        <StyledAlert {...ALERT_PROPS.FILLED_SMOKE} icon={false}>
          There are currently no DCP generated matrices for this project.
        </StyledAlert>
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
