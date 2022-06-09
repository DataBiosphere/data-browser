import styled from "@emotion/styled";

interface ContainerProps {
  lineHeight: number;
  maxLines: number;
  open: boolean;
}

export const Container = styled.div`
  .MuiButton-root {
    text-transform: none;
    padding-left: 0;
    color: ${({ theme }) => theme.palette.colorPrimartAnvil};
    font-weight: ${({ theme }) =>
      theme.typography["text-body-400-2lines"].fontWeight};
  }
`;

export const Wrapper = styled.div<ContainerProps>`
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  height: ${(props) =>
    props.open ? `100%` : `${props.lineHeight * props.maxLines}px`};
`;
