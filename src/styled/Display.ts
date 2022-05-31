import styled from "@emotion/styled";

export const DispayWrapper = styled.div`
  max-width: min(100vw - 2em, 900px);
  height: min(50vw, 600px);
  margin: auto;

  > .canvas {
    width: 100%;
    height: 100%;
  }
`;

export const HideElements = styled.div<{
  showAgain?: boolean;
}>`
  display: ${(props) => (props.showAgain ? "block" : "none")};
`;
