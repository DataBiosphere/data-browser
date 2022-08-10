// TODO NoResults section and section content styles to be refactored with https://github.com/clevercanary/data-browser/issues/400
import { Stack } from "../common/Stack/Stack";
import styled from "@emotion/styled";

export const Section = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.common.white};
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 40px;
`;

export const SectionContent = styled(Stack)`
  max-width: 456px;
  text-align: center;
`;
