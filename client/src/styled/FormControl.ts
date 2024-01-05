import styled from "@emotion/styled";

export const FormControlWrapper = styled.div<{
  direction: "column" | "row";
}>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: 0.5em;
`;

export const FormControlInput = styled.input`
  flex: 1;
  border: 0;
  box-shadow: 0em 0em 0.1em gray;
  border-radius: 0.3em;
  padding: max(0.3vw, 0.3em);
  font-size: clamp(1rem, 2vw + 0.1rem, 1.5rem);
`;
