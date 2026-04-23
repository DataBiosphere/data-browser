import { Table as MTable } from "@mui/material";
import { JSX } from "react";
import { TableContainer } from "./table.styles";

export const Table = ({ ...props }): JSX.Element => {
  return (
    <TableContainer>
      <MTable>{props.children}</MTable>
    </TableContainer>
  );
};
