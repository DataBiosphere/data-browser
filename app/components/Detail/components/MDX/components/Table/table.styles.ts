import { smokeMain } from "@databiosphere/findable-ui/lib/styles/common/mixins/colors";
import {
  textBody400,
  textBody500,
} from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";
import { TableContainer as MTableContainer } from "@mui/material";

/**
 * Table style component. TODO De-dupe with Table component in the Portal.
 */
export const TableContainer = styled(MTableContainer)`
  margin: 24px 0;

  .MuiTable-root {
    min-width: calc(390px - 32px);

    tr {
      td,
      th {
        border-bottom: 1px solid ${smokeMain};
        padding: 12px;
        text-align: left;

        &:first-of-type {
          padding-left: 0;
        }

        &:last-of-type {
          padding-right: 0;
        }
      }

      th {
        ${textBody500};

        &:empty {
          padding: 0;
        }
      }

      td {
        ${textBody400};
      }
    }
  }
`;
