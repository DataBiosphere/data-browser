import styled from "@emotion/styled";
import { Table as MTable } from "@mui/material";

interface Props {
  gridTemplateColumns: string;
}

export const Table = styled(MTable, {
  shouldForwardProp: (prop) => prop !== "gridTemplateColumns",
})<Props>`
  align-items: stretch;
  display: grid;
  gap: 1px 0;
  grid-template-columns: ${(props) => props.gridTemplateColumns};

  tbody,
  thead,
  tr {
    display: contents; /* required; allows grandchildren of grid template to appear as though direct child */
  }

  td,
  tfoot,
  th {
    background-color: ${({ theme }) => theme.palette.common.white};
  }

  td,
  th {
    align-items: center;
    border-bottom: none;
    display: flex; /* required; consumes 100% row height */
    overflow-wrap: break-word;
  }

  tfoot {
    grid-column: 1 / -1; /* spans full allocation of grid */
  }
`;

export const TableToolbar = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.common.white};
  display: flex;
  justify-content: flex-end;
  padding: 20px;
`;
