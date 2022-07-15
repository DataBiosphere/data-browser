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
  th {
    background-color: ${({ theme }) => theme.palette.common.white};
  }

  td,
  th {
    align-items: center;
    border-bottom: none;
    display: flex; /* required; consumes 100% row height */
    overflow-wrap: break-word;

    > * {
      min-width: 0; /* required; flexbox child min-width property is "auto" by default making overflow-wrap ineffectual */
    }
  }
`;

export const TableToolbar = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.common.white};
  color: ${({ theme }) => theme.palette.ink};
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;
