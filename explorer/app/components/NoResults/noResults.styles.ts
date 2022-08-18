// TODO NoResults section and section content styles to be refactored with https://github.com/clevercanary/data-browser/issues/400
import styled from "@emotion/styled";
import { Stack } from "../common/Stack/Stack";

export const Section = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 40px;
`;

export const SectionContent = styled(Stack)`
  max-width: 456px;
  text-align: center;
`;
