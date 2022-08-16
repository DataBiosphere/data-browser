import styled from "@emotion/styled";
import { Paper } from "../common/Paper/paper";
import { Loading } from "./loading";

export const LoadingBackground = styled(Paper)`
  background-color: rgba(255, 255, 255, 0.8);
  display: grid;
  gap: 16px;
  height: 100%;
  justify-items: center;
  left: 0;
  place-content: center center;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1400;
`;

// RoundedPaper styles.
export const RoundedLoading = styled(Loading)`
  border-radius: 8px;
`;
