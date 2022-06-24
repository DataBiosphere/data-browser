import styled from "@emotion/styled";

export const ProjectHeader = styled.div`
  display: contents; // TODO(cc) review ProjectHeader styles as part of refactor #66 (Add project title and last modified to project detail page)

  > * {
    grid-column: 1 / -1; // TODO(cc) review ProjectHeader styles as part of refactor #66 (Add project title and last modified to project detail page)
  }
`;
