import { Table as MTable } from "@mui/material";
import { TableContainer } from "./table.styles";
import { JSX } from "react";

export const Table = ({ ...props }): JSX.Element => {
  return (
    <TableContainer>
      <MTable>{props.children}</MTable>
    </TableContainer>
  );
};
