import styled from "@emotion/styled";
import { ButtonPrimary } from "app/components/common/Button/button.styles";

interface Props {
  buttonWidget: boolean;
}

export const HeroLayout = styled.div`
  align-items: center;
  display: flex;
  gap: 16px 0;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Widgets = styled.div`
  align-items: center;
  display: flex;
  height: 40px;
`;

export const SummaryWidget = styled.div<Props>`
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palette.smoke.main};
  border-radius: ${({ buttonWidget }) =>
    buttonWidget ? "4px 0 0 4px" : "4px"};
  display: grid;
  gap: 0 8px;
  grid-auto-flow: column;
  height: inherit;
  padding: 0 16px;
`;

export const ExportButton = styled(ButtonPrimary)`
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  margin-left: -1px;
`;
